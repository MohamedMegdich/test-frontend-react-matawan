import type { Move } from '../../domain/moves';
import { MOVES, moveEmoji, moveLabel } from '../../domain/moves';
import styles from './MovePicker.module.scss';

type Props = {
  disabled?: boolean;
  selected?: Move | null;
  onPick: (move: Move) => void;
  label: string;
};

export function MovePicker({ disabled, selected, onPick, label }: Props) {
  return (
    <div className={styles.wrap} aria-label={label} role="group">
      {MOVES.map((m) => {
        const isSelected = selected === m;
        return (
          <button
            key={m}
            type="button"
            className={`${styles.btn} ${isSelected ? styles.selected : ''}`}
            onClick={() => onPick(m)}
            disabled={disabled}
            aria-pressed={isSelected}
          >
            <span className={styles.emoji} aria-hidden="true">
              {moveEmoji(m)}
            </span>
            <span className={styles.text}>{moveLabel(m)}</span>
          </button>
        );
      })}
    </div>
  );
}
