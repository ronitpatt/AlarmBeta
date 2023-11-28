import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import DetailScreen from './src/DetailScreen';
import { AlarmProvider } from './src/contexts/alarmContext';
import SoundScreen from './src/SoundScreen';
import RepeatScreen from './src/RepeatScreen';
import PlaylistScreen from './src/PlaylistScreen';
import SongScreen from './src/SongScreen';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';


const Stack = createStackNavigator();
// import { Platform } from 'react-native'
// import { Database } from '@nozbe/watermelondb'
// import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

// import schema from './model/schema'
// import migrations from './model/migrations'
// import Alarm from './model/alarm' // ⬅️ You'll import your Models here

// // First, create the adapter to the underlying database:
// const adapter = new SQLiteAdapter({
//   schema,
//   // (You might want to comment it out for development purposes -- see Migrations documentation)
//   // migrations,
//   // (optional database name or file system path)
//   // dbName: 'myapp',
//   // (recommended option, should work flawlessly out of the box on iOS. On Android,
//   // additional installation steps have to be taken - disable if you run into issues...)
//   jsi: true, /* Platform.OS === 'ios' */
//   // (optional, but you should implement this method)
//   onSetUpError: error => {
//     // Database failed to load -- offer the user to reload the app or log out
//   }
// })

// // Then, make a Watermelon database from it!
// const database = new Database({
//   adapter,
//   modelClasses: [
//     Alarm, // ⬅️ You'll add Models to Watermelon here
//   ],
// })
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
        <Stack.Screen name="Playlists" component={PlaylistScreen} />
        <Stack.Screen name="Songs" component={SongScreen} />
        <Stack.Screen name="Repeat" component={RepeatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </AlarmProvider>
  );
}