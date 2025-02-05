# Coffee App Documentation
#### Welcome to Official Documentation of Zainabs Coffee Shop 👋
### Table of Contents
- [Introduction](#introduction)
- [Expo](#expo)
    - [Create Expo App](#create-expo-app)

## Introduction
React is not limited to web applications; it can also be used to develop mobile apps for both iOS and Android environments. With React Native, we can build highly optimized and performance-oriented applications featuring interactive UIs with native components. The development process in React Native is significantly simpler compared to most other frameworks.

## Expo
In 2025, we discovered the `Expo framework`, which simplifies the process of building React Native apps. Since we're using the same React technology as we did for web apps, there's no need to learn a new language. Additionally, we can leverage our existing Node backend for authentication purposes. The Expo official documentation provides extensive guidance for building your first React Native app. We will also be using some concepts of next.js.

### Create Expo App
To get started, we can create an Expo app using the following command:
```
npx create-react-native-app coffee-shop
```
Almost all the necessary commands are available in the [Expo Documentation](https://docs.expo.dev/). Once the setup has been completed you can run the command to launch the app.
```
npx expo start
```
Expo Documentation advises to use Tailwind but we will create custom styles using style property of React Native Components. We will also be using JSX syntax.
So when the launch the App runs you are able to see your project running on 3 things. Andriod, iOS and Web browser which is very convinient. 


As we have established the structure of the App. We can see that in our source directory there are auth and tabs folders enclosed in sqaure brackrts. Its a property from NExt.js which allows them to bahave like a route group. So all the pages in auth directory will belong to auth group.

### Screens
Initially we have started making our screens. We have successfully implemented 
- Welcome Screen
- Login Screen
- SignUp Screen.


Also added the API structure from our MERN project. Will try to adjust the auth mechanims from our previous project into this mobile app.
