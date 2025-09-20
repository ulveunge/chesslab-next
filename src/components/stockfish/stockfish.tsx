'use client';

import { Chess, ChessBoard, ChessBoardContainer } from '@/components';
import { useStockfish } from '@/lib/hooks';
import React from 'react';

export default function Stockfish() {
  const { position, onPieceDrop } = useStockfish();

  return (
    <Chess options={{ position, onPieceDrop }}>
      <ChessBoardContainer className='mx-auto mt-20 aspect-square max-h-[500px]'>
        <ChessBoard />
      </ChessBoardContainer>
    </Chess>
  );
}
