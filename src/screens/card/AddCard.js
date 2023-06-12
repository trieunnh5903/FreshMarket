import {
  StyleSheet, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback,
  Image,
  ImageBackground, Keyboard
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { ButtonIcon, Header } from '../../components'
import { COLORS, FONTS, SIZES, icons } from '../../constants'

const AddCard = ({ navigation, route }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    let { isSelected } = route.params;
    setSelectedCard(isSelected);
  }, [])

  function renderCard() {
    return (
      <ImageBackground
        source={icons.card}
        style={{
          width: '100%',
          height: 200,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          overflow: 'hidden'
        }}
      >
        {/* logo */}
        {
          selectedCard?.icon &&
          <Image
            source={selectedCard?.icon}
            resizeMode='contain'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 80,
              width: 80,
              marginLeft: SIZES.padding,
            }} />
        }
        {/* detail */}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius
        }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3
            }}
          >Hai Trieu</Text>
          <View style={{ flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body3
              }}
            >1234 1234 1234 1234</Text>
            <Text
              style={{ 
                color: COLORS.white,
                ...FONTS.body3
              }}
            >12/25</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
  return (
    <View>
      {/* header */}
      <Header
        containerStyle={{
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}
        title={"ADD NEW CARD"}
        // icon left
        leftComponent={
          <ButtonIcon
            onPress={() => navigation.goBack()}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            icon={icons.arrow_back}
            containerStyle={{
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
        }
      />
      {/* body */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback
          touchSoundDisabled={true}
          onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            {renderCard()}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* footer */}
    </View>
  )
}

export default AddCard

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
  },
})