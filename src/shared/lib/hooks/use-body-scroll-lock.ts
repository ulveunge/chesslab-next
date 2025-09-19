'use client';

import {
  BodyScrollOptions,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import { RefObject, useEffect } from 'react';

export default function useBodyScrollLock(
  targetRef: RefObject<HTMLElement | null>,
  {
    deps,
    ...options
  }: {
    deps: boolean[];
  } & BodyScrollOptions,
) {
  useEffect(() => {
    if (!targetRef.current) return;

    const target = targetRef.current;

    if (deps.some(Boolean)) disableBodyScroll(target, options);
    else enableBodyScroll(target);

    return () => {
      enableBodyScroll(target);
    };
  }, [deps, options, targetRef]);
}
