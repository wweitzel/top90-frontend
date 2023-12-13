import {useEffect, useRef} from 'react';

export function usePrevious<Type>(value: Type) {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
