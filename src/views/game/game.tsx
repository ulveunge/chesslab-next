'use client';

import { Chess, ChessBoard, ChessBoardContainer, NoSsr } from '@/components';
import useChessPvpGame from '@/lib/hooks/use-chess-pvp-game';
import { IGame } from '@/lib/types';

type Props = {
  game: IGame; // TODO: Придумать как удобнее типизировать
};

export default function Game({ game }: Props) {
  const { position, onPieceDrop, boardOrientation } = useChessPvpGame(game);

  return (
    <NoSsr>
      <Chess
        options={{
          position,
          onPieceDrop,
          boardOrientation,
        }}
      >
        <ChessBoardContainer className='mx-auto mt-20 aspect-square max-h-[500px]'>
          <ChessBoard />
        </ChessBoardContainer>
      </Chess>
    </NoSsr>
  );
}
