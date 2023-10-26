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
  // console.log(alarmTime);
  // console.log(currTime);
  // console.log(alarmTime - currTime);
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
        sound: 'sunny.wav',
      },
      trigger: {
        seconds: (route.params.alarmTime - currTime) / 1000,
      },
    });
  };

  return (
    <>
    <FontAwesome style={styles.title}>Alarmify</FontAwesome>
    {alarms.map(({ hour, minutes}) => (
          <AlarmPanel hour={hour} minutes={minutes} />
    ))}
    <Button title="Add Alarm" onPress={() => setAlarms(prev => [...prev, { hour: 11, minutes: 30}])} />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgreen' }}>
      <Button title="Send notification" onPress={sendNotification} />
      
    </View>
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