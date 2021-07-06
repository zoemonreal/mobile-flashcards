import React from "react";
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';




const NOTIFICATION_KEY = 'Flashcard:notifications'

export function getDailyReminderValue () {
  return {
    today: "👋 Don't forget to study today!"
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Time to study!',
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log(data);

      if (data === null) {
        console.log(data);
         Notifications.requestPermissionsAsync()
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              let testTime =60;
              
                 
        
              Notifications.scheduleNotificationAsync(
                {
                  content: createNotification(),
                  trigger: {
                    date: tomorrow,
                    // second: 60, 
                    
                    repeats: true 
  

                  },
                }
              )
              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: false,
                  shouldSetBadge: false,
                }),
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
  }

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})