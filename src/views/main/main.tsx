'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TileButton,
  Text,
} from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const STOCKFISH_MAX_SKILL_LEVEL = 10;
const LEVELS = Array.from({ length: STOCKFISH_MAX_SKILL_LEVEL }, (_, idx) =>
  String(idx + 1),
);

const Main = () => {
  const router = useRouter();

  const [selected, setSelected] = useState<boolean>(false);

  const onSelectSkillLevel = (value: string) => {
    setSelected(true);
    window.sessionStorage.setItem('stockfish-level', value);
  };

  return (
    <div className='mt-40 flex items-center justify-center gap-4'>
      <Dialog>
        <DialogTrigger asChild>
          <TileButton title='С компом' />
        </DialogTrigger>
        <DialogContent className='pt-12'>
          <Text variant='visually-hidden' asChild>
            <DialogTitle>Выбери сложность</DialogTitle>
          </Text>
          <Select onValueChange={onSelectSkillLevel}>
            <SelectTrigger className='w-full'>
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
          <Button
            disabled={!selected}
            onClick={() => router.push('/stockfish')}
          >
            Играть
          </Button>
        </DialogContent>
      </Dialog>
      <TileButton
        title='С братишкой'
        onClick={() => window.alert('aklsdlfaj')}
      />
    </div>
  );
};

export default Main;
