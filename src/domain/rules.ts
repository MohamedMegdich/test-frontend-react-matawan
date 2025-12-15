import type { Move } from './moves';

export type RoundResult = 'P1_WIN' | 'P2_WIN' | 'DRAW';

export function decideWinner(p1: Move, p2: Move): RoundResult {
  if (p1 === p2) return 'DRAW';

  const p1Beats: Record<Move, Move> = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return p1Beats[p1] === p2 ? 'P1_WIN' : 'P2_WIN';
}

export function resultLabel(result: RoundResult, p1Name: string, p2Name: string): string {
  switch (result) {
    case 'DRAW':
      return 'Draw';
    case 'P1_WIN':
      return `${p1Name} wins`;
    case 'P2_WIN':
      return `${p2Name} wins`;
  }
}
