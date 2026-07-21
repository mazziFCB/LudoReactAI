import { Player } from '../entities/Player';
import { Token, HOME_BASE, TOKENS_PER_PLAYER } from '../entities/Token';
import { GameState } from '../entities/GameState';

export function createGame(players: Player[]): GameState {
  const tokens: Token[] = [];
  players.forEach((p) => {
    for (let i = 0; i < TOKENS_PER_PLAYER; i++) {
      tokens.push({ id: `${p.color}-${i}`, color: p.color, position: HOME_BASE });
    }
  });
  return {
    players,
    tokens,
    currentTurnIndex: 0,
    lastDiceValue: null,
    phase: 'idle',
    ranking: [],
    startedAt: Date.now()
  };
}
