# Requirements — Ludo Game App

## 1. Overview
A fully offline, turn-based Ludo game for up to 4 players, built with React Native following Clean Architecture principles. Players load the app, configure a match, and play Ludo locally with each player waiting for their turn.

## 2. Vision & Goals
- **Vision:** A complete offline 4-player Ludo experience.
- **Goals:**
  - Load the game quickly and reliably.
  - Support classic Ludo rules for 2–4 players.
  - Enforce turn-based play where each player waits for their turn.
  - Fully offline — no network dependency required.

## 3. Functional Requirements

### 3.1 Home / Main Menu
- FR-1: The user shall be able to start a new game.
- FR-2: The user shall be able to resume an in-progress game if one exists.
- FR-3: The user shall be able to access settings (sound, haptics, etc.).
- FR-4: The screen shall display branding, a player profile strip, and optional daily rewards banner.
- FR-5: The system shall display version/system info in a footer.

### 3.2 Game Setup
- FR-6: The user shall select the number of players (2–4).
- FR-7: The user shall assign colors to each player from the available palette.
- FR-8: The user shall optionally name each player.
- FR-9: The system shall prevent duplicate color assignments.
- FR-10: The user shall configure game options (e.g., turn timer on/off).
- FR-11: A summary bar shall reflect the current configuration before starting.
- FR-12: The user shall confirm setup via a primary CTA to begin the match.

### 3.3 Game Board
- FR-13: The system shall render a standard Ludo board with four home bases and paths.
- FR-14: The system shall display all active player tokens in their assigned colors.
- FR-15: The system shall indicate the current player's turn visually.
- FR-16: The user shall roll the dice on their turn only.
- FR-17: The system shall move tokens according to the dice value and Ludo rules (entry on 6, capture, safe cells, home run).
- FR-18: The system shall grant an extra turn on rolling a 6 or capturing an opponent.
- FR-19: The system shall show opponent player panels with status.
- FR-20: The system shall support an optional per-turn countdown timer.
- FR-21: The system shall show in-game overlays (pause, notifications).

### 3.4 Turn Indicator / Dice Roll
- FR-22: The system shall display whose turn it is via a banner and player order strip.
- FR-23: The user shall trigger a dice roll with an animated result.
- FR-24: The system shall provide result feedback (toast) after each roll.
- FR-25: The system shall support skipping a turn (e.g., no valid moves or manual skip).
- FR-26: The user shall toggle sound and haptics from utility controls.
- FR-27: The system shall auto-advance the turn when the timer expires (if enabled).

### 3.5 Game Over / Results
- FR-28: The system shall detect a win condition when a player brings all tokens home.
- FR-29: The system shall display the winner and final rankings.
- FR-30: The system shall show score/stat summaries.
- FR-31: The user shall be able to replay (rematch) or return to the main menu.
- FR-32: The system shall present rewards/XP and celebration animation.

## 4. Non-Functional Requirements
- NFR-1 (Offline): The app shall function entirely without a network connection.
- NFR-2 (Persistence): Game state shall persist locally to allow resume.
- NFR-3 (Performance): Board and token rendering and dice animations shall run smoothly (target 60fps).
- NFR-4 (Portability): The app shall run on both iOS and Android via React Native.
- NFR-5 (Maintainability): Code shall follow Clean Architecture layering (domain, data, presentation).
- NFR-6 (Accessibility): Interactive controls shall have adequate touch targets and optional haptic/sound feedback.
- NFR-7 (Reliability): Turn logic and rules validation shall be deterministic and testable.

## 5. Constraints & Assumptions
- Local multiplayer (pass-and-play); no AI opponent required in scope unless specified.
- Tech stack beyond React Native is not yet specified.
- No backend or online play is required.

## 6. Out of Scope
- Online/networked multiplayer.
- Server-side accounts and cloud sync.
- Monetization/in-app purchases (daily rewards/XP are presentational).