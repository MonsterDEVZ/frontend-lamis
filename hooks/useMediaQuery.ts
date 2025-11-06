'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for tracking the state of a media query.
 * @param query - The media query string to watch.
 * @returns `true` if the media query matches, otherwise `false`.
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // `window` is not available on the server, so we do nothing.
    // This will mean the initial render might not have the correct value,
    // but it will be corrected on the client-side hydration.
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(media.matches);
    };

    // Set the initial value
    updateMatches();

    // Listen for changes
    media.addEventListener('change', updateMatches);

    // Cleanup listener on component unmount
    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]); // Re-run the effect if the query string changes

  return matches;
}
