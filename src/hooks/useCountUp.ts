import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  suffix?: string;
  enableScrollSpy?: boolean;
  repeat?: boolean;
  repeatDelay?: number;
}

export function useCountUp({ 
  end, 
  duration = 2000, 
  start = 0,
  decimals = 0,
  suffix = '',
  enableScrollSpy = true,
  repeat = false,
  repeatDelay = 2000
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Function to restart the animation
  const restart = useCallback(() => {
    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setCount(start);
    setAnimationKey(prev => prev + 1);
  }, [start]);

  useEffect(() => {
    if (!enableScrollSpy) {
      // Start immediately if scroll spy is disabled
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and restart animation when entering viewport
            setCount(start);
            setIsVisible(true);
            setAnimationKey(prev => prev + 1);
          } else {
            // Stop animation when leaving viewport
            setIsVisible(false);
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
              animationFrameRef.current = null;
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enableScrollSpy, start]);

  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeOutQuart;
      
      setCount(currentCount);

      if (now < endTime) {
        animationFrameRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
        animationFrameRef.current = null;
        
        if (repeat) {
          timeoutId = setTimeout(() => {
            setCount(start);
            setAnimationKey(prev => prev + 1);
          }, repeatDelay);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, end, start, duration, animationKey, repeat, repeatDelay]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();

  return {
    count: formattedCount + suffix,
    elementRef,
    restart
  };
}