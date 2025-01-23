import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View style={styles.Container}>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
     alignItems: 'center',
      justifyContent: 'center',
       backgroundColor: 'black'
  }
})

export default index