export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface Player {
  id: string;
  name: string;
  color: PlayerColor;
  isBot: boolean;
}

export const PLAYER_COLORS: PlayerColor[] = ['red', 'green', 'yellow', 'blue'];
