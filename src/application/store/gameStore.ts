import { create } from 'zustand';
import { Player, PlayerColor } from '@domain/entities/Player';
import { GameState } from '@domain/entities/GameState';
import { createGame } from '@domain/usecases/createGame';
import { rollDice, grantsExtraTurn } from '@domain/usecases/rollDice';
import { advanceTurn, canMoveToken, moveToken } from '@domain/usecases/turnLogic';
import { detectWinners, isGameOver } from '@domain/usecases/winDetection';
import { gameRepository } from '@infrastructure/storage/AsyncStorageGameRepository';

interface GameStore {
  game: GameState | null;
  hasSavedGame: boolean;
  startGame: (players: Player[]) => Promise<void>;
  resumeGame: () => Promise<boolean>;
  refreshSaved: () => Promise<void>;
  roll: () => number;
  playToken: (tokenId: string) => void;
  skipTurn: () => void;
  currentPlayer: () => Player | null;
  reset: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  game: null,
  hasSavedGame: false,

  startGame: async (players) => {
    const game = createGame(players);
    set({ game });
    await gameRepository.save(game);
    set({ hasSavedGame: true });
  },

  resumeGame: async () => {
    const saved = await gameRepository.load();
    if (saved) {
      set({ game: saved });
      return true;
    }
    return false;
  },

  refreshSaved: async () => {
    const saved = await gameRepository.load();
    set({ hasSavedGame: !!saved });
  },

  roll: () => {
    const state = get().game;
    if (!state) return 0;
    const value = rollDice();
    const updated: GameState = { ...state, lastDiceValue: value, phase: 'moving' };
    set({ game: updated });
    void gameRepository.save(updated);
    return value;
  },

  playToken: (tokenId) => {
    const state = get().game;
    if (!state || state.lastDiceValue == null) return;
    const dice = state.lastDiceValue;
    const target = state.tokens.find((t) => t.id === tokenId);
    if (!target || !canMoveToken(target, dice)) return;

    const tokens = state.tokens.map((t) => (t.id === tokenId ? moveToken(t, dice) : t));
    let next: GameState = { ...state, tokens, lastDiceValue: null, phase: 'idle' };

    const ranking = mergeRanking(next.ranking, detectWinners(next));
    next = { ...next, ranking };

    if (isGameOver(next)) {
      next = { ...next, phase: 'finished' };
    } else if (!grantsExtraTurn(dice)) {
      next = { ...next, currentTurnIndex: advanceTurn(next) };
    }

    set({ game: next });
    void gameRepository.save(next);
  },

  skipTurn: () => {
    const state = get().game;
    if (!state) return;
    const next: GameState = {
      ...state,
      lastDiceValue: null,
      phase: 'idle',
      currentTurnIndex: advanceTurn(state)
    };
    set({ game: next });
    void gameRepository.save(next);
  },

  currentPlayer: () => {
    const state = get().game;
    if (!state) return null;
    return state.players[state.currentTurnIndex] ?? null;
  },

  reset: async () => {
    await gameRepository.clear();
    set({ game: null, hasSavedGame: false });
  }
}));

function mergeRanking(existing: PlayerColor[], winners: PlayerColor[]): PlayerColor[] {
  const result = [...existing];
  winners.forEach((w) => {
    if (!result.includes(w)) result.push(w);
  });
  return result;
}
