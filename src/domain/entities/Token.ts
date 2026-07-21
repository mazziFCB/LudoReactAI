import { PlayerColor } from './Player';

// position: -1 = home base, 0..56 = path progression, 57 = finished
export interface Token {
  id: string;
  color: PlayerColor;
  position: number;
}

export const HOME_BASE = -1;
export const FINISH = 57;
export const TOKENS_PER_PLAYER = 4;
