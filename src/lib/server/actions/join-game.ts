'use server';

import { Permission, Role } from '@/lib/appwrite/server';
import { GamesAdmin } from '@/lib/appwrite/server/collections';
import { IGame } from '@/lib/types';

export default async function joinGame({
  game,
  userId,
}: {
  game: IGame;
  userId: string;
}) {
  try {
    if (game.whitePlayerId && game.blackPlayerId) {
      throw new Error('Both players are already assigned to this game.');
    }

    const existingPlayerId = game.whitePlayerId ?? game.blackPlayerId;

    const players = [existingPlayerId, userId].filter(Boolean) as string[];

    const permissions = players.flatMap((id) => [
      Permission.read(Role.user(id)),
      Permission.update(Role.user(id)),
    ]);

    return await GamesAdmin.update(
      game.$id,
      {
        ...(game.whitePlayerId ? {} : { whitePlayerId: userId }),
        ...(game.blackPlayerId ? {} : { blackPlayerId: userId }),
      },
      permissions,
    );
  } catch (error) {
    console.error('Error joining game:', error);
    throw error;
  }
}
