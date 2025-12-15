# Rock Paper Scissors (React + TypeScript + SCSS)

A small Rock / Paper / Scissors game with:

- Player vs Player
- Scoreboard
- Responsive UI
- Bonus modes: Player vs Computer, Computer vs Computer (autoplay)
- Names
- Small animations + respects `prefers-reduced-motion`

## Tech stack

- React + TypeScript (Vite)
- Sass / SCSS
- ESLint + Prettier

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Lint / format

```bash
npm run lint
npm run format
```

## Notes on architecture

- src/domain/ contains pure functions for rules and random move generation.

- UI is broken into small components (MovePicker, Scoreboard, ModeToggle, etc.).

- Computer-vs-computer autoplay cleans up intervals properly on mode changes/unmount.
