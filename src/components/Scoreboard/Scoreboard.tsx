import styles from './Scoreboard.module.scss';

export type Score = {
  p1: number;
  p2: number;
  draws: number;
  rounds: number;
};

type Props = {
  p1Name: string;
  p2Name: string;
  score: Score;
  onReset: () => void;
};

export function Scoreboard({ p1Name, p2Name, score, onReset }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <div className={styles.item}>
          <div className={styles.label}>{p1Name}</div>
          <div className={styles.value}>{score.p1}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Draws</div>
          <div className={styles.value}>{score.draws}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>{p2Name}</div>
          <div className={styles.value}>{score.p2}</div>
        </div>
      </div>

      <div className={styles.meta}>
        <span>Total rounds: {score.rounds}</span>
        <button type="button" className={styles.reset} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
