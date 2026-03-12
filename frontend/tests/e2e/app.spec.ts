/**
 * E2E Tests for Nokia Snake Game
 */

import { test, expect } from '@playwright/test'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// DO NOT CHANGE THESE NAMES
const MAIN_PAGE_SCREENSHOT_NAME = 'MainPage'
const LANDING_PAGE_SCREENSHOT_NAME = 'LandingPage'

// Ensure screenshots directory exists (ESM-compatible)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const screenshotsDir = join(__dirname, '..', 'screenshots')
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true })
}

test.describe('App E2E Tests', () => {
  test('captures LandingPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify game board is visible
    await expect(page.getByTestId('snake.board')).toBeVisible()

    // Verify "PRESS ANY KEY" text is visible on idle screen
    await expect(page.getByText('PRESS ANY KEY')).toBeVisible()

    // Verify score display is visible
    await expect(page.getByTestId('snake.score')).toBeVisible()

    await page.screenshot({
      path: join(screenshotsDir, LANDING_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    await expect(page).toHaveTitle(/.+/)
  })

  test('captures MainPage screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Wait for the board to appear
    await page.waitForSelector('[data-testid="snake.board"]')

    // Simulate ArrowRight keydown to start the game
    await page.keyboard.press('ArrowRight')

    // Wait briefly for game to start
    await page.waitForTimeout(300)

    // Verify grid has 400 cells (20x20)
    const cells = page.locator('[data-testid="snake.board"] > div')
    await expect(cells).toHaveCount(400)

    // Verify score element shows "0" at start
    const scoreEl = page.getByTestId('snake.score')
    await expect(scoreEl).toContainText('0')

    await page.screenshot({
      path: join(screenshotsDir, MAIN_PAGE_SCREENSHOT_NAME + '.png'),
      fullPage: true,
    })

    await expect(page).toHaveTitle(/.+/)
  })

  test('leaderboard panel visible', async ({ page }) => {
    await page.goto('/')

    // Verify leaderboard table is in DOM (may show empty state without backend)
    const leaderboardOrEmpty = page.locator('[data-testid="leaderboard.table"], [data-testid="leaderboard.table"]')
    await expect(leaderboardOrEmpty.or(page.locator('text=HIGH SCORES'))).toBeVisible({ timeout: 5000 })

    // Wait for network idle (leaderboard may be loading)
    await page.waitForLoadState('networkidle')

    await page.screenshot({
      path: join(screenshotsDir, 'LeaderboardPanel.png'),
      fullPage: true,
    })
  })
})
