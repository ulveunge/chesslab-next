'use client';

import { useEnhancedEffect } from '@/shared/lib/hooks';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

type Props = PropsWithChildren & {
  defer?: true; // Если true, рендеринг дочерних элементов компонента будет отложен до следующего кадра анимации браузера
  fallback?: ReactNode;
};

export default function NoSsr({ defer, fallback = null, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) {
      setMounted(true);
    }
  }, [defer]);

  useEffect(() => {
    if (defer) {
      setMounted(true);
    }
  }, [defer]);

  return mounted ? children : fallback;
}
