import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.page}>
      <header className={`${styles.header} container`}>
        <div className={styles.brand}>
          <div className={styles.logo}>RPS</div>
          <div>
            <div className={styles.title}>Rock • Paper • Scissors</div>
            <div className={styles.subtitle}>Play local PvP (more modes coming)</div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className={`card ${styles.hero}`}>
          <div className="cardInner">
            <h2 className={styles.h2}>Ready</h2>
            <p className={styles.p}>
              We’ll build this step-by-step: move selection, results, scoreboard, and modes.
            </p>
          </div>
        </section>
      </main>

      <footer className={`${styles.footer} container`}>
        <span>Made with React + TypeScript + SCSS</span>
      </footer>
    </div>
  );
}
