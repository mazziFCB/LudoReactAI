import { Player, PlayerColor } from './Player';
import { Token } from './Token';

export type GamePhase = 'idle' | 'rolling' | 'moving' | 'finished';

export interface GameState {
  players: Player[];
  tokens: Token[];
  currentTurnIndex: number;
  lastDiceValue: number | null;
  phase: GamePhase;
  ranking: PlayerColor[];
  startedAt: number;
}
