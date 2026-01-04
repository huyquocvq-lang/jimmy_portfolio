import React, { useEffect, useRef, useState } from 'react';

interface AutoSliderProps {
  children: React.ReactNode[];
  slideDuration?: number; // milliseconds
  className?: string;
}

export const AutoSlider: React.FC<AutoSliderProps> = ({
  children,
  slideDuration = 3000,
  className = '',
}) => {
  // Start at the beginning of second set so we can slide left seamlessly
  const [currentIndex, setCurrentIndex] = useState(children.length);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = children.length;

  // Duplicate items for seamless infinite loop: [1,2,3,4,5,6, 1,2,3,4,5,6, 1,2,3,4,5,6]
  const items = [...children, ...children, ...children];

  useEffect(() => {
    if (!isPaused && totalItems > 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          // When we reach the end of second set (totalItems * 2), reset to start of second set
          if (next >= totalItems * 2) {
            return totalItems; // Jump back to start of second set (seamless loop)
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
  }, [isPaused, slideDuration, totalItems]);

  // Handle seamless loop: when reaching end of second set, reset without animation
  useEffect(() => {
    if (currentIndex >= totalItems * 2 && containerRef.current) {
      // Wait for transition to complete, then reset without animation
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'none';
          setCurrentIndex(totalItems);
          // Re-enable transition after reset
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
    return null;
  }

  // Each item should take 1/totalItems of the visible container
  // For 6 items: each item = 100/6 = 16.67% of visible container width
  const itemWidthPercent = 100 / totalItems; // 16.67% for 6 items
  const translateX = -(currentIndex * itemWidthPercent);

  // Track has 3 sets, so width = 300% of container
  // Each item in track = itemWidthPercent / 3 of track = 5.56% of track
  // This equals 5.56% * 300% = 16.67% of container ✓
  const trackWidth = 300; // 3 sets
  const itemWidthInTrack = itemWidthPercent / 3; // 5.56% of track for 6 items

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
          width: `${trackWidth}%`, // 300% for 3 sets
        }}
      >
        {items.map((child, index) => (
          <div
            key={`item-${index}`}
            className="flex-shrink-0"
            style={{ 
              width: `${itemWidthInTrack}%`, // 5.56% of track = 16.67% of container
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

