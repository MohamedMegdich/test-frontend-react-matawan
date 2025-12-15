export const MODES = ['PVP', 'PVC', 'CVC'] as const;
export type GameMode = (typeof MODES)[number];

export function modeLabel(mode: GameMode): string {
  switch (mode) {
    case 'PVP':
      return 'Player vs Player';
    case 'PVC':
      return 'Player vs Computer';
    case 'CVC':
      return 'Computer vs Computer';
  }
}
