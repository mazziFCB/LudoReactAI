import { GameState } from '../entities/GameState';
import { Token, HOME_BASE, FINISH } from '../entities/Token';
import { PlayerColor } from '../entities/Player';

export function advanceTurn(state: GameState): number {
  const total = state.players.length;
  let next = (state.currentTurnIndex + 1) % total;
  // Skip players that have already finished all tokens.
  let guard = 0;
  while (isPlayerFinished(state, state.players[next].color) && guard < total) {
    next = (next + 1) % total;
    guard++;
  }
  return next;
}

export function isPlayerFinished(state: GameState, color: PlayerColor): boolean {
  return state.tokens.filter((t) => t.color === color).every((t) => t.position === FINISH);
}

export function canMoveToken(token: Token, dice: number): boolean {
  if (token.position === FINISH) return false;
  if (token.position === HOME_BASE) return dice === 6;
  return token.position + dice <= FINISH;
}

export function moveToken(token: Token, dice: number): Token {
  if (token.position === HOME_BASE) {
    return { ...token, position: 0 };
  }
  return { ...token, position: Math.min(token.position + dice, FINISH) };
}
