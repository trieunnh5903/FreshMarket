import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthLayout from './AuthLayout'
import { SIZES } from '../../constants'

const Otp = () => {
  return (
    <AuthLayout
      title={"OTP Authencation"}
      subtitle={"An authencation code has been sent to trieu@gmail.com"}
      titleContainerStyle={{
        marginTop: SIZES.padding
      }}
    >

    </AuthLayout>
  )
}

export default Otp

const styles = StyleSheet.create({})