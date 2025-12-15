export const MOVES = ['rock', 'paper', 'scissors'] as const;
export type Move = (typeof MOVES)[number];

export function moveLabel(move: Move): string {
  switch (move) {
    case 'rock':
      return 'Rock';
    case 'paper':
      return 'Paper';
    case 'scissors':
      return 'Scissors';
  }
}

export function moveEmoji(move: Move): string {
  switch (move) {
    case 'rock':
      return '🪨';
    case 'paper':
      return '📄';
    case 'scissors':
      return '✂️';
  }
}
