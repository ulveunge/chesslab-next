'use client';

import { AnonymousAuthContext } from '../index';
import { initializeAnonymousSession } from '@/lib/api/auth';
import { IAnonymousUser } from '@/lib/types';
import React, { PropsWithChildren, useEffect, useState } from 'react';

export default function AnonymousAuthProvider({ children }: PropsWithChildren) {
  const [anonymousUser, setAnonymousUser] = useState<IAnonymousUser | null>(
    null,
  );

  // TODO: loading/error states? probably use tanstack query for caching
  useEffect(() => {
    (async () => {
      const user = await initializeAnonymousSession();
      if (user) setAnonymousUser(user);
    })();
  }, []);

  return (
    <AnonymousAuthContext.Provider value={{ anonymousUser }}>
      {children}
    </AnonymousAuthContext.Provider>
  );
}
