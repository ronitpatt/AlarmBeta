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

export default function AlarmPanel({ hour, minutes, onDelete }) { // add index here 
  onDelete = () => {
    console.log("Delete function called.");
  };
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onDelete)}
    >
    <View style={styles.panelContainer}> 
      <FontAwesome style={styles.timeDigits}>
      {hour}:{minutes}<FontAwesome style={styles.timeOfDay}>AM</FontAwesome>
      </FontAwesome>
      <Switch />
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
    padding: 8,
    backgroundColor: 'lightgreen'
  },
  timeDigits: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 15,
    margin: 10,
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
  
});