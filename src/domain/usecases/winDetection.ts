import { GameState } from '../entities/GameState';
import { PlayerColor } from '../entities/Player';
import { isPlayerFinished } from './turnLogic';

export function detectWinners(state: GameState): PlayerColor[] {
  return state.players.map((p) => p.color).filter((c) => isPlayerFinished(state, c));
}

export function isGameOver(state: GameState): boolean {
  const finishedCount = detectWinners(state).length;
  // Game ends when all but one player has finished.
  return finishedCount >= state.players.length - 1;
}
