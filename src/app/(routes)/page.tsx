'use client';

import {
  Chess,
  ChessBoard,
  ChessBoardContainer,
  useStockfish,
} from '@/entities/chess';
import { Text } from '@/shared/ui';

export default function Home() {
  const { position, onPieceDrop } = useStockfish();

  return (
    <div>
      <Text className='mt-20 text-center' variant='h1'>
        Chesslab
      </Text>
      <Chess options={{ position, onPieceDrop }}>
        <ChessBoardContainer className='mx-auto mt-20 size-[500px]'>
          <ChessBoard />
        </ChessBoardContainer>
      </Chess>
    </div>
  );
}
