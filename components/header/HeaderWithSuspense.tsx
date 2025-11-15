'use client';

import { Suspense } from 'react';
import Header from './Header';

/**
 * Header wrapper with Suspense boundary
 * Required for useSearchParams() to work on static pages
 */
export default function HeaderWithSuspense() {
  return (
    <Suspense fallback={<div style={{ height: '110px' }} />}>
      <Header />
    </Suspense>
  );
}
