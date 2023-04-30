import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProgressContext } from '../../../App'

const Home = () => {
  const { progress } = useProgressContext();
  console.log(progress);
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})