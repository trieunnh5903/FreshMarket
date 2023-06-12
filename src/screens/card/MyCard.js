import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ButtonIcon, ButtonText, CardItem, Header } from '../../components';
import { COLORS, SIZES, FONTS, data } from '../../constants';

const MyCard = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [myCard, setMyCard] = useState(data.myCard)

  const [isSelected, setIsSelected] = useState({ ...data.myCard[0], key: 'MyCard' });
  // var addCard = data.allCards.filter(function (elementA) {
  //   return !myCard.some(function (elementB) {
  //     return elementA.id === elementB.id;
  //   });
  // });
  return (
    <View
      style={[styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }]}>
      {/* start header */}
      <Header
        containerStyle={{
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}
        title={"MY CARDS"}
        // icon left
        leftComponent={
          <ButtonIcon
            onPress={() => console.log('back')}
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
      <ScrollView>
        {/* my cards */}
        {
          myCard.map((item, index) => {
            return (
              <CardItem
                containerStyle={{
                  marginHorizontal: SIZES.padding,
                  marginTop: SIZES.radius
                }}
                key={`MyCard-${item.id}`}
                item={item}
                isSelected={`${isSelected.key}-${isSelected.id}` == `MyCard-${item.id}`}
                onPress={() => setIsSelected({ ...item, key: "MyCard" })}
              />
            )
          })
        }
        {/* add card */}
        <Text
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            color: COLORS.black,
            ...FONTS.h3,
          }}>Add new card</Text>
        {
          data.allCards.map((item, index) => {
            return (
              <CardItem
                containerStyle={{
                  marginHorizontal: SIZES.padding,
                  marginTop: SIZES.radius
                }}
                key={`AddCard-${item.id}`}
                item={item}
                isSelected={`${isSelected.key}-${isSelected.id}` == `AddCard-${item.id}`}
                onPress={() => setIsSelected({ ...item, key: 'AddCard' })}
              />
            )
          })
        }
      </ScrollView>
      <ButtonText
        onPress={() => {
          navigation.navigate("CheckOut", { isSelected })
        }}
        labelStyle={{
          color: COLORS.white
        }}
        label={isSelected?.key == "AddCard" ? 'Add card' : 'Place your order'}
        containerStyle={{
          margin: SIZES.padding,
          height: 60,
          borderRadius: SIZES.radius,
          width: SIZES.width - 2 * SIZES.padding,
          backgroundColor: COLORS.primary
        }}
      />
    </View>
  )
}

export default MyCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
})