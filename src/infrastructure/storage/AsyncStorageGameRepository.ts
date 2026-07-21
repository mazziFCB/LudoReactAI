import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameRepository } from '@domain/ports/GameRepository';
import { GameState } from '@domain/entities/GameState';

const KEY = '@ludo/game-state';

export class AsyncStorageGameRepository implements GameRepository {
  async save(state: GameState): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  }

  async load(): Promise<GameState | null> {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as GameState;
    } catch {
      return null;
    }
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  }
}

export const gameRepository = new AsyncStorageGameRepository();
