'use server';

import { ID, Permission, Role } from '@/lib/appwrite/server';
import { GamesAdmin } from '@/lib/appwrite/server/collections';
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

    const game = await GamesAdmin.create(
      {
        fen: INITIAL_FEN,
        pgn: '',
        ...(color === 'w'
          ? { whitePlayerId: userId, blackPlayerId: null }
          : { blackPlayerId: userId, whitePlayerId: null }),
        gameState: 'ongoing',
      },
      gameId,
      [Permission.update(Role.user(userId))],
    );

    return game;
  } catch (error) {
    console.log('Error creating game:', error);
    throw error;
  }
}
