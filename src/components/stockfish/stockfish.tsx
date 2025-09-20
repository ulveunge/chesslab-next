'use client';

import { Chess, ChessBoard, ChessBoardContainer } from '@/components';
import { useStockfish } from '@/lib/hooks';
import React from 'react';

type Props = {
  skillLevel: number;
};

export default function Stockfish({ skillLevel }: Props) {
  const { position, onPieceDrop } = useStockfish(skillLevel);

  return (
    <Chess options={{ position, onPieceDrop }}>
      <ChessBoardContainer className='mx-auto mt-20 size-[500px]'>
        <ChessBoard />
      </ChessBoardContainer>
    </Chess>
  );
}
