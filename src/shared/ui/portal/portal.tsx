'use client';

import { useIsClient } from '@/shared/lib/hooks';
import { Root as PortalRadixRoot } from '@radix-ui/react-portal';
import { ComponentProps } from 'react';

type PortalRadixRootProps = ComponentProps<typeof PortalRadixRoot>;

type Props = Omit<PortalRadixRootProps, 'container'> & {
  target?: PortalRadixRootProps['container'] | 'string';
};

export default function Portal({ target, ...props }: Props) {
  const isClient = useIsClient();

  const container =
    typeof target === 'string'
      ? isClient
        ? document.querySelector(target)
        : null
      : target;

  return <PortalRadixRoot container={container} {...props} />;
}
