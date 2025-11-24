// Arquivo: src/navigation/MainNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/App/HomeScreen';
import ProfileScreen from '../screens/App/ProfileScreen/ProfileScreen';

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ animation: 'slide_from_right' }} 
    />
  </Stack.Navigator>
);

export default MainNavigator;