import { ID } from '@/lib/api/appwrite/appwrite';
import { Games } from '@/lib/api/appwrite/collections';
import { INITIAL_FEN } from '@/lib/constants';

export default async function createGame({
  userId,
  color,
}: {
  color: 'w' | 'b';
  userId: string;
}) {
  try {
    const gameId = ID.unique();
    const joinToken = crypto.randomUUID();

    const game = await Games.create(
      {
        fen: INITIAL_FEN,
        pgn: '',
        joinToken,
        joinTokenUsed: false,
        result: 'ongoing',
        ...(color === 'w'
          ? { whitePlayerId: userId, blackPlayerId: null }
          : { blackPlayerId: userId, whitePlayerId: null }),
      },
      gameId,
    );

    return game;
  } catch (error) {
    console.log('Error creating game:', error);
    throw error;
  }
}
