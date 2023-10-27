import { View, Text, Switch, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default function AlarmPanel({ hour, minutes, am }) {
  return (
  <View style={styles.panelContainer}> 
    <FontAwesome style={styles.timeDigits}>
    {hour}:{minutes < 10 ? "0" + minutes : minutes}<FontAwesome style={styles.timeOfDay}>
      {am ? "AM" : "PM"}</FontAwesome>
    </FontAwesome>
    <Switch />
  </View>
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
  }
  
});