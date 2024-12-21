import {useCallback, useRef, useState} from 'react';

interface LongPressOptions {
  onLongPress: () => void;
  duration?: number;
}

interface LongPressResult {
  isPressed: boolean;
  handlers: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export const useLongPress = ({onLongPress, duration = 5000}: LongPressOptions): LongPressResult => {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<number>();

  const handlePressStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setIsPressed(true);

      timerRef.current = window.setTimeout(() => {
        onLongPress();
        setIsPressed(false);
      }, duration);
    },
    [onLongPress, duration]
  );

  const handlePressEnd = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPressed(false);
  }, []);

  return {
    isPressed,
    handlers: {
      onMouseDown: handlePressStart,
      onMouseUp: handlePressEnd,
      onMouseLeave: handlePressEnd,
      onTouchStart: handlePressStart,
      onTouchEnd: handlePressEnd,
    },
  };
};
