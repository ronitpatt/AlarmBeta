import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import DetailScreen from './src/DetailScreen';
import { AlarmProvider } from './src/contexts/alarmContext';
import SoundScreen from './src/SoundScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AlarmProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={HomeScreen.navigationOptions}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Sound" component={SoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AlarmProvider>
  );
}