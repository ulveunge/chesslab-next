import { Games } from '@/lib/api/appwrite/collections';
import { PvpGame } from '@/views';
import React from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  // TODO: handle game not found
  const game = await Games.getById(id);

  return <PvpGame game={game} />;
}
