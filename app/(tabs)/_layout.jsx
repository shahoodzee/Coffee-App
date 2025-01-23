import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ color, focused, icon, name }) => {
  return (
    <View>
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          width: 20,
          height: 20,
          alignSelf: 'center'
        }}
      />
      <Text className={`${focused ? 'p-semibold' : 'pregular'}`} style={{ color:color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false, 
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 5,
            borderTopColor: '#232533',
            height: 60
          }
        }}
      >
        <Tabs.Screen 
          name="home"
          options={{  
            title: 'Home', 
            headerShown: false,
            tabBarIcon: ({ color , focused }) => (
              <TabIcon
                icon={icons.home}
                focused = {focused}
                color = {color}
                name = "home"
              />
            ) 
          }}/>

        <Tabs.Screen 
          name="bookmark"
          options={{  
            title: 'Bookmark', 
            headerShown: false,
            tabBarIcon: ({ color , focused }) => (
              <TabIcon
                icon={icons.bookmark}
                focused = {focused}
                color = {color}
                name = "bookmark"
              />
            ) 
          }}/>

        <Tabs.Screen 
          name="create"
          options={{  
            title: 'Create', 
            headerShown: false,
            tabBarIcon: ({ color , focused }) => (
              <TabIcon
                icon={icons.plus}
                focused = {focused}
                color = {color}
                name = "create"
              />
            ) 
          }}/>

        <Tabs.Screen 
          name="profile"
          options={{  
            title: 'Profile', 
            headerShown: false,
            tabBarIcon: ({ color , focused }) => (
              <TabIcon
                icon={icons.profile}
                focused = {focused}
                color = {color}
                name = "profile"
              />
            ) 
          }}/>

      </Tabs>
    </>
  );
};

export default TabsLayout