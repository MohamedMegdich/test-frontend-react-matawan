import styles from './CvcControls.module.scss';

type Props = {
  running: boolean;
  speedMs: number;
  onToggle: () => void;
  onSpeedChange: (ms: number) => void;
};

export function CvcControls({ running, speedMs, onToggle, onSpeedChange }: Props) {
  return (
    <div className={styles.wrap} aria-label="Computer vs Computer controls">
      <button type="button" className={styles.btn} onClick={onToggle}>
        {running ? 'Stop' : 'Start'}
      </button>

      <label className={styles.label}>
        Speed
        <select
          className={styles.select}
          value={speedMs}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        >
          <option value={250}>0.25s</option>
          <option value={500}>0.5s</option>
          <option value={1000}>1s</option>
        </select>
      </label>
    </div>
  );
}
