# mobile-flashcards
React Native Project

This project belongs to the React Nanodegree from Udacity, the goal is to implement react native application using the concepts learned on the course. The project consists in the following functionalities:

- Home with list of decks
- Add deck 
- Add question to deck
- Start quiz of deck
- Results of correct/incorrect answers of the quiz
- Notification to remind user to study 

## Devices
This project was tested on Android device using the Expo Go app.

## Installation 
- Clone this repo `git clone https://github.com/zoemonreal/mobile-flashcards.git` and `cd mobile-flashcards `
- Install all project dependencies with `yarn install`
- Start the development server with `expo start`

## Notes
The notifications implementation was made with `expo-notificacions`, based in the information of this article
https://blog.expo.io/expo-sdk-41-12cc5232f2ef

> The legacy Notifications library (imported from the expo package) has been deprecated since SDK 38, and is now fully removed in > SDK 41. If you’re still relying on this package, you should upgrade to expo-notifications, which has plenty of improvements and > additional features.

## Credits
- https://github.com/expo/fyi/blob/master/LegacyNotifications-to-ExpoNotifications.md 