import styles from './PlayerNames.module.scss';

type Props = {
  p1Name: string;
  p2Name: string;
  onChangeP1: (name: string) => void;
  onChangeP2: (name: string) => void;
};

export function PlayerNames({ p1Name, p2Name, onChangeP1, onChangeP2 }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="p1Name">
          Player 1 name
        </label>
        <input
          id="p1Name"
          className={styles.input}
          value={p1Name}
          onChange={(e) => onChangeP1(e.target.value)}
          maxLength={18}
          placeholder="Player 1"
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="p2Name">
          Player 2 name
        </label>
        <input
          id="p2Name"
          className={styles.input}
          value={p2Name}
          onChange={(e) => onChangeP2(e.target.value)}
          maxLength={18}
          placeholder="Player 2"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
