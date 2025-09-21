import { Games } from '@/lib/api/appwrite/collections';
import { Main } from '@/views';

export default async function Home() {
  const allGames = await Games.get();

  const gamesWithPagination = await Games.get({
    pagination: { limit: 3, offset: 3 },
  });

  const gameById = await Games.getById('68ced14d0039e9e86110');

  console.log('allGames: ', allGames);
  console.log('gamesWithPagination: ', gamesWithPagination);
  console.log('gameById: ', gameById);

  return <Main />;
}
