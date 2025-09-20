import { Games } from '@/lib/api/appwrite/collections';
import { Main } from '@/views';

export default async function Home() {
  const allGames = await Games.list();
  const gameById = await Games.get('68ced14d0039e9e86110');
  console.log('all games: ', allGames);
  console.log('gameById: ', gameById);
  return <Main />;
}
