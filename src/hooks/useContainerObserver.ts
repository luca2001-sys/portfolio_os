import { useState, useEffect } from "react";
import type { RefObject } from "react";

/**
 * Custom hook to observe the dimensions of a container element.
 * It returns the `width`, `height`, and a boolean `isMobile` (width < 768px).
 */
export function useContainerObserver(containerRef: RefObject<HTMLElement | null>) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({ 
          width: containerRef.current.offsetWidth, 
          height: containerRef.current.offsetHeight 
        });
      }
    };
    
    updateSize(); // Initialize size
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, [containerRef]);

  const isMobile = containerSize.width > 0 && containerSize.width < 768;

  return { containerSize, isMobile };
}
