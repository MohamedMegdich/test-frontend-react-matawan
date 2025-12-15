import type { GameMode } from '../../domain/modes';
import { MODES, modeLabel } from '../../domain/modes';
import styles from './ModeToggle.module.scss';

type Props = {
  value: GameMode;
  onChange: (mode: GameMode) => void;
};

export function ModeToggle({ value, onChange }: Props) {
  return (
    <div className={styles.wrap} role="tablist" aria-label="Game mode">
      {MODES.map((m) => {
        const active = m === value;
        return (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.btn} ${active ? styles.active : ''}`}
            onClick={() => onChange(m)}
          >
            {modeLabel(m)}
          </button>
        );
      })}
    </div>
  );
}
