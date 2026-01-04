import React, { useEffect, useRef, useState, useMemo } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  slideDuration?: number; // milliseconds between slides
  autoPlay?: boolean;
  className?: string;
  itemsPerView?: number; // Number of items visible at once
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slideDuration = 3000,
  autoPlay = true,
  className = '',
  itemsPerView = 1,
}) => {
  // Convert children to array
  const childrenArray = useMemo(() => {
    return React.Children.toArray(children);
  }, [children]);
  
  const totalItems = childrenArray.length;
  
  // Start at totalItems to show first items of second set (seamless infinite loop)
  const [currentIndex, setCurrentIndex] = useState(() => totalItems > 0 ? totalItems : 0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update currentIndex when totalItems changes
  useEffect(() => {
    if (totalItems > 0 && currentIndex === 0) {
      setCurrentIndex(totalItems);
    }
  }, [totalItems, currentIndex]);

  // Duplicate items for infinite loop: [1,2,3,4,5,6, 1,2,3,4,5,6]
  const items = [...childrenArray, ...childrenArray];

  useEffect(() => {
    if (autoPlay && !isPaused && totalItems > itemsPerView) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          // When we reach the end of second set, reset to start of second set
          if (next >= totalItems * 2) {
            return totalItems; // Jump back to start of second set (seamless)
          }
          return next;
        });
      }, slideDuration);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPaused, slideDuration, totalItems, itemsPerView]);

  // Handle seamless loop: when reaching end of second set, reset to start of second set without animation
  useEffect(() => {
    if (currentIndex >= totalItems * 2 && containerRef.current) {
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'none';
          setCurrentIndex(totalItems);
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = '';
            }
          }, 50);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalItems]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (totalItems === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No items to display</p>
      </div>
    );
  }

  // Debug logging
  console.log('Carousel render:', { totalItems, itemsPerView, currentIndex, translateX, trackWidth });

  // Calculation:
  // - Container: 100% width, shows itemsPerView items at once
  // - Each item: 100% / itemsPerView of container (for itemsPerView=3: 33.33%)
  // - Track: 2 sets of totalItems items
  // - Transform: move by one item width (100/itemsPerView %) for each slide
  const itemWidthPercent = 100 / itemsPerView; // 33.33% for itemsPerView=3
  const translateX = -(currentIndex * itemWidthPercent);

  // Track width: totalItems * 2 sets * itemWidthPercent
  // For 6 items with itemsPerView=3: 6 * 2 * 33.33% = 400%
  const trackWidth = totalItems * 2 * itemWidthPercent;
  
  // Each item in track: itemWidthPercent / trackWidth * 100% of track
  // For 6 items with itemsPerView=3: 33.33% / 400% * 100% = 8.33% of track
  // 8.33% of 400% track = 33.33% of container ✓
  const itemWidthInTrack = (itemWidthPercent / trackWidth) * 100;

  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(${translateX}%)`,
          width: `${trackWidth}%`,
        }}
      >
        {items.map((child, index) => (
          <div
            key={`carousel-item-${index}`}
            className="flex-shrink-0"
            style={{
              width: `${itemWidthInTrack}%`,
            }}
          >
            <div className="px-2 md:px-3 lg:px-4 h-full w-full">
              {child}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
