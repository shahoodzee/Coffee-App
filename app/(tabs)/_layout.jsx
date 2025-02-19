import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router';

//Components
import { Loader } from "../../components";

// Icons
import { icons } from '../../constants';

// Context
import { useGlobalContext } from "../../context/GlobalProvider";

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
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

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
          name="favorites"
          options={{  
            title: 'Favorites', 
            headerShown: false,
            tabBarIcon: ({ color , focused }) => (
              <TabIcon
                icon={icons.bookmark}
                focused = {focused}
                color = {color}
                name = "favorites"
              />
            ) 
          }}/>

        <Tabs.Screen 
          name="cart"
          options={{  
            title: 'Cart', 
            headerShown: false,
            tabBarIcon: ({ color , focused }) => (
              <TabIcon
                icon={icons.shoppingCart}
                focused = {focused}
                color = {color}
                name = "cart"
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