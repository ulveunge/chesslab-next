import { IGameConfig } from '@/lib/types';

export default function saveGameConfig(gameConfig: IGameConfig) {
  window.localStorage.setItem(gameConfig.id, JSON.stringify(gameConfig));
}
