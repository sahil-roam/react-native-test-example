/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import * as RoamHelper from './RoamHelper';
import { toggleListener } from './RoamHelper';
import { useEffect } from 'react';
import { Notifications } from 'react-native-notifications';


export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  useEffect(() => {
    if (Platform.OS === 'ios') {
      Notifications.registerRemoteNotifications();
    }
  }, [])


  /*
  User flow:
  1. Notification permission popup
  2. Location permission
  3. Toggle listener
  4. Start listener
  5. Start tracking
  */







  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView>
      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {RoamHelper.permissionTask()}}
      >
        <Text>Location Permission</Text>
      </TouchableHighlight>


      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {RoamHelper.startListener()}}
      >
        <Text>Start Listener</Text>
      </TouchableHighlight>
      
      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {RoamHelper.startTracking()}}
      >
        <Text>Start Tracking</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {RoamHelper.stopTracking()}}
      >
        <Text>Stop Tracking</Text>
      </TouchableHighlight>

     
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  button1: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    color: 'blue',
    alignSelf: 'center'
  }
  
});
