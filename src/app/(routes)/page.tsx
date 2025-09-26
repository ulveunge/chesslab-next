import { Games } from '@/lib/appwrite/browser/collections';
import { Main } from '@/views';

export default async function Home() {
  const allGames = await Games.get();

  const gamesWithPagination = await Games.get({
    pagination: { limit: 3, offset: 3 },
  });

  console.log('allGames: ', allGames);
  console.log('gamesWithPagination: ', gamesWithPagination);

  return <Main />;
}
