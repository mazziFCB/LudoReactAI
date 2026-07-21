# Game App \u2014 Ludo (React Native + Clean Architecture)

A fully offline, 4-player, turn-based Ludo game built with Expo + React Native and TypeScript.

## Architecture

This project follows a Clean Architecture layering:

- **domain/** \u2014 Pure business logic: entities (`Player`, `Token`, `GameState`), use cases (dice, turns, win detection) and ports. No framework imports.
- **application/** \u2014 Zustand store orchestrating use cases into reactive state.
- **infrastructure/** \u2014 AsyncStorage adapter implementing the `GameRepository` port for offline persistence.
- **presentation/** \u2014 React Native screens, reusable components, navigation and theme.

## Screens

| Screen | File |
| --- | --- |
| Home / Main Menu | `src/presentation/screens/HomeScreen.tsx` |
| Game Setup | `src/presentation/screens/GameSetupScreen.tsx` |
| Game Board | `src/presentation/screens/GameBoardScreen.tsx` |
| Turn Indicator / Dice Roll | `src/presentation/screens/TurnDiceOverlay.tsx` |
| Game Over / Results | `src/presentation/screens/GameOverScreen.tsx` |

## Run


npm install
npx expo install react-native-safe-area-context react-native-screens @react-native-async-storage/async-storage
npm start

