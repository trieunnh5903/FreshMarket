import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors';

const Home = (props) => {
  return (
    <View
      style={[{
        flex: 1,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: COLORS.white2,
      }]}>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})