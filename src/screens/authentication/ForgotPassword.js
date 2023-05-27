import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthLayout from './AuthLayout'
import { COLORS, SIZES, icons } from '../../constants'
import { ButtonText, InputForm } from '../../components'
import validate from '../../utils/validate'

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const isEnableSignIn = () => {
    return email != '' && emailError == '';
  }
  const onSendEmailPress = () => {
    navigation.goBack();
  }
  return (
    <AuthLayout
      title={"Password Recovery"}
      titleContainerStyle={{
        marginTop: SIZES.padding
      }}
      subtitle={"Please enter your email address to recover your password"}>
      {/* form input */}
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding
        }}>
        <InputForm
          label={"Email"}
          rightComponent={
            <View>
              {
                email != '' && (
                  <Image style={[styles.iconCheck, {
                    tintColor: emailError == '' ? COLORS.green : COLORS.red
                  }]} source={
                    emailError == '' ? icons.check_circle : icons.cancel_circle
                  } />
                )
              }
            </View>
          }
          onChangeText={(value) => {
            validate.validateEmail(value, setEmailError)
            setEmail(value);
          }}
          autoCompleteType='email'
          errorMsg={emailError}
        />
        {/* button send email */}
        <View style={{ flex: 1 }}></View>
        <ButtonText
          disabled={isEnableSignIn() ? false : true}
          containerStyle={{
            height: 55,
            marginVertical: SIZES.padding,
            backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.lightOrange2,
            borderRadius: SIZES.radius,
          }}
          onPress={onSendEmailPress}
          label={"Send Email"}
          labelStyle={{
            color: COLORS.white
          }}
        />
      </View>
    </AuthLayout>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  iconCheck: {
    width: 20,
    height: 20,
  },

})