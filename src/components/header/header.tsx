'use client';

import { Text } from '@/components';
import { MoveLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const { back } = useRouter();

  return (
    <header className='border-foreground relative border-b p-4'>
      {pathname !== '/' && (
        <button
          onClick={back}
          className='hover: absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer'
        >
          <MoveLeft strokeWidth={2} />
        </button>
      )}
      <Text className='text-center' variant='h1'>
        Chesslab
      </Text>
    </header>
  );
};

export default Header;
