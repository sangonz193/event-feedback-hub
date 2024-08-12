import { useCallback, useRef } from "react";

/**
 * Returns a stable callback that will always call the latest version of the
 * function passed to it.
 */
export function useEffectEvent<T extends (...args: never[]) => unknown>(fn: T) {
  const ref = useRef(fn);
  ref.current = fn;

  const callback = useCallback(
    ((...args: never[]) => ref.current(...args)) as T,
    []
  );

  return callback;
}
