export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// A player earns another turn if they roll a 6.
export function grantsExtraTurn(value: number): boolean {
  return value === 6;
}
