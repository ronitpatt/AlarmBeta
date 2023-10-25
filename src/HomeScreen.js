import React, {useEffect} from 'react';
import { StyleSheet, Button, View} from 'react-native';
import * as Notifications from 'expo-notifications';
import { FontAwesome } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({navigation}) => {
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
        seconds: 5,
      },
    });
  };

  return (
    <>
    <FontAwesome style={styles.title}>Alarmify</FontAwesome>
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