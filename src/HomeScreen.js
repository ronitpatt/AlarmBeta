import React, {useEffect, useState} from 'react';
import { StyleSheet, Button, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons';
import AlarmPanel from './components/alarmPanel';
import useAlarms from './hooks/useAlarms';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({route, navigation}) => {
  const { alarms, setAlarms } = useAlarms()
  const alarmTime = route.params;
  const currTime = new Date().getTime();
  
  // what if we call sendNotification function here instead of in DetailScreen 
  // so when the user saves the alarm, it goes back to home screen automatically
  // with the toggle switch flipped to "on" and then the sendNotification function is called
  // so if the user toggles the switch off, sendNotification isn't called

  // additional function to handle deletion
  const deleteAlarm = (id, notificationId) => {
    Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('pre delete size below');
    console.log(alarms.length);
    console.log(alarms);
    let updatedAlarms = alarms.filter((_, index) => index !== id);
    console.log(id);
    if(id == 1){
      console.log('FLAG');
    }
    console.log(alarms.length);
    console.log('deleting size below');
    console.log(updatedAlarms.length);
    setAlarms(updatedAlarms);
  };

  useEffect(() => {
    (async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
      }
    })();
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
    {alarms.map(({ index, hour, minutes, am, notificationId}) => (
          <AlarmPanel key={index} id={index} hour={hour} minutes={minutes} am={am} handleDelete={deleteAlarm} notificationId={notificationId}/>
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
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: 'lightgreen',
    marginTop: 15,
    margin: 10,
  },
  
});

export default HomeScreen;