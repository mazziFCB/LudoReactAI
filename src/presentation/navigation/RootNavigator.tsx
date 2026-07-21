import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors } from '@presentation/theme/theme';
import { HomeScreen } from '@presentation/screens/HomeScreen';
import { GameSetupScreen } from '@presentation/screens/GameSetupScreen';
import { GameBoardScreen } from '@presentation/screens/GameBoardScreen';
import { GameOverScreen } from '@presentation/screens/GameOverScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background }
};

export const RootNavigator: React.FC = () => (
  <NavigationContainer theme={navTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='GameSetup' component={GameSetupScreen} />
      <Stack.Screen name='GameBoard' component={GameBoardScreen} />
      <Stack.Screen name='GameOver' component={GameOverScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
