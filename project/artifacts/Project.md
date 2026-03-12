# Nokia Snake Game

## What This Is

A browser-based Snake game that faithfully recreates the classic Nokia 3310 experience. Built for casual web visitors who want a quick hit of nostalgia — pixel-style graphics, green-and-black color scheme, and the same simple mechanics that made the original addictive.

## Core Value

The game must feel exactly like playing Snake on a Nokia 3310 — authentic retro visuals and smooth, responsive controls that make the nostalgia hit immediately.

## Target Users

- **Casual web visitors** looking to kill a few minutes with a familiar, no-commitment game
- People with nostalgia for early mobile gaming (broadly: anyone who remembers Nokia-era phones)
- No sign-up or commitment required — they land on the page and play

## Context

- The original Nokia Snake is one of the most recognized casual games ever made
- There's a built-in audience of people who remember it fondly and would play it again on impulse
- The appeal is simplicity and nostalgia — the game needs to load fast and feel right immediately
- Desktop/keyboard-first experience for v1

## Key Features

- **Classic Snake gameplay**: Player controls a snake that moves continuously, eats food to grow longer, and dies on collision with walls or itself
- **Authentic Nokia aesthetic**: Pixel-style graphics, green/black color scheme, minimal UI — visually faithful to the Nokia 3310 screen
- **Score tracking**: Current score displayed during gameplay, increasing as the snake eats food
- **Progressive difficulty**: Snake speed increases as it grows, matching the original's escalating challenge
- **Personal best**: Player's highest score saved locally so they can try to beat it across sessions
- **Global leaderboard**: Top scores from all players displayed, giving visitors something to compete against
- **Keyboard controls**: Arrow keys and WASD for direction input

## User Flows

**Primary flow — Play the game:**
1. Player lands on the page and sees the game board styled like a Nokia screen, with a "Press any key to start" prompt
2. Player presses a key; the snake begins moving and food appears on the board
3. Player uses arrow keys or WASD to direct the snake toward food
4. Snake grows longer and score increases with each food item eaten; speed gradually increases
5. Game ends when the snake hits a wall or itself
6. Game over screen shows final score, personal best, and the global leaderboard
7. Player presses a key to restart immediately

**Secondary flow — Leaderboard entry:**
1. After game over, if the player's score qualifies for the global leaderboard, they're prompted to enter a name/initials
2. Their score appears on the leaderboard visible to all players

## Data & Integrations

- **Score data**: Current score and personal best stored in the player's browser (no account needed)
- **Leaderboard data**: Top scores with player names stored on the server so all visitors can see them
- **No external integrations needed** — the game is fully self-contained

---
*Created: 2026-03-09*
