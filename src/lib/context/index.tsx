'use client';

import AnonymousAuthProvider from './providers/AnonymousAuthProvider';
import { IAnonymousUser } from '@/lib/types';
import { createContext, PropsWithChildren } from 'react';

export const AnonymousAuthContext = createContext<{
  anonymousUser: IAnonymousUser | null;
}>({ anonymousUser: null });

export { default as AnonymousAuthProvider } from './providers/AnonymousAuthProvider';

type Props = PropsWithChildren;

export function AppProvider({ children }: Props) {
  return <AnonymousAuthProvider>{children}</AnonymousAuthProvider>;
}
