import { Games } from '@/lib/api/appwrite/collections';
import { IGame } from '@/lib/types';

export default async function joinGame({
  game,
  userId,
  joinToken,
}: {
  game: IGame;
  userId: string;
  joinToken: string;
}) {
  try {
    if (game.joinTokenUsed || game.joinToken !== joinToken) {
      throw new Error('Invalid or used token');
    }

    return await Games.update(game.$id, {
      ...(game.whitePlayerId ? {} : { whitePlayerId: userId }),
      ...(game.blackPlayerId ? {} : { blackPlayerId: userId }),
      joinTokenUsed: true,
      joinToken: null,
    });
  } catch (error) {
    console.log('Error joining game:', error);
    throw error;
  }
}
