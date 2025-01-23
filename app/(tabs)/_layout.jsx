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
        style = {{ tintColor: color }}
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs>
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
          }} />
      </Tabs>
    </>
  );
};

export default TabsLayout