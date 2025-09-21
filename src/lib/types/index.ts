export * from './utility';
export * from './collections';
export * from './auth';

export type IGameConfig = {
  id: string;
  color: 'w' | 'b';
  playerId: string;
};
