# Design — Ludo Game App

## 1. Architecture: Clean Architecture
The app is organized into concentric layers with dependencies pointing inward.


presentation/   -> React Native screens, components, view-models/hooks
application/    -> use cases (StartGame, RollDice, MoveToken, EndTurn, CheckWin)
domain/         -> entities (Game, Player, Token, Board, Dice), rules, interfaces
data/           -> repositories impl, local persistence (game state store)


- **Domain** holds pure Ludo rules and entities (no framework code).
- **Application** orchestrates use cases and enforces turn order.
- **Data** implements persistence for offline resume.
- **Presentation** renders screens and dispatches user intents to use cases.

## 2. Core Domain Model
- `Game`: players[], currentTurnIndex, status, board, diceState.
- `Player`: id, name, color, tokens[], isActive.
- `Token`: id, position (base | path index | home run | home), state.
- `Board`: cell layout, safe cells, home paths per color.
- `Dice`: value (1–6), rolled flag.
- **Rules engine:** token entry on 6, movement validation, captures, safe cells, extra turn on 6/capture, win detection.

## 3. State Management
- A single `Game` aggregate holds authoritative state.
- Presentation subscribes via view-models/hooks; updates flow: user action → use case → domain mutation → persisted → UI re-render.
- Local persistence stores the serialized `Game` to enable **Resume**.

## 4. Screen Designs

### 4.1 Home / Main Menu
- **Sections:** Background Layer, Header/Branding, Player Profile Strip, Primary Action Zone (New Game, Resume), Secondary Navigation (Settings), Daily Rewards Banner, Footer/System Info.
- **Components:** Button, IconButton, Avatar, Badge, Card, Toggle, ProgressBar, Modal, Toast, Divider.
- **Behavior:** Resume enabled only when a saved game exists; Settings open a Modal.

### 4.2 Game Setup
- **Sections:** Header, Intro Prompt, Player Count Selector, Player List & Color Assignment, Color Palette Picker, Game Options, Summary Bar, Footer CTA.
- **Components:** BackButton, SegmentedControl, Stepper, PlayerRow, TextInput, ColorSwatch, BottomSheet, ToggleSwitch, AvatarBadge, PrimaryButton, TextButton, Divider.
- **Behavior:** SegmentedControl/Stepper selects 2–4 players; color picker opens BottomSheet; duplicate colors disabled; Summary Bar validates before CTA enables.

### 4.3 Game Board
- **Sections:** Top Bar, Opponent Player Panels, Turn Indicator, Ludo Board, Token Layer, Dice & Action Zone, Bottom Player Bar, In-Game Overlays.
- **Components:** IconButton, PlayerCard, AvatarBadge, TurnBanner, CountdownTimer, LudoBoard, GameToken, DiceButton, ToastNotification, EmotePicker, CoinBalancePill, ColorChip.
- **Behavior:** `LudoBoard` renders a fixed grid; `GameToken` positions map to board coordinates; only the active player's DiceButton is interactive; token tap triggers `MoveToken` when legal.

### 4.4 Turn Indicator / Dice Roll
- **Sections:** Game Overlay Backdrop, Turn Indicator Banner, Player Order Strip, Dice Display Area, Roll Action Zone, Turn Timer, Result Feedback, Utility Controls.
- **Components:** OverlayBackdrop, TurnIndicatorBanner, PlayerAvatar, PlayerOrderStrip, AnimatedDice, RollButton, CountdownTimerRing, ResultToast, IconButton, HapticTrigger, SoundToggle, SkipTurnButton.
- **Behavior:** RollButton dispatches `RollDice`; AnimatedDice plays then reveals value; timer ring drives auto-skip via `EndTurn`.

### 4.5 Game Over / Results
- **Sections:** Victory Banner, Winner Spotlight, Final Rankings List, Score Summary Stats, Rewards & XP, Social Actions, Primary Actions Footer.
- **Components:** Trophy Badge Icon, Winner Card, Avatar, Ranking List Item, Rank Position Chip, Stat Chip, XP Progress Bar, Achievement Badge, Primary Button, Secondary Button, Share Button, Confetti Animation.
- **Behavior:** Triggered by `CheckWin`; Replay reuses prior setup; Home clears active game.

## 5. Navigation Flow

Home → Game Setup → Game Board ⇄ Turn/Dice Overlay → Game Over → (Replay → Game Board | Home)
Home → Resume → Game Board


## 6. Use Cases (Application Layer)
- `StartGame(config)` → initializes Game, persists.
- `RollDice(playerId)` → validates turn, produces dice value.
- `MoveToken(playerId, tokenId, diceValue)` → validates & applies move, handles capture.
- `EndTurn(gameId)` → advances currentTurnIndex (respecting extra turns).
- `CheckWin(gameId)` → evaluates win condition.
- `SaveGame`/`LoadGame` → persistence for resume.

## 7. Offline & Persistence Strategy
- All logic runs on-device; no network calls.
- Serialize `Game` state on each turn boundary to local storage.
- On launch, detect saved game to toggle Resume.

## 8. Reusable UI Component Library
Shared primitives (Button, IconButton, Avatar, Badge, Card, Divider, Toast/ToastNotification, Modal, ToggleSwitch) live in a common `presentation/components` module for consistency across screens.