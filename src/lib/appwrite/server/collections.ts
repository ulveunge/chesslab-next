import { Collection } from './core';
import { IGame } from '@/lib/types';

export const GamesAdmin = new Collection<IGame>('games');
