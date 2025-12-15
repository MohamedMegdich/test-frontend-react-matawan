import { MOVES, type Move } from './moves';

export function randomMove(): Move {
  const i = Math.floor(Math.random() * MOVES.length);
  return MOVES[i];
}
