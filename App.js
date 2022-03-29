/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Roam from 'roam-reactnative';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as RoamHelper from './RoamHelper';
import { toggleListener } from './RoamHelper';
import { useEffect } from 'react';
import { Notifications } from 'react-native-notifications';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-simple-toast';
import { useState } from 'react';


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

  const [userId, setUserId] = useState("");
  const [tripId, setTripId] = useState("");


  const createUser = () => {
    Roam.createUser("test-user",
    success => {
      console.log(`userId: ${success.userId}`);
      setUserId(success.userId);
    },
    error => {
      console.log(error)
    }
    )
  }

  const createTrip = () => {
    Roam.createTrip(false,
      success => {
        console.log(`tripId: ${success.id}`)
        setTripId(success.id)
      },
      error => {
        console.log(error)
      }
      )
  }

  const startTrip = () => {
    Roam.startTrip(tripId, "test-trip", 
    success => {
      console.log(success)
      Notifications.postLocalNotification({
        body: JSON.stringify(success),
        title: 'Trip',
    })
    },
    error => {
      console.log(error)
      Notifications.postLocalNotification({
        body: JSON.stringify(error),
        title: 'Trip Error',
    })
    }
    )
  }


  const stopTrip = () => {
    Roam.stopTrip(tripId, 
    success => {
      console.log(success)
      Notifications.postLocalNotification({
        body: JSON.stringify(success),
        title: 'Trip',
    })
    },
    error => {
      console.log(error)
      Notifications.postLocalNotification({
        body: JSON.stringify(error),
        title: 'Trip Error',
    })
    }
    )
  }


  const tripSummary = () => {
    Roam.getTripSummary(tripId, 
    success => {
      console.log(success)
      Toast.show(JSON.stringify(success), Toast.LONG)
    },
    error => {
      console.log(error)
      Toast.show(JSON.stringify(error))
    }
    )
  }


  const pauseTrip = () => {
    Roam.pauseTrip(tripId,
      success => {
        Notifications.postLocalNotification({
          body: JSON.stringify(success),
          title: 'Trip',
      })
      },
      error => {
        Notifications.postLocalNotification({
          body: JSON.stringify(error),
          title: 'Trip Error',
      })
      }
      )
  }


  const resumeTrip = () => {
    Roam.resumeTrip(tripId,
      success => {
        Notifications.postLocalNotification({
          body: JSON.stringify(success),
          title: 'Trip',
      })
    },
      error => {
        Notifications.postLocalNotification({
          body: JSON.stringify(error),
          title: 'Trip Error',
      })
      }
      )
  }







  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView>
      <Text style={styles.button1}>UserId: {userId}</Text>
      <Text style={styles.button1}>TripId: {tripId}</Text>
      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {RoamHelper.permissionTask()}}
      >
        <Text>Location Permission</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {toggleListener}}
      >
        <Text>Toggle Listener</Text>
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

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {createUser()}}
      >
        <Text>Create User</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {createTrip()}}
      >
        <Text>Create Trip</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {startTrip()}}
      >
        <Text>Start Trip</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {pauseTrip()}}
      >
        <Text>Pause Trip</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {resumeTrip()}}
      >
        <Text>Resume Trip</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {stopTrip()}}
      >
        <Text>Stop Trip</Text>
      </TouchableHighlight>

      <TouchableHighlight 
      style={styles.button1}
      onPress={() => {tripSummary()}}
      >
        <Text>Trip Summary</Text>
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
