import { Collection } from './appwrite';
import { IGame } from '@/lib/types';

export const Games = new Collection<IGame>('games');
