import React, {useEffect, useState} from 'react';
import { StyleSheet, Button, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons';
import AlarmPanel from './components/alarmPanel';
import useAlarms from './hooks/useAlarms';
import { Audio } from 'expo-av';

export const soundObject = new Audio.Sound();

Audio.setAudioModeAsync({
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
  interruptionModeIOS: 1,
});


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
  handleSuccess: (notificationId) => (playSound())
});

async function stopSound() {
  console.log('Stopping sound');
  await soundObject.stopAsync();
  console.log('Sound stopped');
}

async function playSound() {
  console.log('Playing sound');
  await soundObject.playAsync();
  console.log('Sound played');
}

const HomeScreen = ({route, navigation}) => {
  const { alarms, setAlarms } = useAlarms()
  const alarmTime = route.params;
  const currTime = new Date().getTime();

  // const [sound, setSound] = useState("");
  
  // what if we call sendNotification function here instead of in DetailScreen 
  // so when the user saves the alarm, it goes back to home screen automatically
  // with the toggle switch flipped to "on" and then the sendNotification function is called
  // so if the user toggles the switch off, sendNotification isn't called

  useEffect(() => {
    (async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
      }
    })();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Wake up!',
        body: 'You have new notifications.',
      },
      trigger: {
        seconds: (route.params.alarmTime - currTime) / 1000,
      },
    });
  };

  return (
    <>
    <FontAwesome style={styles.title}>Alarmify</FontAwesome>
    <View style={styles.buttonContainer}>
      <Button title="SNOOZE" onPress={() => console.log('Snooze Pressed')} />
      <Button title='STOP' onPress={() => stopSound()} />
    </View>
    {alarms.map(({ index, hour, minutes, am}) => (
          <AlarmPanel key={index} hour={hour} minutes={minutes} am={am} />    
    ))}
    </>
  );
};

HomeScreen.navigationOptions = ({navigation}) => ({
  headerRight: () => (
    <Button
      onPress={() => navigation.navigate('Details')}
      title="Add"
      color="#000"
    />
  ),
});

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    alignSelf: 'flex-start',
    color: '#1ED760',
    marginTop: 15,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default HomeScreen;