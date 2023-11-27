import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import useAlarms from './hooks/useAlarms';
import { soundObject } from './HomeScreen';


// import EditScreenInfo from '../../components/EditScreenInfo';
// import { SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
let unique_id = 0;

const DetailScreen = ({route, navigation}) => {
  const { alarms, setAlarms, loaded, setLoaded} = useAlarms();
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, onChangeText] = useState('Alarm 1');
  let accessToken = '';
  if (route.params != undefined) {
    accessToken = route.params.accessToken;
  }

  let setTime = new Date();
  let currTime = new Date().getTime();
  const repeat = 'Never';
  const label = 'Alarm 1';
  let sound = '';
  if (route.params != undefined) {
    if(route.params.name.length >= 20)
    {
      sound = route.params.name.slice(0,20) + '...';
    }
    else {
      sound = route.params.name;
    }
  }

  useEffect(() => {
    (async () => {
      const {status} = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
      }
    })();
  }, []);

  async function loadSound() {
    console.log("Loading sound");
    await soundObject.loadAsync(require('./sounds/tyler.mp3'));
    setLoaded(true);
  }

  const sendNotification = async () => {
    // let temp = Math.floor(setTime.getTime() / 100000) * 100000;
    

    const triggerTime = setTime;
    // triggerTime.setHours(7); // set the hour for the notification
    // triggerTime.setMinutes(30); // set the minute for the notification

    const schedulingOptions = {
      content: {
        title: 'Wake up!',
        body: 'You have new notifications.',
      },
      trigger: {
        hour: triggerTime.getHours(),
        minute: triggerTime.getMinutes(),
        repeats: false
      },
    };
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Wake up!',
    //     body: 'You have new notifications.',
    //   },
    // //   trigger: {
    // //     seconds: ((temp - currTime) / 1000) - seconds_minus,
    // //   },
    //   trigger: {
    //     hour: triggerTime.getHours(),
    //     minute: triggerTime.getMinutes(),
    //     repeats: false
    //   },
    // });
    // if(!loaded)
    // {
    //   loadSound();
    // }
    const notificationId = await Notifications.scheduleNotificationAsync(schedulingOptions);
    
    return notificationId;
    
  };

  const setNewTime = (DateTimePickerEvent, newTime) => {
    setTime = newTime;
    currTime = new Date().getTime();
    // console.log(setTime.getTime());
    let temp = Math.floor(setTime.getTime() / 1000) * 1000;
  };

  const saveAlarm = async () => {
    console.log("currTime when you save alarm");
    console.log(currTime);
    // sendNotification();
    let song = '';
    if (sound != '') {
      song = route.params.href
    }
    const notificationId = await sendNotification();
    
    let am = false;
    if(setTime.getHours() < 12)
    {
      am = true;
    }
    let hours = (setTime.getHours() + 24) % 12 || 12;
    const trimmedDate = setTime.toISOString().substring(0, 16); // "2023-10-30T17:02"
    console.log("unique ID");
    console.log(unique_id);
    setAlarms(prev => [...prev, { index: unique_id, hour: hours, minutes: setTime.getMinutes(), am: am, notificationId: notificationId, alarmName: text, song: song}])
    unique_id++;
    
    navigation.navigate('Home', {
        alarmTime: setTime.getTime(),
        song: song,
        accessToken: accessToken,
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

  const pickRepeat = () => {
    navigation.navigate('Repeat');
  }

  return (
    <View>
      {/* <View>
        <Text style={styles.edit_alarm}>Edit Alarm</Text>
      </View> */}
      
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
        
        <Pressable onPress={pickRepeat}
          style={styles.optionContainer}>
              <Text style={{position: 'relative', fontSize: 20}}>Repeat</Text>
              <Text style={{textAlign: 'right', fontSize: 20}}>{repeat} {'>'}</Text>
        </Pressable>
       
       <Pressable 
        style={styles.optionContainer}>
          <Text style={{position: 'relative', fontSize: 20}}>Label</Text>
          <TextInput
          value={text}
          style={styles.text}
          onChangeText={onChangeText}
          />
        </Pressable>
        
        <Pressable onPress={pickSound} 
          style={styles.optionContainer}>
          <Text style={{position: 'relative', fontSize: 20}}>Sound</Text>
          <Text style={{textAlign: 'right', fontSize: 20}}>{sound} {'>'} </Text>
        </Pressable>
        
        <View style={styles.optionContainer}>
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
};

// DetailScreen.navigationOptions = ({}) => ({
//   headerRight: () => (
//     <Button
//       onPress={saveAlarm}
//       title="Save"
//       color="#000"
//     />
//   ),
// });
 

const styles = StyleSheet.create({
  edit_alarm: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: '5%',
    paddingTop: '5%',
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
    borderBottomColor: '#e0e0e0',
    borderLeftColor: '#e0e0e0',
    borderRightColor: '#e0e0e0',
    borderTopColor: '#e0e0e0',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    margin: '2%',
  },
  text: {
    height: 20,
    fontSize: 20,
    marginLeft: 15,
  },
  optionContainer: {
    display: 'flex', 
    flexDirection:'row', 
    justifyContent: 'space-between', 
    paddingBottom: '5%', 
    paddingTop: '5%', 
    borderTopColor: 'black', 
    borderTopWidth: 1,
  },
});

export default DetailScreen;