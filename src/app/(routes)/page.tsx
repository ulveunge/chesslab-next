'use client';

import { Chess, ChessBoard, ChessBoardContainer } from '@/entities/chess';
import { Text } from '@/shared/ui';
import { Chess as ChessGame } from 'chess.ts';
import { useRef, useState } from 'react';
import { PieceDropHandlerArgs } from 'react-chessboard';

export default function Home() {
  const chessGameRef = useRef(new ChessGame());
  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());

  function makeRandomMove() {
    const possibleMoves = chessGame.moves();

    if (chessGame.gameOver()) {
      return;
    }

    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    chessGame.move(randomMove);

    setChessPosition(chessGame.fen());
  }

  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (!targetSquare) {
      return false;
    }

    try {
      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      setChessPosition(chessGame.fen());

      setTimeout(makeRandomMove, 500);

      return true;
    } catch {
      return false;
    }
  }

  return (
    <div>
      <Text className='mt-20 text-center' variant='h1'>
        Chesslab
      </Text>
      <Chess options={{ position: chessPosition, onPieceDrop: onPieceDrop }}>
        <ChessBoardContainer className='mx-auto mt-20 size-[500px]'>
          <ChessBoard />
        </ChessBoardContainer>
      </Chess>
    </div>
  );
}
