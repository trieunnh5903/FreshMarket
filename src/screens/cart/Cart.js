import { StyleSheet, Text, Pressable, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import data from '../../data'
import { ButtonIcon, ButtonQuantityCart, Header, QuantityInput, TotalFooter } from '../../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SwipeListView } from 'react-native-swipe-list-view'

const Cart = () => {
  const insets = useSafeAreaInsets();
  const [myCartList, setMyCartList] = useState(data.myCart);

  const renderItem = data => (
    <Pressable
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        {/* image food */}
        <Image source={{ uri: data.item.image }} resizeMode='contain' style={{
          width: '20%',
          height: 70,

        }} />
        {/* information  */}
        <View style={{ marginLeft: SIZES.base, justifyContent: 'center', flex: 1 }}>
          <Text style={{
            color: COLORS.blackText,
            ...FONTS.h3
          }}>{data.item.name}</Text>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h3
            }}
          >${data.item.price}</Text>
        </View>
        {/* input quantity */}
        <QuantityInput
          labelStyle={{
            color: COLORS.blackText,
            marginHorizontal: 5,
            ...FONTS.h2
          }}
          iconStyle={{
            width: 24,
            height: 24,
            tintColor: COLORS.primary,
            marginHorizontal: SIZES.radius,
          }}
          containerStyle={{
            backgroundColor: COLORS.white,
            borderRadius: 3 * SIZES.radius,
            height: 50,
          }}
        />
      </View>
    </Pressable>
  );

  const closeRow = (rowMap, rowId) => {
    if (rowMap[rowId]) {
      rowMap[rowId].closeRow();
    }
  };
  const deleteRow = (rowMap, rowId) => {
    closeRow(rowMap, rowId);
    setTimeout(() => {
      const newData = [...myCartList];
      const prevIndex = myCartList.findIndex(item => item.id === rowId);
      newData.splice(prevIndex, 1);
      setMyCartList(newData);
    })
  };

  const renderHiddenItem = (data, rowMap) => (
    <View
      style={[styles.rowFront,
      {
        backgroundColor: COLORS.primary,
        alignItems: 'flex-end',
      }]}>
      <ButtonIcon
        icon={icons.delete}
        iconStyle={{
          width: 48,
          height: 48,
          tintColor: COLORS.white
        }}
        containerStyle={{
          width: 100 - SIZES.radius,
          height: 100,
        }}
        onPress={() => {
          deleteRow(rowMap, data.item.id)
        }}
      />
    </View>

  );

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
        title={"MY CART"}
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
        // icon right
        rightComponent={
          <ButtonQuantityCart
            disabled={true}
            quantity={3}
            onPress={() => console.log("cart")} />
        }
      />
      {/* end header */}
      {/* start list */}
      <SwipeListView
        data={myCartList}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          paddingBottom: SIZES.radius * 2,
        }}
        disableRightSwipe={true}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
      {/* end list */}
      {/* start total */}
      <TotalFooter/>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },

  rowFront: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    marginHorizontal: SIZES.radius,
    justifyContent: 'center',
    height: 100,
    marginTop: SIZES.radius,
    borderRadius: SIZES.radius,
    padding: SIZES.radius
  }
})