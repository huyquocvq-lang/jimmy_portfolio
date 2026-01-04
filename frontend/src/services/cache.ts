interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class CacheService {
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Get data from cache (memory first, then localStorage)
   */
  get<T>(key: string): T | null {
    // Check memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && this.isValid(memoryEntry)) {
      return memoryEntry.data as T;
    }

    // Check localStorage
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const entry: CacheEntry<T> = JSON.parse(stored);
        if (this.isValid(entry)) {
          // Also store in memory for faster access
          this.memoryCache.set(key, entry);
          return entry.data;
        } else {
          // Expired, remove it
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn('Failed to read from localStorage cache:', error);
    }

    return null;
  }

  /**
   * Set data in cache (both memory and localStorage)
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    // Store in memory
    this.memoryCache.set(key, entry);

    // Store in localStorage
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to write to localStorage cache:', error);
      // If localStorage is full, clear old entries
      this.clearExpired();
    }
  }

  /**
   * Check if cache entry is still valid
   */
  private isValid<T>(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  /**
   * Remove a specific cache entry
   */
  remove(key: string): void {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage cache:', error);
    }
  }

  /**
   * Clear all expired entries
   */
  clearExpired(): void {
    // Clear memory cache
    for (const [key, entry] of this.memoryCache.entries()) {
      if (!this.isValid(entry)) {
        this.memoryCache.delete(key);
      }
    }

    // Clear localStorage
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('cache_')) {
          try {
            const stored = localStorage.getItem(key);
            if (stored) {
              const entry: CacheEntry<unknown> = JSON.parse(stored);
              if (!this.isValid(entry)) {
                localStorage.removeItem(key);
              }
            }
          } catch {
            // Invalid entry, remove it
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to clear expired cache:', error);
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  /**
   * Generate cache key from API endpoint and params
   */
  generateKey(endpoint: string, params?: Record<string, unknown> | object): string {
    const paramString = params
      ? Object.entries(params as Record<string, unknown>)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
          .join('&')
      : '';
    return `cache_${endpoint}${paramString ? `_${paramString}` : ''}`;
  }
}

export const cacheService = new CacheService();

// Clear expired cache on load
if (typeof window !== 'undefined') {
  cacheService.clearExpired();
  // Clear expired cache every 5 minutes
  setInterval(() => {
    cacheService.clearExpired();
  }, 5 * 60 * 1000);
}

