import React from 'react';
import { Text, View } from 'react-native';
import { Button, Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-gesture-handler';
// import EditScreenInfo from '../../components/EditScreenInfo';
// import { SafeAreaView } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

const DetailScreen = ({navigation}) => {
  let setTime = new Date();
  const repeat = 'Never';
  const label = 'Alarm 1';
  const sound = 'Music';
  let isEnabled = false;

  const setNewTime = (DateTimePickerEvent, newTime) => {
    setTime = newTime;
    console.log(setTime);
  };

  const saveAlarm = () => {
    navigation.navigate('Home', {
        alarmTime: setTime.getTime()
    });
  };

  return (
    <View>
      <View>
        <Text style={styles.edit_alarm}>Edit Alarm</Text>
      </View>
      
      <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <Button title='Cancel' onPress={() => {
            console.log("Cancel")
          }}></Button>
          <Button
            title='Save'
            onPress={saveAlarm}
          ></Button>
      </View>
      
      <DateTimePicker style={{paddingBottom: '5%'}} mode='time' display='spinner' value={setTime} onChange={setNewTime} />

      <View style={styles.options}>
        <Pressable onPress={() => {console.log('Repeat')}} style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%'}}><Text style={{position: 'relative', fontSize: 20}}>Repeat</Text><Text style={{textAlign: 'right', fontSize: 20}}>{repeat}{'>'}</Text></Pressable>
        <Pressable onPress={() => {console.log('Label')}} style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '5%', borderTopColor: 'black', borderTopWidth: 1}}><Text style={{position: 'relative', fontSize: 20}}>Label</Text><Text style={{textAlign: 'right', fontSize: 20}}>{label} </Text></Pressable>
        <Pressable onPress={() => {console.log('Sound')}} style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '5%', borderTopColor: 'black', borderTopWidth: 1}}><Text style={{position: 'relative', fontSize: 20}}>Sound</Text><Text style={{textAlign: 'right', fontSize: 20}}>{sound} {'>'} </Text></Pressable>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '5%', borderTopColor: 'black', borderTopWidth: 1}}><Text style={{position: 'relative', fontSize: 20}}>Snooze</Text><Switch trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
            isEnabled=!isEnabled
            console.log('snooze change')}
        }
        value={isEnabled}/></View>
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