'use client';

import { MEDIA_QUERIES } from '../constants';
import useEnhancedEffect from './use-enhanced-effect';
import { useMemo, useState } from 'react';

type BuiltInBreakpoints = keyof typeof MEDIA_QUERIES;
type CustomBreakpoint = {
  custom: string;
};

type Breakpoint = BuiltInBreakpoints | CustomBreakpoint;

const defaultOptions = {
  defaultMatches: false,
  noSsr: false,
  ssrMatchMedia: null,
};

type Options = {
  defaultMatches?: boolean;
  noSsr?: boolean;
  ssrMatchMedia?: ((query: string) => { matches: boolean }) | null;
};

export default function useMediaQuery(
  breakpoint: Breakpoint,
  options: Options = defaultOptions,
) {
  const breakpointValue = useMemo(
    () =>
      typeof breakpoint === 'object'
        ? breakpoint.custom
        : MEDIA_QUERIES[breakpoint],
    [breakpoint],
  );

  const { defaultMatches, noSsr, ssrMatchMedia } = useMemo(
    () => ({ ...defaultOptions, ...options }),
    [options],
  );

  const [matches, setMatches] = useState(() => {
    if (noSsr && typeof window !== 'undefined') {
      return window!.matchMedia(breakpointValue).matches;
    }

    if (!noSsr && ssrMatchMedia) {
      return ssrMatchMedia(breakpointValue).matches;
    }

    return defaultMatches;
  });

  useEnhancedEffect(() => {
    const matcher = window.matchMedia(breakpointValue);

    const update = () => {
      setMatches(matcher.matches);
    };

    update();

    matcher.addEventListener('change', update);

    return () => {
      matcher.removeEventListener('change', update);
    };
  }, [breakpointValue]);

  return matches;
}
