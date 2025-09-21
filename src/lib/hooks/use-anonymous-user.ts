'use client';

import { AnonymousAuthContext } from '@/lib/context';
import { useContext } from 'react';

export default function useAnonymousUser() {
  const { anonymousUser } = useContext(AnonymousAuthContext);

  return { anonymousUser };
}
