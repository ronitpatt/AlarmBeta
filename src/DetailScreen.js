import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { Button, Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import useAlarms from './hooks/useAlarms';

// import EditScreenInfo from '../../components/EditScreenInfo';
// import { SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

const DetailScreen = ({navigation}) => {
  const { alarms, setAlarms } = useAlarms()
  const [isEnabled, setIsEnabled] = useState(false);

  let setTime = new Date();
  let currTime = new Date().getTime();
  const repeat = 'Never';
  const label = 'Alarm 1';
  const sound = 'Music';

  useEffect(() => {
    (async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
      }
    })();
  }, []);

  const sendNotification = async () => {
    // let temp = Math.floor(setTime.getTime() / 100000) * 100000;
    

    const triggerTime = setTime;
    // triggerTime.setHours(7); // set the hour for the notification
    // triggerTime.setMinutes(30); // set the minute for the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Wake up!',
        body: 'You have new notifications.',
      },
    //   trigger: {
    //     seconds: ((temp - currTime) / 1000) - seconds_minus,
    //   },
      trigger: {
        hour: triggerTime.getHours(),
        minute: triggerTime.getMinutes(),
        repeats: false
      },
    });
  };

  const setNewTime = (DateTimePickerEvent, newTime) => {
    setTime = newTime;
    currTime = new Date().getTime();
    // console.log(setTime.getTime());
    let temp = Math.floor(setTime.getTime() / 1000) * 1000;
  };

  const saveAlarm = () => {
    console.log("currTime when you save alarm");
    console.log(currTime);
    sendNotification();
    let am = false;
    if(setTime.getHours() < 12)
    {
      am = true;
    }
    let hours = (setTime.getHours() + 24) % 12 || 12;
    setAlarms(prev => [...prev, { hour: hours, minutes: setTime.getMinutes(), am: am}])
    navigation.navigate('Home', {
        alarmTime: setTime.getTime()
    });
  };

  const pickSound = () => {
    navigation.navigate('Sound');
  }

  const cancelButton = () => {
    navigation.navigate('Home');
  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  return (
    <View>
      <View>
        <Text style={styles.edit_alarm}>Edit Alarm</Text>
      </View>
      
      <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Button 
            title='Cancel' 
            onPress={cancelButton}></Button>
          <Button
            title='Save'
            onPress={saveAlarm}
          ></Button>
      </View>
      
      <DateTimePicker style={{paddingBottom: '5%'}} mode='time' display='spinner' value={setTime} onChange={setNewTime} />

      <View style={styles.options}>
        <Pressable onPress={() => {console.log('Repeat')}} style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%'}}><Text style={{position: 'relative', fontSize: 20}}>Repeat</Text><Text style={{textAlign: 'right', fontSize: 20}}>{repeat} {'>'}</Text></Pressable>
        <Pressable onPress={() => {console.log('Label')}} style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '5%', borderTopColor: 'black', borderTopWidth: 1}}><Text style={{position: 'relative', fontSize: 20}}>Label</Text><Text style={{textAlign: 'right', fontSize: 20}}>{label} </Text></Pressable>
        <Pressable onPress={pickSound} style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '5%', borderTopColor: 'black', borderTopWidth: 1}}><Text style={{position: 'relative', fontSize: 20}}>Sound</Text><Text style={{textAlign: 'right', fontSize: 20}}>{sound} {'>'} </Text></Pressable>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '5%', borderTopColor: 'black', borderTopWidth: 1}}>
          <Text style={{position: 'relative', fontSize: 20}}>Snooze</Text>
          <Switch 
            trackColor={{false: '#767577', true: '#1ED760'}}
            thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}/>
        </View>
      </View>
      <View style={{padding: '10%'}}></View>
   </View>
  );
    // return (
    //     <View style={{ flex: 1, backgroundColor: 'green' }} />
    // );
};


// DetailScreen.navigationOptions = ({navigation}) => ({
//     headerRight: () => (
//       <Button
//         onPress={() => navigation.navigate('Home')}
//         title="Save"
//         color="#000"
//       />
//     ),
//   }); 
  // look into this code
 

const styles = StyleSheet.create({
  edit_alarm: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: '5%'
  },
  cancel: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute'
  },
  save: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingBottom: '5%'
  },
  options: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomColor: 'black',
    borderLeftColor: 'black',
    borderTopColor: 'black',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    borderRadius: 10,
  },
});

export default DetailScreen;