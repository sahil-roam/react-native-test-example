import React from 'react';
import { Notifications } from 'react-native-notifications';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-simple-toast';
import Roam from 'roam-reactnative';

export const permissionTask = () => {
    
    Roam.checkLocationPermission( status => {

        if(status !== 'GRANTED' && status !== 'ENABLED'){
            Roam.requestLocationPermission();
        }
    })

}




export const startListener = () => {
    Roam.startListener("location", (location) => {
        console.log(location)
        Notifications.postLocalNotification({
            body: JSON.stringify(location),
            title: 'Location Received',
        })
    
      });
}

export const stopTracking = () => {
    Roam.stopTracking();
}



export const startTracking = () => {
    Roam.publishAndSave()
    Roam.startTrackingCustom(
        true,
        false,
        Roam.ActivityType.FITNESS,
        Roam.DesiredAccuracyIOS.BEST,
        true,
        10,
        10,
        10,
      );
}
