import styles from './ResultBanner.module.scss';

type Props = {
  text: string;
  tone: 'neutral' | 'p1' | 'p2';
};

export function ResultBanner({ text, tone }: Props) {
  return <div className={`${styles.banner} ${styles[tone]}`}>{text}</div>;
}
