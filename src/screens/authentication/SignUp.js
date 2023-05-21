import { Image, StyleSheet, Text, TouchableOpacity, View, Switch, ScrollView} from 'react-native'
import React, { useState } from 'react'
import AuthLayout from './AuthLayout'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { ButtonText, ButtonTextIcon, InputForm } from '../../components'
import validate from '../../utils/validate'
export default function SignUp({ navigation }) {
  const [emai, setEmai] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [saveMe, setSaveMe] = useState(true);

  const isEnableSignUp = () => {
    return emai != '' && password != '' && passwordError == '' && emailError == '';
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AuthLayout
        title={"Getting Started"}
        subtitle={"Create an account to continue!"}>
        <View style={styles.contentWrapper}>
          {/* form */}
          {/* email */}
          <InputForm
            label={"Email"}
            rightComponent={
              <View>
                {
                  emai != '' && (
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
              setEmai(value);
            }}
            autoCompleteType='email'
            errorMsg={emailError}
          />
          {/* user name */}
          <InputForm
            label={"Username"}
            containerStyle={{
              marginTop: SIZES.radius
            }}
            rightComponent={
              <View>
                {
                  username != '' && (
                    <Image style={[styles.iconCheck, {
                      tintColor: usernameError == '' ? COLORS.green : COLORS.red
                    }]}
                      source={
                        usernameError == '' ? icons.check_circle : icons.cancel_circle
                      } />
                  )
                }
              </View>
            }
            onChangeText={(value) => {
              setUsername(value)
            }}
            errorMsg={usernameError}
          />
          {/* password */}
          <InputForm
            containerStyle={{
              marginTop: SIZES.radius
            }}
            label={"Password"}
            secureTextEntry={!showPassword}
            rightComponent={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image style={[styles.iconCheck, { tintColor: COLORS.gray }]} source={showPassword ? icons.eye_off : icons.eye} />
              </TouchableOpacity>
            }
            onChangeText={(value) => {
              validate.validatePassword(value, setPasswordError)
              setPassword(value)
            }}
            errorMsg={passwordError}
          />
          {/* save me & forgot password */}
          <View style={styles.saveMeWrapper}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Switch
                value={saveMe}
                trackColor={{ false: '#767577', true: COLORS.lightOrange2 }}
                thumbColor={saveMe ? COLORS.primary : COLORS.white}
                onValueChange={value => setSaveMe(value)} />
              <Text style={{
                color: COLORS.gray,
                ...FONTS.body4
              }}>Save Me</Text>
            </View>
            <TouchableOpacity>
              <Text style={[styles.forgotPass, FONTS.body4]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          {/* sign in */}
          <ButtonText
            disabled={isEnableSignUp() ? false : true}
            containerStyle={{
              height: 55,
              marginTop: SIZES.padding,
              backgroundColor: isEnableSignUp() ? COLORS.primary : COLORS.lightOrange2,
              borderRadius: SIZES.radius,
            }}
            label={"Sign Up"}
            labelStyle={{
              color: COLORS.white
            }}
          />
          {/* sign up */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: SIZES.radius }}>
            <Text style={styles.signUp}>Already have an account? </Text>
            <ButtonText
              onPress={() => navigation.goBack()}
              labelStyle={{
                color: COLORS.primary
              }}
              label={"Sign In"} />
          </View>
          {/* social button */}
          {/* button google */}
          <View style={{ flex: 1 }} />
          <View>
            <ButtonTextIcon
              iconLeft={icons.facebook}
              iconStyle={{
                width: 24,
                height: 24,
                tintColor: COLORS.white
              }}
              containerStyle={{
                backgroundColor: COLORS.blue,
                height: 55,
                borderRadius: SIZES.radius
              }}
              label={'Continue With Facebook'}
              labelStyle={{
                ...FONTS.body3,
                color: COLORS.white,
                marginLeft: 6
              }} />
            {/* button facebook */}
            <ButtonTextIcon
              iconLeft={icons.google}
              iconStyle={{
                width: 24,
                height: 24,
              }}
              containerStyle={{
                backgroundColor: COLORS.lightGray2,
                height: 55,
                borderRadius: SIZES.radius,
                marginVertical: SIZES.radius
              }}
              label={'Continue With Google'}
              labelStyle={{
                ...FONTS.body3,
                color: COLORS.blackText,
                marginLeft: 6
              }} />
          </View>
        </View>
      </AuthLayout>
    </ScrollView>


  )
}

const styles = StyleSheet.create({
  signUp: {
    textAlign: 'center',
    color: COLORS.darkGray,
    ...FONTS.body3,

  },

  saveMeWrapper: {
    marginTop: SIZES.radius,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  forgotPass: {
    color: COLORS.gray
  },

  iconCheck: {
    width: 20,
    height: 20,
  },

  contentWrapper: {
    flex: 1,
    marginTop: SIZES.padding * 2
  }
})