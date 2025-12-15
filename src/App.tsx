import { useEffect, useMemo, useRef, useState } from 'react';

import { CvcControls } from './components/CvcControls/CvcControls';
import { ModeToggle } from './components/ModeToggle/ModeToggle';
import { MovePicker } from './components/MovePicker/MovePicker';
import { PlayerNames } from './components/PlayerNames/PlayerNames';
import { ResultBanner } from './components/ResultBanner/ResultBanner';
import { Scoreboard, type Score } from './components/Scoreboard/Scoreboard';
import type { GameMode } from './domain/modes';
import type { Move } from './domain/moves';
import { randomMove } from './domain/random';
import { decideWinner, resultLabel, type RoundResult } from './domain/rules';
import styles from './App.module.scss';

type Phase = 'P1_PICK' | 'P2_PICK' | 'RESULT';

const initialScore: Score = { p1: 0, p2: 0, draws: 0, rounds: 0 };

export default function App() {
  const [mode, setMode] = useState<GameMode>('PVP');

  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState('Player 2');

  const [p1Move, setP1Move] = useState<Move | null>(null);
  const [p2Move, setP2Move] = useState<Move | null>(null);
  const [phase, setPhase] = useState<Phase>('P1_PICK');
  const [score, setScore] = useState<Score>(initialScore);

  const [thinking, setThinking] = useState(false);
  const pvcTimer = useRef<number | null>(null);

  const [cvcRunning, setCvcRunning] = useState(false);
  const [cvcSpeedMs, setCvcSpeedMs] = useState(500);
  const cvcInterval = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (pvcTimer.current) window.clearTimeout(pvcTimer.current);
      if (cvcInterval.current) window.clearInterval(cvcInterval.current);
    };
  }, []);

  function stopCvc() {
    setCvcRunning(false);
    if (cvcInterval.current) window.clearInterval(cvcInterval.current);
    cvcInterval.current = null;
  }

  useEffect(() => {
    if (pvcTimer.current) window.clearTimeout(pvcTimer.current);
    pvcTimer.current = null;
    stopCvc();

    setThinking(false);
    setP1Move(null);
    setP2Move(null);
    setPhase('P1_PICK');
    setScore(initialScore);

    if (mode === 'PVC') {
      if (p2Name.trim() === '' || p2Name === 'Player 2') setP2Name('Computer');
      if (p1Name.trim() === '') setP1Name('Player');
    }
    if (mode === 'CVC') {
      if (p1Name.trim() === '' || p1Name === 'Player 1') setP1Name('Computer A');
      if (p2Name.trim() === '' || p2Name === 'Player 2') setP2Name('Computer B');
    }
    if (mode === 'PVP') {
      if (p1Name.trim() === '') setP1Name('Player 1');
      if (p2Name.trim() === '') setP2Name('Player 2');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (mode !== 'CVC') return;
    if (!cvcRunning) return;

    if (cvcInterval.current) window.clearInterval(cvcInterval.current);
    cvcInterval.current = window.setInterval(() => {
      const a = randomMove();
      const b = randomMove();
      setP1Move(a);
      setP2Move(b);
      setPhase('RESULT');
      applyResultAndScore(a, b);
    }, cvcSpeedMs);

    return () => {
      if (cvcInterval.current) window.clearInterval(cvcInterval.current);
      cvcInterval.current = null;
    };
  }, [mode, cvcRunning, cvcSpeedMs]);

  const result: RoundResult | null = useMemo(() => {
    if (!p1Move || !p2Move) return null;
    return decideWinner(p1Move, p2Move);
  }, [p1Move, p2Move]);

  const banner = useMemo(() => {
    if (phase !== 'RESULT' || !result) return null;
    const tone = result === 'DRAW' ? 'neutral' : result === 'P1_WIN' ? 'p1' : 'p2';
    return { text: resultLabel(result, p1Name, p2Name), tone: tone as 'neutral' | 'p1' | 'p2' };
  }, [phase, result, p1Name, p2Name]);

  function applyResultAndScore(p1: Move, p2: Move) {
    const r = decideWinner(p1, p2);
    setScore((s) => ({
      p1: s.p1 + (r === 'P1_WIN' ? 1 : 0),
      p2: s.p2 + (r === 'P2_WIN' ? 1 : 0),
      draws: s.draws + (r === 'DRAW' ? 1 : 0),
      rounds: s.rounds + 1,
    }));
    return r;
  }

  function onPickP1_PVP(m: Move) {
    setP1Move(m);
    setPhase('P2_PICK');
  }
  function onPickP2_PVP(m: Move) {
    setP2Move(m);
    setPhase('RESULT');
    applyResultAndScore(p1Move!, m);
  }

  function onPickP1_PVC(m: Move) {
    if (phase === 'RESULT' || thinking) return;
    setP1Move(m);
    setThinking(true);

    pvcTimer.current = window.setTimeout(() => {
      const comp = randomMove();
      setP2Move(comp);
      setPhase('RESULT');
      applyResultAndScore(m, comp);
      setThinking(false);
      pvcTimer.current = null;
    }, 450);
  }

  function nextRound() {
    if (pvcTimer.current) window.clearTimeout(pvcTimer.current);
    pvcTimer.current = null;

    setThinking(false);
    setP1Move(null);
    setP2Move(null);
    setPhase('P1_PICK');
  }

  function resetAll() {
    nextRound();
    stopCvc();
    setScore(initialScore);
  }

  const namesDisabled = mode === 'CVC';
  const p1WinnerClass = phase === 'RESULT' && result === 'P1_WIN' ? styles.p1Win : '';
  const p2WinnerClass = phase === 'RESULT' && result === 'P2_WIN' ? styles.p2Win : '';

  return (
    <div className={styles.page}>
      <header className={`${styles.header} container`}>
        <div className={styles.brand}>
          <div className={styles.logo}>RPS</div>
          <div>
            <div className={styles.title}>Rock • Paper • Scissors</div>
            <div className={styles.subtitle}>Animations + prefers-reduced-motion</div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className={styles.stack}>
          <ModeToggle value={mode} onChange={setMode} />

          <PlayerNames
            p1Name={p1Name}
            p2Name={p2Name}
            onChangeP1={(v) => !namesDisabled && setP1Name(v)}
            onChangeP2={(v) => !namesDisabled && setP2Name(v)}
          />
          {namesDisabled ? <div className={styles.note}>Names are fixed in Computer vs Computer.</div> : null}

          {mode === 'CVC' ? (
            <CvcControls
              running={cvcRunning}
              speedMs={cvcSpeedMs}
              onToggle={() => setCvcRunning((r) => !r)}
              onSpeedChange={setCvcSpeedMs}
            />
          ) : null}

          <Scoreboard p1Name={p1Name} p2Name={p2Name} score={score} onReset={resetAll} />

          <section className={`card ${styles.gameCard}`}>
            <div className="cardInner">
              <div className={styles.grid}>
                <div className={`${styles.col} ${p1WinnerClass}`}>
                  <div className={styles.sectionTitle}>{p1Name}</div>
                  <MovePicker
                    label="Player 1 move picker"
                    selected={p1Move}
                    disabled={
                      mode === 'CVC' ||
                      (mode === 'PVP' ? phase !== 'P1_PICK' : phase !== 'P1_PICK' || thinking)
                    }
                    onPick={mode === 'PVP' ? onPickP1_PVP : onPickP1_PVC}
                  />
                </div>

                <div className={`${styles.col} ${p2WinnerClass}`}>
                  <div className={styles.sectionTitle}>{p2Name}</div>
                  <MovePicker
                    label="Player 2 move picker"
                    selected={p2Move}
                    disabled={mode !== 'PVP' || phase !== 'P2_PICK'}
                    onPick={onPickP2_PVP}
                  />
                  {mode === 'PVC' ? (
                    <div className={styles.hintInline}>{thinking ? 'Computer is thinking…' : ' '}</div>
                  ) : null}
                </div>
              </div>

              <div className={styles.bottom}>
                {banner ? <ResultBanner text={banner.text} tone={banner.tone} /> : null}

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={nextRound}
                    disabled={mode === 'CVC' ? true : phase !== 'RESULT'}
                  >
                    Next round
                  </button>

                  <div className={styles.hint}>
                    {mode === 'PVP' && phase === 'P1_PICK' && 'Player 1: choose your move'}
                    {mode === 'PVP' && phase === 'P2_PICK' && 'Player 2: choose your move'}
                    {mode === 'PVP' && phase === 'RESULT' && 'Round complete'}

                    {mode === 'PVC' && phase === 'P1_PICK' && 'Choose your move'}
                    {mode === 'PVC' && thinking && 'Computer is choosing…'}
                    {mode === 'PVC' && phase === 'RESULT' && 'Round complete'}

                    {mode === 'CVC' && (cvcRunning ? 'Auto-playing…' : 'Press Start to autoplay')}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className={`${styles.footer} container`}>
        <span>React + TypeScript + SCSS</span>
      </footer>
    </div>
  );
}
