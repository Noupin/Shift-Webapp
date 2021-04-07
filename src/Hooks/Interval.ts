/*
Author: https://stackoverflow.com/users/1751946/yangshun-tay
Thanks to: https://stackoverflow.com/users/3723993/danziger
Explanation: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
*/

//Third Party Imports
import { useEffect, useRef } from 'react';

export function useInterval(callback: any, delay: number) {
  const intervalRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setInterval ticks again, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // interval will be reset.

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval:

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(() => callbackRef.current(), delay);

      // Clear interval if the components is unmounted or the delay changes:
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  
  // Returns a ref to the interval ID in case you want to clear it manually:
  return intervalRef;
}