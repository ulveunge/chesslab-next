import { IGameConfig } from '../types';

export default function getGameConfig(id: string) {
  if (typeof window === 'undefined') return null;

  const config = window.localStorage.getItem(id);

  return config ? (JSON.parse(config) as IGameConfig) : null;
}
