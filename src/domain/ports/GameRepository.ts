import { GameState } from '../entities/GameState';

export interface GameRepository {
  save(state: GameState): Promise<void>;
  load(): Promise<GameState | null>;
  clear(): Promise<void>;
}
