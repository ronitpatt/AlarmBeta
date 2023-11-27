import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import useAlarms from './hooks/useAlarms';

const RepeatScreen = ({navigation}) => {
    const [dayRepeat, setDayRepeat] = useState({ Sunday: false, Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false});

    const setRepeat = (day) => {
        const obj = { ...dayRepeat};
        obj[day] = !dayRepeat[day];
        setDayRepeat(obj);
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <View>
              
          <View style={styles.options}>

            {daysOfWeek.map(day => {
                return (
                <Pressable key={day} onPress={() => setRepeat(day)} style={styles.optionContainer}>
                        <Text style={{position: 'relative', fontSize: 20}}>Every {day}</Text>
                        {dayRepeat[day] ? <Text style={{fontSize:20, paddingRight: 5}}>✓</Text> : null}
                </Pressable>
                )
            })}
            </View>
        <View style={{padding: '10%'}}></View>
       </View>
      );
}

const styles = StyleSheet.create({
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
optionContainer: {
    display: 'flex', 
    flexDirection:'row', 
    justifyContent: 'space-between', 
    paddingBottom: '5%', 
    paddingTop: '5%', 
    borderTopColor: 'black', 
    borderTopWidth: 1,
    },
})

export default RepeatScreen;