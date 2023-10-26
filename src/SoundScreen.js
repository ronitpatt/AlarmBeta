import React, {useEffect} from 'react';
import { Text, View } from 'react-native';
import { Button, Pressable, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import { SafeAreaView } from 'react-native';

// import { useState } from 'react'

const Separator = () => <View style={styles.separator} />;

const SoundScreen = ({navigation}) => {

    return (
        <View>
          <View>
            <Text style={styles.sound}>Sound</Text>
          </View>
    
        <SafeAreaView>
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                    console.log('You tapped the button!');
                }}
                title="Connect to Spotify"
                />
          </View>
            <Separator />
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                    console.log('You tapped the button!');
                }}
                title="Pick a Song"
                /> 
          </View> 
            <Separator />
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                    console.log('You tapped the button!');
                }}
                title="Get a Recommendation"
                /> 
          </View> 
            <Separator />
          <View style={styles.buttonStyle}>
            <Button
                onPress={() => {
                    console.log('You tapped the button!');
                }}
                title="Share with Friends"
                /> 
          </View>
          </SafeAreaView> 
        </View>
      );
    };

    const styles = StyleSheet.create({
    sound: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    buttonStyle: {
        margin: 5,
        alignItems: 'left',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: 5
    }
    });

export default SoundScreen;