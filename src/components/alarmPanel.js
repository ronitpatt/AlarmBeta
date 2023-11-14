import React, {useEffect, useState} from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const renderRightActions = (progress, dragX, onDelete) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <TouchableOpacity onPress={onDelete}>
      <View style={styles.deleteBox}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

export default function AlarmPanel({ id, hour, minutes, am, handleDelete, notificationId, alarmName}) { // add index here 
  const [isEnabled, setIsEnabled] = useState(true);
  
  onDelete = () => {
    console.log("Delete function called.");
    handleDelete(id, notificationId);
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onDelete)}
    >
    <View style={styles.panelContainer}> 
        <View style={styles.panel}>
          <FontAwesome style={styles.timeDigits}>
            {hour}:{minutes < 10 ? "0" + minutes : minutes}
            <FontAwesome style={styles.timeOfDay}>
              {am ? "AM" : "PM"}
            </FontAwesome>
          </FontAwesome>

          <FontAwesome style={styles.name}>
          {alarmName}</FontAwesome>

        </View>
        <View>
          <Switch 
            trackColor={{false: '#767577', true: '#1ED760'}}
            thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
    </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  panelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#e0e0e0',
  },
  timeDigits: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin: 5,
  },
  timeOfDay: {
    fontSize: 20
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontWeight: '700',
  },
  name: {
    marginLeft: 5,
    fontSize: 15,
  }
  
});