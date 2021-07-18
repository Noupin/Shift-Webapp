//Third Party Imports
import { useEffect, useRef, useState } from 'react';


export function useStateCallback<T>(initialState?: T | (() => T)): [T, (newState: React.SetStateAction<T>, callback?: () => void) => void]{
  const [state, setState] = useState<T>(initialState!);
  const callbackRef = useRef<() => void>();

  const setStateCB = (newState: React.SetStateAction<T>, callback?: () => void) => {
    callbackRef.current = callback;
    setState(newState);
  };

  useEffect(() => {
    callbackRef.current?.();
  }, [state]);

  return [state, setStateCB];
}