---
description: Project design system with tokens, colors, typography, and component patterns
globs: **/*.tsx, **/*.ts, **/*.css
---

# Design System & Style Guide

## Design Tokens (tokens.css)

See `frontend/src/styles/tokens.css` (pre-generated).

The pre-generated tokens implement the Retro Nokia theme with the following values:

| Category | Token | Value |
|----------|-------|-------|
| Core | --color-bg | #C4CFA1 |
| Core | --color-surface | #8BAC0F |
| Core | --color-fg | #0F380F |
| Core | --color-muted | #306230 |
| Accent | --color-accent | #9BBC0F |
| Accent | --color-accent-hover | #8BAC0F |
| Accent | --color-focus-ring | #9BBC0F |
| Border | --color-border | #0F380F |
| Border | --color-border-hover | #306230 |
| Status | --color-success | #8BAC0F |
| Status | --color-warning | #9BBC0F |
| Status | --color-error | #306230 |
| Status | --color-info | #8BAC0F |
| Radius | --radius-sm | 0rem |
| Radius | --radius-md | 0.125rem |
| Radius | --radius-lg | 0.25rem |
| Shadow | --shadow-sm | 2px 2px 0 rgb(15 56 15 / 1) |
| Shadow | --shadow-md | 4px 4px 0 rgb(15 56 15 / 1) |
| Motion | --motion-fast | 0ms |
| Motion | --motion-normal | 100ms |

## Design Philosophy

**Pixel-Perfect Nostalgia. Sharp. Immediate.**

This design system recreates the iconic Nokia 3310 gaming experience—a monochrome LCD aesthetic where every pixel matters and simplicity is the ultimate sophistication.

- **Zero curves, maximum clarity**: Sharp edges and square corners mirror the pixel grid of classic LCD screens. No rounded corners soften the retro authenticity.
- **Four-shade palette discipline**: Like the original Game Boy/Nokia LCD, we work within a strict green-tinted monochrome palette. Constraints breed creativity.
- **Instant feedback, no delays**: Motion is either instant (0ms) or barely perceptible (100ms). Classic games didn't have loading spinners—neither do we.
- **Dense, compact layouts**: Screen real estate was precious. Every element earns its place through utility, not decoration.
- **Hard shadows, not soft glows**: Drop shadows are pixel-offset blocks, not blurred gradients. This reinforces the 8-bit aesthetic.
- **Monospace everything**: Space Mono throughout creates the terminal/LCD character grid feel essential to the era.

**Inspirations**: Nokia 3310 Snake, original Game Boy UI, DOS-era interfaces, pixel art games.

## Brand Voice

**Direct. Playful. Unapologetically Retro.**

| Principle | Avoid | Use |
|-----------|-------|-----|
| Brevity | "Please press the button below to commence gameplay" | "Press START" |
| Arcade tone | "Your session has concluded" | "GAME OVER" |
| All-caps for actions | "start game" | "START GAME" |
| Numeric precision | "You did great!" | "SCORE: 2,450" |
| Imperative commands | "You might want to try again" | "TRY AGAIN" |
| Retro terminology | "Points accumulated" | "HIGH SCORE" |
| Minimal punctuation | "Congratulations! You won!" | "YOU WIN" |

### Key Messages

**Headline**: Classic Snake. Pure Gameplay.

**Contrast Statement**: No ads, no upgrades, no distractions—just you, the snake, and the high score.

**Supporting Messages**:
- Simple controls, endless challenge
- Beat your high score, then beat it again
- The game that defined a generation, rebuilt for today
- One more game. You know you want to.

## Color Palette

### Primary Colors (LCD Foundation)

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| --color-bg | #C4CFA1 | `bg-[--color-bg]` | Page background, LCD "off" state |
| --color-surface | #8BAC0F | `bg-[--color-surface]` | Cards, game board, active LCD areas |
| --color-fg | #0F380F | `text-[--color-fg]` | Primary text, snake body, borders |

### Accent Color (Highlight State)

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| --color-accent | #9BBC0F | `bg-[--color-accent]` | Food pellet, interactive highlights |
| --color-accent-hover | #8BAC0F | `hover:bg-[--color-accent-hover]` | Button hover states |
| --color-focus-ring | #9BBC0F | `ring-[--color-focus-ring]` | Keyboard focus indicators |

### Secondary Neutrals

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| --color-muted | #306230 | `text-[--color-muted]` | Secondary text, instructions |
| --color-border | #0F380F | `border-[--color-border]` | All borders, grid lines |
| --color-border-hover | #306230 | `hover:border-[--color-border-hover]` | Interactive border states |

### Status Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| --color-success | #8BAC0F | `text-[--color-success]` | High score achieved, level complete |
| --color-warning | #9BBC0F | `text-[--color-warning]` | Speed increase warning |
| --color-error | #306230 | `text-[--color-error]` | Game over, collision |
| --color-info | #8BAC0F | `text-[--color-info]` | Instructions, tips |

**Accessibility Note**: The monochrome palette relies on value contrast rather than hue differentiation. All text combinations meet WCAG AA standards. Status differentiation uses iconography and position in addition to color.

## Typography

### Font Stack

| Role | Font | Fallback | Rationale |
|------|------|----------|-----------|
| Primary (All uses) | Space Mono | monospace | Monospace creates the LCD character grid aesthetic. Space Mono has excellent legibility at small sizes. |

**Note**: A single font family reinforces the constrained, retro aesthetic. No secondary font is needed.

### Weight Usage

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, instructions, secondary labels |
| Bold | 700 | Headings, scores, game states, CTAs |

### Type Scale

| Level | Tailwind Class | Size | Weight | Usage |
|-------|----------------|------|--------|-------|
| Hero | `text-4xl md:text-6xl` | 36px / 60px | 700 | Game title on start screen |
| Page Title | `text-2xl md:text-3xl` | 24px / 30px | 700 | "GAME OVER", "HIGH SCORES" |
| Section Title | `text-xl` | 20px | 700 | Panel headers, "CONTROLS" |
| Card Title | `text-lg` | 18px | 700 | Score display, level indicator |
| Body | `text-base` | 16px | 400 | Instructions, descriptions |
| Caption | `text-sm` | 14px | 400 | Hints, secondary info |
| Label | `text-xs` | 12px | 700 | Button text, status badges |

**Heading Note**: Use bold (700) freely—the retro aesthetic benefits from strong typographic weight. All-caps is encouraged for game UI elements.

## Spacing

The compact density of classic LCD games requires tight, consistent spacing.

| Token | Tailwind | Pixels | Usage |
|-------|----------|--------|-------|
| `p-1` | 4px | Inline padding, tight button padding |
| `p-2` | 8px | Default button padding, badge padding |
| `p-3` | 12px | Card internal padding, input padding |
| `p-4` | 16px | Section padding, modal padding |
| `p-6` | 24px | Page section margins |
| `p-8` | 32px | Hero section padding |
| `gap-1` | 4px | Tight element groups (score + label) |
| `gap-2` | 8px | Button groups, inline elements |
| `gap-3` | 12px | Form field spacing |
| `gap-4` | 16px | Card grid gaps, section spacing |
| `gap-6` | 24px | Major section separation |

## Components

### Cards

**Default Appearance**: Cards use `--color-surface` background with a 2px solid `--color-border` border. Apply `--radius-sm` (0rem) for perfectly square corners—no rounding. Internal padding is `p-3` (12px). Cards cast `--shadow-md` (4px 4px offset) to create the pixel-art depth effect.

**Interactive/Hover Treatment**: On hover, the shadow shifts to `--shadow-sm` (2px 2px) creating a "pressed" effect as if the card is moving toward the surface. This mimics physical button depression.

**When to Use**: Use elevated cards (with shadow) for primary interactive elements like the game board container, score displays, and action panels. Use flat cards (no shadow, border only) for secondary information like instructions or settings.

**Why**: The hard-offset shadow is essential to the retro aesthetic—it references pixel art and 8-bit game UI where soft shadows didn't exist.

### Buttons

**Primary Variant**: Background `--color-fg` (#0F380F, the darkest shade), text `--color-bg` (#C4CFA1, lightest shade) for maximum contrast. No border radius. Padding `px-4 py-2`. Apply `--shadow-sm` offset shadow. On hover, shadow reduces to 1px 1px and button translates down-right 1px (pressed effect). Text should be uppercase and bold.

**Secondary Variant**: Background `--color-surface`, text `--color-fg`, 2px solid `--color-border`. Same shadow and hover behavior as primary.

**Ghost Variant**: Transparent background, text `--color-fg`, no shadow. On hover, background becomes `--color-surface` at 50% opacity. Use for less prominent actions.

**Destructive Variant**: Same as Primary but use for irreversible actions (reset high score, quit game). Visually identical since our monochrome palette doesn't support red—rely on iconography (X icon) and confirmation dialogs.

**When to Use Each**:
- Primary: Main CTAs ("START GAME", "PLAY AGAIN")
- Secondary: Alternative actions ("VIEW HIGH SCORES", "SETTINGS")
- Ghost: Tertiary actions, navigation items
- Destructive: "RESET", "QUIT" with confirmation

**Why**: The shadow-shift hover effect creates tactile feedback without animation, matching the instant-response feel of physical buttons on old devices.

### Form Inputs

**Text Inputs**: Background `--color-bg`, 2px solid `--color-border`, no border radius. Padding `p-2`. Text in `--color-fg`, placeholder in `--color-muted`. Monospace font maintains the LCD aesthetic.

**Focus State**: Border remains `--color-border` (already high contrast). Add a 2px outline using `--color-focus-ring` with 2px offset to create a double-border effect that's clearly visible.

**Error State**: Border color shifts to `--color-error` (#306230). Display error message below input in `--color-error` with `text-sm`, prefixed with "!" character.

**Label Positioning**: Labels appear above inputs, using `text-xs` uppercase bold, with `mb-1` spacing. This mimics form labels on classic LCD interfaces.

**Why**: Minimal styling keeps inputs feeling like data-entry fields on old devices. The double-border focus state ensures accessibility without introducing new colors.

### Navigation Items

**Inactive State**: Text in `--color-muted`, no background. Padding `px-3 py-2`.

**Active State**: Background `--color-surface`, text `--color-fg` bold, 2px solid `--color-border` on all sides. This creates a "selected tab" appearance like menu selection on old phones.

**Hover (Inactive)**: Background `--color-bg` (subtle), text shifts to `--color-fg`.

**Why**: The bordered active state references the inverted selection highlight on monochrome LCDs where the selected item appeared as a filled rectangle.

### Tables (High Scores)

**Header Styling**: Background `--color-fg`, text `--color-bg` (inverted), uppercase, `text-xs` bold. Padding `px-3 py-2`.

**Body Rows**: Background alternates between `--color-bg` and `--color-surface` for scanability. Text `--color-fg`. Padding `px-3 py-2`.

**Hover Treatment**: Row background becomes `--color-accent` on hover, providing clear indication of the focused row.

**Cell Padding**: Consistent `px-3 py-2` throughout. Right-align numeric columns (scores, ranks).

**Borders**: 2px solid `--color-border` on table exterior. 1px solid `--color-border` between rows. No vertical cell borders—horizontal rules only.

**Why**: The inverted header and alternating rows maximize readability within the limited palette. This pattern directly references high score tables in arcade games.

### Status Badges

**Structure**: Inline-block, padding `px-2 py-0.5`, `text-xs` uppercase bold, no border radius.

**Variants**:
- Success: Background `--color-success`, text `--color-fg` — "NEW HIGH SCORE"
- Warning: Background `--color-warning`, text `--color-fg` — "SPEED UP"
- Error: Background `--color-fg`, text `--color-bg` (inverted) — "GAME OVER"
- Neutral: Background `--color-surface`, text `--color-fg`, border `--color-border` — "LEVEL 3"

**Why**: Given the monochrome palette, status differentiation relies on inversion and context rather than hue. The inverted error badge creates urgency through contrast reversal.

### Empty States

**Structure**: Centered container with:
1. Large icon (48px) in `--color-muted`
2. Title in `text-xl` bold, `--color-fg`
3. Description in `text-sm`, `--color-muted`
4. Primary CTA button

**Tone**: Keep messaging brief and action-oriented. Example for no high scores: Icon (Trophy), Title "NO HIGH SCORES YET", Description "Play a game to set your first record", CTA "START GAME".

**Visual Weight**: Empty states should feel like a pause screen—present but not demanding. Use `--color-muted` for icon and description to reduce visual weight.

**Why**: Empty states in retro games were simple prompts, not elaborate illustrations. Maintain that simplicity.

### Mobile Adaptations

**Touch Targets**: All interactive elements minimum 44px × 44px touch area. Buttons expand to `py-3` on mobile for comfortable tapping.

**Buttons**: Full-width (`w-full`) on mobile for primary actions. Button groups stack vertically with `gap-2`.

**Form Layouts**: Single column, full-width inputs. Labels remain above inputs. Increase input height to 48px for easier touch interaction.

**Tables**: On screens below 640px, high score tables remain as tables but enable horizontal scroll. Alternatively, convert to stacked cards showing Rank, Name, Score vertically.

**Game Controls**: Touch controls overlay the game area with large, semi-transparent directional buttons (up/down/left/right) positioned for thumb reach. Minimum 60px touch targets for game controls.

**Navigation**: Collapse to hamburger menu below 768px. Menu opens as full-screen overlay with large touch targets.

## Layout Patterns

### Page Header

**Hierarchy**: Game title centered, large (`text-4xl md:text-6xl`), bold, uppercase. Below title, a single-line tagline in `--color-muted` (`text-lg`). Primary CTA centered below tagline with generous spacing (`mt-6`).

**Spacing**: Title has `mb-2` to tagline, tagline has `mb-6` to CTA. Overall header section has `py-8 md:py-12`.

**Alignment**: Center-aligned throughout—this is a game, not a dashboard. Centered layouts feel more arcade-like.

**Why**: Classic game title screens were simple and centered. The hierarchy (title → tagline → action) guides the eye naturally downward to the CTA.

### Two-Panel Layout (Game + Sidebar)

**Structure**: On desktop (≥1024px), game board occupies the left 2/3, sidebar (score, controls, settings) occupies right 1/3. Sidebar has `--color-surface` background, 2px left border in `--color-border`.

**Game Board**: Square aspect ratio, centered within its container, maximum width 480px. Background `--color-bg` with 2px `--color-border`. The board itself uses CSS grid for the snake game cells.

**Sidebar Content**: Score display at top (largest), current level, controls reference, pause/restart buttons. Stack vertically with `gap-4`.

**Responsive Behavior**: Below 1024px, sidebar moves below the game board. On mobile (<640px), sidebar content becomes a collapsible panel or bottom sheet to maximize game board visibility.

**Visual Separation**: The border (not background change) separates panels, maintaining the LCD aesthetic where borders defined regions.

**Why**: The game board is the hero—it gets the most space. Sidebar information supports gameplay without competing for attention.

### Hero Section (Start Screen)

**Structure**:
1. Game title (Hero typography)
2. Pixel art snake graphic or ASCII art representation
3. Tagline
4. Primary CTA "START GAME"
5. Secondary links: "HIGH SCORES" | "HOW TO PLAY"

**Messaging Hierarchy**: Title dominates (60px on desktop), visual element provides nostalgia hook, CTA is unmissable.

**Visual Weight**: Heavy at top (title), lighter toward bottom. The CTA should have `--shadow-md` to pop from the page.

**Spacing**: Generous vertical spacing (`py-12 md:py-20`) creates a "screen" feel, as if the entire hero is the Nokia phone display.

**Why**: Start screens in classic games were simple: title, maybe a graphic, and "PRESS START". We honor that simplicity while ensuring the CTA is prominent.

### Responsive Breakpoints

| Breakpoint | Width | Tailwind Prefix | Layout Changes |
|------------|-------|-----------------|----------------|
| Mobile | ≥375px | (default) | Single column, stacked elements, full-width buttons, bottom navigation |
| Tablet | ≥768px | `md:` | Two-column where appropriate, side-by-side buttons, expanded game board |
| Desktop | ≥1024px | `lg:` | Two-panel layout (game + sidebar), maximum content width |
| Large Desktop | ≥1280px | `xl:` | Increased spacing, larger game board (max 600px) |

**Specific Adaptations**:

- **Start Screen**: Hero section is `py-8` on mobile, `py-12` on tablet, `py-20` on desktop. Title scales from `text-4xl` to `text-6xl`.
- **Game View**: Game board is full-width (minus padding) on mobile, fixed 480px on desktop. Sidebar stacks below on mobile, appears alongside on desktop.
- **High Scores**: Table scrolls horizontally on mobile or converts to card stack. On desktop, table displays fully.
- **Navigation**: Hamburger menu on mobile (<768px), horizontal nav on tablet+.
- **Modals/Dialogs**: Full-screen on mobile, centered overlay (max-width 400px) on desktop.

## Icons

**Icon Set**: Lucide Icons (consistent with shadcn/ui)

### Size Scale

| Size | Pixels | Tailwind | Usage |
|------|--------|----------|-------|
| sm | 16px | `w-4 h-4` | Inline with text, badges |
| md | 20px | `w-5 h-5` | Buttons, navigation items |
| lg | 24px | `w-6 h-6` | Section headers, standalone |
| xl | 32px | `w-8 h-8` | Feature highlights |
| 2xl | 48px | `w-12 h-12` | Empty states, hero elements |

### Color Guidance

| Context | Color Token | Usage |
|---------|-------------|-------|
| Primary | --color-fg | Default icon color, matches text |
| Muted | --color-muted | Secondary icons, decorative |
| Inverted | --color-bg | Icons on dark backgrounds (buttons) |
| Accent | --color-accent | Highlighted states, active indicators |

### Recommended Icons

| Purpose | Icon | Notes |
|---------|------|-------|
| Play/Start | `Play` | Game start CTA |
| Pause | `Pause` | Pause game |
| Restart | `RotateCcw` | Restart game |
| Settings | `Settings` | Settings/options |
| Trophy | `Trophy` | High scores |
| Arrow keys | `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` | Control indicators |
| Close | `X` | Close modals |
| Menu | `Menu` | Mobile hamburger |
| Info | `Info` | How to play |
| Volume | `Volume2`, `VolumeX` | Sound toggle |

**Stroke Width**: Use default stroke width (2px). Heavier strokes align with the pixel aesthetic.

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| --shadow-sm | `2px 2px 0 rgb(15 56 15 / 1)` | Buttons, small interactive elements, hover state for cards |
| --shadow-md | `4px 4px 0 rgb(15 56 15 / 1)` | Cards, game board container, modals |

**Usage Guidelines**:
- Apply shadows to elements that should appear "raised" from the LCD surface
- Remove or reduce shadows on hover/active to simulate pressing
- Never use blur-based shadows—hard offsets only
- Shadow color matches `--color-fg` for consistency

**Why**: Hard-offset shadows are a hallmark of pixel art and retro game UI. They create depth without breaking the aesthetic.

## Transitions

| Class | Duration | Usage |
|-------|----------|-------|
| `transition-none` | 0ms | Game elements (snake movement should be instant) |
| `duration-0` | 0ms | Immediate state changes |
| `duration-100` | 100ms | Button hover states, subtle UI feedback |

**Guidance**:
- **Game elements**: No transitions. Snake movement, food appearance, and collisions should be instant—this is how the original played.
- **UI elements**: Minimal transitions (100ms max) for hover states on buttons and navigation. The retro feel requires snappy responses.
- **Avoid**: Fade-ins, slide animations, elaborate transitions. These break the instant-feedback aesthetic.

**Tailwind Classes**:
```
transition-colors duration-100  // For hover color changes
transition-shadow duration-100  // For shadow shifts on press
transition-transform duration-100  // For button press effect
```

**Why**: Classic LCD games had no transition animations—state changes were immediate. We honor this with near-instant feedback.

## Borders & Radius

### Border Width

| Width | Usage |
|-------|-------|
| 1px | Table row separators, subtle dividers |
| 2px | Cards, buttons, inputs, game board, primary borders |
| 4px | Game board outer frame (optional emphasis) |

### Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| --radius-sm | 0rem | `rounded-none` | **Everything** — buttons, cards, inputs, badges |
| --radius-md | 0.125rem | `rounded-sm` | Reserved (rarely used, slight softening if needed) |
| --radius-lg | 0.25rem | `rounded` | Reserved (avoid using) |

**Guidance**: Default to `rounded-none` for all elements. The sharp corners are essential to the pixel-perfect LCD aesthetic. Only consider minimal rounding (`rounded-sm`) if accessibility testing reveals issues with sharp corners on touch targets.

### Element-Specific Borders

| Element | Border Treatment |
|---------|------------------|
| Cards | 2px solid --color-border, all sides |
| Buttons | 2px solid --color-border (secondary), none (primary) |
| Inputs | 2px solid --color-border |
| Game board | 2px solid --color-border, optional 4px outer frame |
| Tables | 2px exterior, 1px row separators |
| Modals | 2px solid --color-border |
| Badges | No border (rely on background) or 1px if needed |

## Checklist for New Components

Before shipping any new component, verify:

- [ ] **Background**: Uses `--color-bg` or `--color-surface` only—no off-palette colors
- [ ] **Text colors**: Primary text uses `--color-fg`, secondary uses `--color-muted`
- [ ] **Borders**: 2px solid `--color-border`, no other border colors
- [ ] **Border radius**: `rounded-none` applied—no rounded corners
- [ ] **Shadows**: Uses `--shadow-sm` or `--shadow-md` with hard offset—no blur
- [ ] **Accent usage**: `--color-accent` reserved for interactive highlights only
- [ ] **Typography**: Space Mono font, appropriate scale from type system
- [ ] **Spacing**: Uses defined spacing tokens (p-2, p-3, p-4, gap-2, gap-4)
- [ ] **Hover states**: Shadow reduces and/or element shifts for "pressed" effect
- [ ] **Focus states**: Visible focus ring using `--color-focus-ring`
- [ ] **Icons**: Lucide icons, appropriate size, color matches text hierarchy
- [ ] **Voice**: Text is brief, uppercase for actions, arcade tone
- [ ] **Mobile touch targets**: Minimum 44px × 44px for interactive elements
- [ ] **Responsive behavior**: Tested at 375px, 768px, and 1024px breakpoints

## Anti-Patterns (Avoid)

### Visual Anti-Patterns

- **Rounded corners**: Never use `rounded-md`, `rounded-lg`, or `rounded-full`. Sharp corners are mandatory.
- **Blur shadows**: Never use `shadow-lg` or any Tailwind shadow with blur. Only hard-offset pixel shadows.
- **Gradients**: No background gradients. Flat colors only.
- **Off-palette colors**: Never introduce colors outside the four-shade green palette.
- **Thin borders**: Avoid 1px borders except for table row separators. 2px is the standard.
- **Sans-serif fonts**: Never use Inter, system-ui, or other sans-serif fonts. Space Mono only.
- **Smooth animations**: Avoid `duration-300`, `duration-500`, or any animation longer than 100ms.
- **Opacity variations**: Avoid using opacity to create color variations. Use the defined palette shades.
- **Drop shadows on text**: No text shadows. Keep text flat.
- **Decorative elements**: No unnecessary ornamentation, illustrations, or embellishments.

### Voice Anti-Patterns

- **Verbose instructions**: Avoid "Please click the button below to start playing the game" → Use "START GAME"
- **Soft language**: Avoid "Oops! Something went wrong" → Use "ERROR" or "GAME OVER"
- **Emoji**: Never use emoji in UI text. Keep it text-only.
- **Exclamation overuse**: Avoid "Congratulations! You won! Amazing!" → Use "YOU WIN"
- **Marketing speak**: Avoid "Experience the ultimate retro gaming journey" → Use "CLASSIC SNAKE"
- **Lowercase CTAs**: Avoid "start game" → Use "START GAME"
- **Long error messages**: Avoid paragraph explanations → Use brief status + action
- **Informal greetings**: Avoid "Hey there! Ready to play?" → Use "PRESS START"
- **Modern slang**: Avoid "This game slaps" → Use straightforward arcade language
- **Question-based CTAs**: Avoid "Want to play again?" → Use "PLAY AGAIN"