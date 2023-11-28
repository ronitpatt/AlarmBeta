import React, {useEffect, useState} from 'react';
import { StyleSheet, Button, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons';
import AlarmPanel from './components/alarmPanel';
import useAlarms from './hooks/useAlarms';
import { Audio } from 'expo-av';
import * as TaskManager from 'expo-task-manager';

export const soundObject = new Audio.Sound();

let songArr = [];
let accessToken = '';

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
  handleSuccess: async (notificationId) => (playSound())
});

async function stopSound() {
  console.log('Stopping sound');
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) { 
      if(response.status !== 204) {
        const responseJSON = await response.json();  
        console.log(responseJSON);
      }
    } else {
      console.error(`Response failed, status: ${response.status} ${response.statusText}`)
    }
  }
  catch(error) {
    console.error(error)
  }
}

async function playSound() {
  console.log('Playing sound');
  console.log(songArr);
    try {
      const response = await fetch("https://api.spotify.com/v1/me/player/play", {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uris": songArr
        })
      });
      if (response.ok) { 
        if(response.status !== 204) {
          const responseJSON = await response.json();  
          console.log(responseJSON);
        }
      } else {
        console.error(`Response failed, status: ${response.status} ${response.statusText}`)
      }
      songArr = [];
    }
    catch(error) {
      console.error(error)
    }
};

const HomeScreen = ({route, navigation}) => {
  const { alarms, setAlarms } = useAlarms()
  // const alarmTime = route.params.alarmTime;
  if (route.params != undefined) {
    accessToken = route.params.accessToken;
    let num = songArr.push(route.params.song)
  }
  const currTime = new Date().getTime();

  // const [sound, setSound] = useState("");
  
  // what if we call sendNotification function here instead of in DetailScreen 
  // so when the user saves the alarm, it goes back to home screen automatically
  // with the toggle switch flipped to "on" and then the sendNotification function is called
  // so if the user toggles the switch off, sendNotification isn't called

  // additional function to handle deletion
  const deleteAlarm = (id, notificationId) => {
    Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('pre delete index below');
    console.log(alarms);
    let updatedAlarms = alarms.filter((_, index) => index !== id);
    console.log(id);
    if(id == 1){
      console.log('FLAG');
    }
    setAlarms(updatedAlarms);
  };

  useEffect(() => {
    (async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
      }
    })();
    // const subscription = Notifications.addNotificationReceivedListener(notification => {
    //   console.log(notification);
    //   playSound();
    // });
    // return () => subscription.remove();
  }, [alarms]);

  // const sendNotification = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'Wake up!',
  //       body: 'You have new notifications.',
  //       sound: 'sunny.wav',
  //     },
  //     trigger: {
  //       seconds: (route.params.alarmTime - currTime) / 1000,
  //     },
  //   });
  // };

  return (
    <>
    <FontAwesome style={styles.title}>Alarmify</FontAwesome>
    <View style={styles.buttonContainer}>
      <Button title="SNOOZE" onPress={() => console.log('Snooze Pressed')} />
      <Button title='STOP' onPress={() => stopSound()} />
    </View>
    {alarms.map(({ index, hour, minutes, am, notificationId, alarmName}) => (
          <AlarmPanel key={index} id={index} hour={hour} minutes={minutes} am={am} handleDelete={deleteAlarm} notificationId={notificationId} alarmName={alarmName}/>    
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