import {useLayoutEffect, useState} from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isDesktop: boolean;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
    isDesktop: false,
  });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 576,
      isDesktop: window.innerWidth > 991,
    });
  };

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return windowSize;
}
