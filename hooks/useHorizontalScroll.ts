import { useRef, useEffect } from 'react';

export const useHorizontalScroll = (dependency: any) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const isAtLeftEnd = scrollLeft === 0;
        const isAtRightEnd = Math.ceil(scrollLeft) >= scrollWidth - clientWidth;
        if ((e.deltaY > 0 && !isAtRightEnd) || (e.deltaY < 0 && !isAtLeftEnd)) {
          e.preventDefault();

          el.scrollTo({
            left: scrollLeft + e.deltaY * 7,
            behavior: 'smooth',
          });
        }
      };

      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [dependency]);

  return elRef;
};
