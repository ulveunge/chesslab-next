import { Models } from 'appwrite';

export interface IGame extends Models.Document {
  fen: string;
}
