'use client';

import { Stockfish } from '@/entities/stockfish';
import {
  Text,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/shared/ui';
import { useState } from 'react';

const STOCKFISH_DEFAULT_SKILL_LEVEL = 1;
const STOCKFISH_MAX_SKILL_LEVEL = 10;

const LEVELS = Array.from({ length: STOCKFISH_MAX_SKILL_LEVEL }, (_, idx) =>
  String(idx + 1),
);

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [skillLevel, setSkillLevel] = useState(STOCKFISH_DEFAULT_SKILL_LEVEL);

  return (
    <div>
      <Text className='mt-20 text-center' variant='h1'>
        Chesslab
      </Text>
      {!isStarted ? (
        <div className='mt-10 flex justify-center'>
          <Select
            onValueChange={(value) => {
              setSkillLevel(Number(value));
              setIsStarted(true);
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Выбери сложность' />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((n) => (
                <SelectItem key={n} value={n}>
                  Stockfish уровня {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <Stockfish skillLeven={skillLevel} />
      )}
    </div>
  );
}
