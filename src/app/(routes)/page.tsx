'use client';

import { Text } from '@/components';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Text className='mt-20 text-center' variant='h1'>
        Chesslab
      </Text>
      <Link href='/stockfish'>Stockfish</Link>
    </div>
  );
}
