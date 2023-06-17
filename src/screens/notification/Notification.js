import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../constants'

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
      
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})