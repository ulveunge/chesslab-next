'use client';

import {
  Chess,
  ChessBoard,
  ChessBoardContainer,
  useStockfish,
} from '@/entities/chess';

type Props = {
  skillLeven: number;
};

const Stockfish = ({ skillLeven }: Props) => {
  const { position, onPieceDrop } = useStockfish(skillLeven);

  return (
    <Chess options={{ position, onPieceDrop }}>
      <ChessBoardContainer className='mx-auto mt-20 size-[500px]'>
        <ChessBoard />
      </ChessBoardContainer>
    </Chess>
  );
};

export default Stockfish;
