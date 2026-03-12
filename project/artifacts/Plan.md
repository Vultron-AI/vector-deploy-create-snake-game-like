# Plan: Nokia Snake Game

Generated: 2026-03-09
Source: Project.md

## Overview
Build a browser-based Nokia Snake game with authentic retro visuals (green-on-black pixel aesthetic), keyboard controls, progressive difficulty, local personal best tracking, and a server-side global leaderboard backed by a Django REST API.

## Tasks

### task-01 Create Django leaderboard backend
**Description:** Create the Django backend at `/home/user/backend/`. Set up `pyproject.toml` with Django and DRF dependencies. Create the Django project config (`config/settings.py`, `config/urls.py`, `config/wsgi.py`, `config/asgi.py`, `manage.py`). Create a `shared/` app with `BaseModel` (UUID pk, created_at, updated_at). Create a `leaderboard/` app with a `Score` model (name: CharField max 3, score: IntegerField, created_at from BaseModel). Add a DRF serializer, a list/create view that returns the top 10 scores ordered by score descending (GET `/api/leaderboard/scores/`, POST `/api/leaderboard/scores/`). Wire URLs into `config/urls.py`. Settings should use SQLite for simplicity. Run `uv run manage.py migrate` to initialize the database. No authentication required for leaderboard endpoints.
**Context:** `frontend/vite.config.ts` (proxy target port 8000)
**Creates:** `backend/pyproject.toml`, `backend/manage.py`, `backend/config/__init__.py`, `backend/config/settings.py`, `backend/config/urls.py`, `backend/config/wsgi.py`, `backend/config/asgi.py`, `backend/shared/__init__.py`, `backend/shared/apps.py`, `backend/shared/models.py`, `backend/leaderboard/__init__.py`, `backend/leaderboard/apps.py`, `backend/leaderboard/models.py`, `backend/leaderboard/serializers.py`, `backend/leaderboard/views.py`, `backend/leaderboard/urls.py`, `backend/leaderboard/migrations/0001_initial.py`, `backend/leaderboard/migrations/__init__.py`
**Modifies:** None
**Depends on:** None
**Verification:** `cd /home/user/backend && uv run manage.py check` exits 0; migrations folder created; GET `/api/leaderboard/scores/` returns `{"count": 0, "results": []}` when backend runs

### task-02 Create Snake game logic hook
**Description:** Create `frontend/src/hooks/useSnakeGame.ts` — a React hook that encapsulates all game state and logic. Define TypeScript types for `Direction` (`'UP' | 'DOWN' | 'LEFT' | 'RIGHT'`), `Point` (`{x, y}`), `GameStatus` (`'idle' | 'running' | 'paused' | 'gameover'`). The hook manages: snake body (array of Points), food position, direction, score, game status, and speed interval. Game constants: board is 20×20 cells, initial snake length 3, initial speed 200ms, speed decreases by 5ms per food eaten (minimum 80ms). On each tick: advance snake head in current direction, check wall collision (game over), check self-collision (game over), check food collision (grow + new food + score += 10 + increase speed), otherwise remove tail. Expose: `gameStatus`, `snake`, `food`, `score`, `changeDirection(dir)`, `startGame()`, `resetGame()`. Use `useCallback` and `useRef` for interval management. Block 180-degree direction reversals. Use `useEffect` to listen for keydown events (arrow keys + WASD) and call `changeDirection`. `startGame` transitions from `idle`/`gameover` to `running`. `resetGame` resets all state to initial values.
**Context:** `frontend/src/hooks/useAuth.ts` (hook pattern reference)
**Creates:** `frontend/src/hooks/useSnakeGame.ts`
**Modifies:** None
**Depends on:** None
**Verification:** File exports `useSnakeGame` hook; TypeScript compiles without errors; hook returns all documented fields

### task-03 Create Nokia-style game board component
**Description:** Create `frontend/src/components/SnakeBoard.tsx`. Render the 20×20 grid as a CSS grid (400px × 400px on desktop, responsive to viewport on mobile). Each cell is a small square. Apply Nokia aesthetic: outer container styled like a Nokia 3310 phone bezel (dark gray/charcoal, rounded, with a faux-screen inset), game screen background is dark green (`#1a2e1a` or similar), active snake cells rendered as bright green (`#4afe4a` or similar pixel blocks with slight inner shadow for depth), food cell rendered as a blinking/distinct green dot. Use CSS custom properties from `tokens.css` where applicable but introduce inline styles or Tailwind classes for the Nokia-specific palette not covered by tokens. Show "PRESS ANY KEY" overlay text when `gameStatus === 'idle'`, "PAUSED" when paused, nothing when running. Accept props: `snake: Point[]`, `food: Point`, `gameStatus: GameStatus`, `score: number`, `personalBest: number`. Display score above the screen in Nokia-style monospace font. Include a title "SNAKE" in Nokia style above the bezel. Make the bezel responsive — on mobile stack it centered, on desktop center in page. Add `data-testid="snake.board"`, `data-testid="snake.score"`, `data-testid="snake.personal-best"` attributes.
**Context:** `frontend/src/components/ui/index.ts`, `frontend/src/index.css`
**Creates:** `frontend/src/components/SnakeBoard.tsx`
**Modifies:** None
**Depends on:** task-02
**Verification:** Component renders without errors; grid shows 400 cells; Nokia aesthetic visible with green-on-dark color scheme

### task-04 Create leaderboard service and components
**Description:** Create `frontend/src/services/leaderboardApi.ts` importing from `./api`. Define `LeaderboardEntry` type (`{id: string, name: string, score: number, created_at: string}`). Export `leaderboardApi` with `getTopScores(): Promise<LeaderboardEntry[]>` (GET `/api/leaderboard/scores/`) and `submitScore(name: string, score: number): Promise<LeaderboardEntry>` (POST `/api/leaderboard/scores/`). Create `frontend/src/components/LeaderboardTable.tsx` that displays top 10 scores in a Nokia-styled table (monospace font, green-on-dark, rank + name + score columns, highlight current player's entry if present). Add `data-testid="leaderboard.table"` and `data-testid="leaderboard.entry"` (on each row). Create `frontend/src/components/NameEntryModal.tsx` — a modal (use `Dialog` from UI components) that appears after game over if the score qualifies for the leaderboard (score > 0 and score beats the 10th place or fewer than 10 entries). Prompt player to enter 1–3 character initials (uppercase enforced), with a submit button. On submit, call `leaderboardApi.submitScore`. Add `data-testid="leaderboard.name-input"` and `data-testid="leaderboard.name-submit"`.
**Context:** `frontend/src/services/api.ts`, `frontend/src/components/ui/Dialog.tsx`, `frontend/src/components/ui/index.ts`
**Creates:** `frontend/src/services/leaderboardApi.ts`, `frontend/src/components/LeaderboardTable.tsx`, `frontend/src/components/NameEntryModal.tsx`
**Modifies:** None
**Depends on:** task-01
**Verification:** TypeScript compiles; `leaderboardApi` exports both functions; components render without import errors

### task-05 Wire game and leaderboard into App.tsx
**Description:** Update `frontend/src/App.tsx` to render the complete game experience. Import and use `useSnakeGame`. Track `personalBest` in `useState` initialized from `localStorage.getItem('snake-personal-best')`. After each game over, update personal best in state and localStorage if new score exceeds stored best. Use `@tanstack/react-query` (`QueryClient`, `QueryClientProvider`, `useQuery`, `useMutation`) to fetch and mutate the leaderboard — wrap app in `QueryClientProvider`. Fetch leaderboard with `useQuery` on mount and refetch after score submission. After game over: check if score qualifies (score > 0 and either fewer than 10 entries or score > min score in top 10) — if so, show `NameEntryModal`; after name submission, invalidate leaderboard query. Show `SnakeBoard` always. Below the board (or beside on desktop), show `LeaderboardTable` with fetched entries. Game over state: show final score, personal best, and leaderboard in a styled game-over overlay on the board. "Press any key or click to restart" triggers `resetGame` then `startGame`. Layout: vertically centered on mobile, side-by-side (board left, leaderboard right) on `md:` and above using Tailwind flexbox/grid.
**Context:** `frontend/src/App.tsx`, `frontend/src/hooks/useSnakeGame.ts`, `frontend/src/components/SnakeBoard.tsx`, `frontend/src/components/LeaderboardTable.tsx`, `frontend/src/components/NameEntryModal.tsx`, `frontend/src/services/leaderboardApi.ts`
**Creates:** None
**Modifies:** `frontend/src/App.tsx`
**Depends on:** task-02, task-03, task-04
**Verification:** App renders game board on load; snake moves on keypress; score increments on food; game over screen shows; personal best updates in localStorage; leaderboard panel visible

### task-06 Update E2E tests
**Description:** Update `frontend/tests/e2e/app.spec.ts` to test the Snake game. Replace existing TODO comments with actual assertions. `LandingPage` test: navigate to `/`, verify `data-testid="snake.board"` is visible, verify "PRESS ANY KEY" text visible, verify score display `data-testid="snake.score"` is visible, take screenshot. `MainPage` test: navigate to `/`, wait for board, simulate keydown (ArrowRight) to start game, wait 300ms, verify game board cell count is 400, verify score element shows "0", take full-page screenshot. Add a third test `leaderboard panel visible` that navigates to `/`, verifies `data-testid="leaderboard.table"` is in DOM (may be loading), waits for network idle, takes screenshot.
**Context:** `frontend/tests/e2e/app.spec.ts`, `frontend/playwright.config.ts`
**Creates:** None
**Modifies:** `frontend/tests/e2e/app.spec.ts`
**Depends on:** task-05
**Verification:** `npx playwright test` runs without import/syntax errors; screenshots are captured at `frontend/tests/screenshots/`

## Summary
- Total tasks: 6
- Files created: ~20 (backend scaffold + 5 frontend files)
- Files modified: 2 (`frontend/src/App.tsx`, `frontend/tests/e2e/app.spec.ts`)
- Estimated complexity: high
