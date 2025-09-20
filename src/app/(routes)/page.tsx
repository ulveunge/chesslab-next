import { Text } from '@/components';
import { Games } from '@/lib/api/appwrite/collections';
import Link from 'next/link';

export default async function Home() {
  const allGames = await Games.list();
  const gameById = await Games.get('68ced14d0039e9e86110');
  console.log('all games: ', allGames);
  console.log('gameById: ', gameById);

  return (
    <div>
      <Text className='mt-20 text-center' variant='h1'>
        Chesslab
      </Text>
      <Link href='/stockfish'>Stockfish</Link>
    </div>
  );
}
