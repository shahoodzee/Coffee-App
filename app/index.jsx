import { StyleSheet, Text, View, Image, Redirect } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { images } from '../constants';
import { CustomButton } from '../components';

// Context
import { useGlobalContext } from "../context/GlobalProvider";

const index = () => {
  // const { loading, isLogged } = useGlobalContext();
  // if (!loading && isLogged) return <Redirect href="/home" />;
  
  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>

          <View style={styles.WecomeView}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={{ width: 130, height: 84 }}
            />
            <Image
              source={images.cards}
              style={{ maxWidth: 380, height: 280 }}
              resizeMode='contain'
            />

            <Text style={styles.welcomeText}>
              Explore the Perfect
              Blend of Flavors
              <Text style={styles.secondaryText}> Aora</Text>
            </Text>

            <Image
              source={images.path}
              resizeMode="contain"
              style={{ width: 120, height: 15, marginTop: -6 }}
            />

            <Text className=" font-pregular text-gray-100 mt-7 text-center" style={styles.WelcomeText}>
              "Coffee is the common man's gold, and like gold, it brings to every person the feeling of luxury and nobility."
            </Text>

            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push("/sign-in")}
            />

            <StatusBar backgroundColor='#161622' style='light'/>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: '#161622',
    height: '100%'
  },
  WecomeView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
    padding: 16
  },
  relativeContainer: {
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    color: '#FF9C01',
    fontSize: 30,
  },
  WelcomeButton: {
    width: '100%',
    marginTop: 10
  },
  WelcomeText:{
    color: '#CDCDE0',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 'text-sm',
    textAlign: 'center'
  }
})

export default index