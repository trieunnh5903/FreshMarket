import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ButtonIcon, CardItem, Header } from '../../components';
import { COLORS, SIZES, FONTS } from '../../constants';

const CheckOut = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [myCard, setMyCard] = useState(data.myCard)

  const [isSelected, setIsSelected] = useState({ ...data.myCard[0], key: 'MyCard' });
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
        title={"CHECK OUT"}
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
      </ScrollView>
    </View>
  )
}

export default CheckOut

const styles = StyleSheet.create({})