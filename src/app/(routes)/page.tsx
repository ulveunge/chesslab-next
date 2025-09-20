import { Games } from '@/lib/api/appwrite/collections';
import { Main } from '@/views';

export default async function Home() {
  const allGames = await Games.list();

  const gamesWithPagination = await Games.list({
    pagination: { limit: 3, offset: 3 },
  });

  const gameById = await Games.get('68ced14d0039e9e86110');

  console.log('allGames: ', allGames);
  console.log('gamesWithPagination: ', gamesWithPagination);
  console.log('gameById: ', gameById);

  return <Main />;
}
