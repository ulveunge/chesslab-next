import { Models } from '@/lib/appwrite/browser';

export interface IGame extends Models.Document {
  fen: string;
  pgn: string;
  whitePlayerId: string | null;
  blackPlayerId: string | null;
  gameState: 'white' | 'black' | 'draw' | 'ongoing' | 'canceled';
}
