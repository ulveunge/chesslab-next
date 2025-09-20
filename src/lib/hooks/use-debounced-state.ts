import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDebouncedState<T>(state: T, ms = 500) {
  const [debouncedState, setDebouncedState] = useState(state);
  const timeout = useRef<NodeJS.Timeout>(null);

  const clearTimeoutHandler = useCallback(() => {
    if (!timeout.current) return;

    clearTimeout(timeout.current);
    timeout.current = null;
  }, []);

  useEffect(() => {
    clearTimeoutHandler();

    timeout.current = setTimeout(() => {
      setDebouncedState(state);
    }, ms);

    return clearTimeoutHandler;
  }, [clearTimeoutHandler, ms, state]);

  return debouncedState;
}
