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
  ToggleGroup,
  ToggleGroupItem,
} from '@/components';
import { ID } from '@/lib/api/appwrite/appwrite';
import { createGame } from '@/lib/api/game';
import { useAnonymousUser } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const STOCKFISH_MAX_SKILL_LEVEL = 10;
const LEVELS = Array.from({ length: STOCKFISH_MAX_SKILL_LEVEL }, (_, idx) =>
  String(idx + 1),
);

const Main = () => {
  const router = useRouter();
  const { anonymousUser } = useAnonymousUser();

  const [selected, setSelected] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>();

  const onSelectSkillLevel = (value: string) => {
    setSelected(true);
    window.sessionStorage.setItem('stockfish-level', value);
  };

  useEffect(() => {
    const playerId = window.localStorage.getItem('player-id');

    if (playerId) return;

    window.localStorage.setItem('player-id', ID.unique());
  }, []);

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
      <Dialog>
        <DialogTrigger asChild>
          <TileButton title='С братишкой' />
        </DialogTrigger>
        <DialogContent className='pt-12'>
          <Text variant='visually-hidden' asChild>
            <DialogTitle>Настройка игры</DialogTitle>
          </Text>
          <div>
            <Text className='mb-2' variant='large'>
              Цвет:{' '}
            </Text>
            <ToggleGroup
              onValueChange={setSelectedColor}
              variant='outline'
              type='single'
            >
              <ToggleGroupItem value='w' aria-label='Белый'>
                <div
                  className='size-6 rounded-full border border-[inherit] bg-white'
                  aria-hidden
                />
              </ToggleGroupItem>
              <ToggleGroupItem value='b' aria-label='Черный'>
                <div
                  className='size-6 rounded-full border border-[inherit] bg-black'
                  aria-hidden
                />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button
            disabled={!selectedColor || !anonymousUser}
            onClick={async () => {
              if (!anonymousUser) return;

              const game = await createGame({
                userId: anonymousUser.id,
                color: selectedColor as 'w' | 'b',
              });

              router.push(`/game/${game.$id}`);
            }}
          >
            Играть
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Main;
