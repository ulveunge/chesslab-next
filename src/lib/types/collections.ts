import { Models } from '../api/appwrite/appwrite';

export interface IGame extends Models.Document {
  fen: string;
  pgn: string;
  whitePlayerId: string | null;
  blackPlayerId: string | null;
  joinToken: string | null;
  joinTokenUsed: boolean;
  result: 'white' | 'black' | 'draw' | 'ongoing' | 'canceled';
}
