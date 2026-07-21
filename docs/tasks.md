# Tasks — Ludo Game App

## Milestone 0: Project Setup
- [ ] T0.1 Initialize React Native project (Clean Architecture starter).
- [ ] T0.2 Configure folder structure: `domain/`, `application/`, `data/`, `presentation/`.
- [ ] T0.3 Set up navigation stack (Home, Setup, Board, GameOver).
- [ ] T0.4 Set up local persistence module (storage abstraction).
- [ ] T0.5 Configure linting, testing, and CI basics.

## Milestone 1: Domain & Rules
-[ ] T1.1 Define entities: `Game`, `Player`, `Token`, `Board`, `Dice`.
- [ ] T1.2 Model board layout: cells, paths per color, safe cells, home run.
- [ ] T1.3 Implement dice roll logic (1–6).
- [ ] T1.4 Implement token entry rule (requires 6).
- [ ] T1.5 Implement movement validation and path traversal.
- [ ] T1.6 Implement capture logic (send opponent token to base).
- [ ] T1.7 Implement safe-cell handling.
- [ ] T1.8 Implement extra-turn rule (roll 6 / capture).
- [ ] T1.9 Implement win detection (all tokens home).
- [ ] T1.10 Unit test all rules (deterministic).

## Milestone 2: Application Use Cases
- [ ] T2.1 `StartGame(config)`.
- [ ] T2.2 `RollDice(playerId)` with turn validation.
- [ ] T2.3 `MoveToken(playerId, tokenId, diceValue)`.
- [ ] T2.4 `EndTurn(gameId)` with turn-order advancement.
- [ ] T2.5 `CheckWin(gameId)`.
- [ ] T2.6 `SaveGame` / `LoadGame` use cases.
- [ ] T2.7 Unit tests for use cases.

## Milestone 3: Data Layer
- [ ] T3.1 Implement Game repository (in-memory + persisted).
- [ ] T3.2 Serialize/deserialize `Game` state.
- [ ] T3.3 Detect saved game on launch (enable Resume).
- [ ] T3.4 Tests for persistence round-trip.

## Milestone 4: Shared UI Components
- [ ] T4.1 Build primitives: Button, IconButton, Avatar, Badge, Card, Divider.
- [ ] T4.2 Build Modal, Toast/ToastNotification, ToggleSwitch, ProgressBar.
- [ ] T4.3 Build form controls: SegmentedControl, Stepper, TextInput, ColorSwatch, BottomSheet.
- [ ] T4.4 Build game components: LudoBoard, GameToken, DiceButton/AnimatedDice, CountdownTimer(Ring), TurnBanner/TurnIndicatorBanner, PlayerCard/PlayerRow, AvatarBadge, ColorChip, CoinBalancePill.

## Milestone 5: Home / Main Menu Screen
- [ ] T5.1 Layout sections: Background, Header/Branding, Profile Strip, Primary Actions, Secondary Nav, Daily Rewards Banner, Footer.
- [ ] T5.2 Wire New Game → Setup.
- [ ] T5.3 Wire Resume (enabled only if saved game exists).
- [ ] T5.4 Settings Modal (sound, haptics toggles).

## Milestone 6: Game Setup Screen
- [ ] T6.1 Layout sections and Header/BackButton.
- [ ] T6.2 Player Count Selector (2–4) via SegmentedControl/Stepper.
- [ ] T6.3 Player List with name TextInput and color assignment.
- [ ] T6.4 Color Palette Picker (BottomSheet) with duplicate prevention.
- [ ] T6.5 Game Options (turn timer toggle, etc.).
- [ ] T6.6 Summary Bar validation + Footer CTA → StartGame.

## Milestone 7: Game Board Screen
- [ ] T7.1 Top Bar and In-Game Overlays (pause).
- [ ] T7.2 Opponent Player Panels + Bottom Player Bar.
- [ ] T7.3 Render LudoBoard grid and Token Layer positioning.
- [ ] T7.4 Turn Indicator display.
- [ ] T7.5 Dice & Action Zone (active-player-only interaction).
- [ ] T7.6 Token tap → MoveToken with legal-move highlighting.
- [ ] T7.7 Emote/Toast notifications.

## Milestone 8: Turn Indicator / Dice Roll Overlay
- [ ] T8.1 OverlayBackdrop + TurnIndicatorBanner + PlayerOrderStrip.
- [ ] T8.2 AnimatedDice + RollButton → RollDice.
- [ ] T8.3 CountdownTimerRing → auto EndTurn on expiry.
- [ ] T8.4 ResultToast feedback.
- [ ] T8.5 SkipTurnButton, SoundToggle, HapticTrigger utilities.

## Milestone 9: Game Over / Results Screen
- [ ] T9.1 Victory Banner + Winner Spotlight + Confetti.
- [ ] T9.2 Final Rankings List with Rank Position Chips.
- [ ] T9.3 Score Summary Stats + Stat Chips.
- [ ] T9.4 Rewards & XP (XP Progress Bar, Achievement Badge).
- [ ] T9.5 Social Actions (Share) + Primary Actions Footer (Replay, Home).
- [ ] T9.6 Wire Replay (reuse setup) and Home (clear game).

## Milestone 10: Integration, QA & Polish
- [ ] T10.1 End-to-end pass-and-play flow test (2, 3, 4 players).
- [ ] T10.2 Offline verification (no network dependency).
- [ ] T10.3 Resume-after-relaunch verification.
- [ ] T10.4 Performance profiling (60fps target) for boardand dice animations.
- [ ] T10.5 Accessibility check (touch targets, sound/haptic toggles).
- [ ] T10.6 iOS and Android device testing.
- [ ] T10.7 Bug triage and fixes.
- [ ] T10.8 Release build configuration and store assets.