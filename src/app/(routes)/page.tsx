import { Text } from '@/components';
import { Games } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  const games = await Games.list();
  console.log(games);

  return (
    <div>
      <Text className='mt-20 text-center' variant='h1'>
        Chesslab
      </Text>
      <Link href='/stockfish'>Stockfish</Link>
    </div>
  );
}
