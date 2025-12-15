import { useMemo, useState } from 'react';

import { MovePicker } from './components/MovePicker/MovePicker';
import { ResultBanner } from './components/ResultBanner/ResultBanner';
import type { Move } from './domain/moves';
import { decideWinner, resultLabel, type RoundResult } from './domain/rules';
import styles from './App.module.scss';

type Phase = 'P1_PICK' | 'P2_PICK' | 'RESULT';

export default function App() {
  const [p1Move, setP1Move] = useState<Move | null>(null);
  const [p2Move, setP2Move] = useState<Move | null>(null);
  const [phase, setPhase] = useState<Phase>('P1_PICK');

  const p1Name = 'Player 1';
  const p2Name = 'Player 2';

  const result: RoundResult | null = useMemo(() => {
    if (!p1Move || !p2Move) return null;
    return decideWinner(p1Move, p2Move);
  }, [p1Move, p2Move]);

  const banner = useMemo(() => {
    if (phase !== 'RESULT' || !result) return null;
    const tone = result === 'DRAW' ? 'neutral' : result === 'P1_WIN' ? 'p1' : 'p2';
    return { text: resultLabel(result, p1Name, p2Name), tone: tone as 'neutral' | 'p1' | 'p2' };
  }, [phase, result]);

  function onPickP1(m: Move) {
    setP1Move(m);
    setPhase('P2_PICK');
  }

  function onPickP2(m: Move) {
    setP2Move(m);
    setPhase('RESULT');
  }

  function nextRound() {
    setP1Move(null);
    setP2Move(null);
    setPhase('P1_PICK');
  }

  return (
    <div className={styles.page}>
      <header className={`${styles.header} container`}>
        <div className={styles.brand}>
          <div className={styles.logo}>RPS</div>
          <div>
            <div className={styles.title}>Rock • Paper • Scissors</div>
            <div className={styles.subtitle}>Local Player vs Player</div>
          </div>
        </div>
      </header>

      <main className="container">
        <section className={`card ${styles.gameCard}`}>
          <div className="cardInner">
            <div className={styles.grid}>
              <div className={styles.col}>
                <div className={styles.sectionTitle}>{p1Name}</div>
                <MovePicker
                  label="Player 1 move picker"
                  selected={p1Move}
                  disabled={phase !== 'P1_PICK'}
                  onPick={onPickP1}
                />
              </div>

              <div className={styles.col}>
                <div className={styles.sectionTitle}>{p2Name}</div>
                <MovePicker
                  label="Player 2 move picker"
                  selected={p2Move}
                  disabled={phase !== 'P2_PICK'}
                  onPick={onPickP2}
                />
              </div>
            </div>

            <div className={styles.bottom}>
              {banner ? <ResultBanner text={banner.text} tone={banner.tone} /> : null}

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={nextRound}
                  disabled={phase !== 'RESULT'}
                >
                  Next round
                </button>

                <div className={styles.hint}>
                  {phase === 'P1_PICK' && 'Player 1: choose your move'}
                  {phase === 'P2_PICK' && 'Player 2: choose your move'}
                  {phase === 'RESULT' && 'Round complete'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${styles.footer} container`}>
        <span>React + TypeScript + SCSS</span>
      </footer>
    </div>
  );
}
