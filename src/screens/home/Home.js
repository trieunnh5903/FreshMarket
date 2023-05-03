import { Image, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import icons from '../../constants/icons'
import { COLORS } from '../../constants/colors'
import { SIZES } from '../../constants/sizes'
import data from '../../constants/data'
import { HorizontalFoodCard } from '../../components'
import { FONTS } from '../../constants/fonts'

const SearchInput = () => {
  return (
    <View style={styles.searchContainer}>
      {/* icon */}
      <Image source={icons.search} style={styles.icon} />
      {/* text input */}
      <TextInput placeholder='search food' style={styles.searchInput} />
      {/* filter */}
      <TouchableOpacity>
        <Image source={icons.filter} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const Home = () => {
  const [categoryId, setCategoryId] = useState(1);
  const [menuTypeId, setMenuTypeId] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const tabMenuList = useRef();
  useEffect(() => {
    handlerChangeCategory(categoryId, menuTypeId);
  }, [])

  const handlerChangeCategory = (categoryId, menuTypeId) => {
    let menu = data.menu.filter(a => a.id == menuTypeId);
    setMenuList(menu[0]?.list)
  }

  const onTabPress = useCallback((tabId) => {
    setMenuTypeId(tabId);
    handlerChangeCategory(categoryId, tabId);
  }, [])

  const HeaderMenuType = () => {
    return (
      <FlatList
        ref={tabMenuList}
        horizontal
        data={data.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                marginLeft: SIZES.padding,
                marginRight: index == data.menu.length - 1 ? SIZES.padding : 0
              }}
              onPress={() => onTabPress(item.id)}>
              <Text
                style={[
                  { color: menuTypeId == item.id ? COLORS.primary : COLORS.blackText },
                  FONTS.h3
                ]}>{item.name}</Text>
            </TouchableOpacity>
          )
        }} />
    )
  }
  return (
    <View style={styles.container}>
      {/* search */}
      <SearchInput />
      {/* list */}
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <HeaderMenuType />
            </View>
          )
        }}
        data={menuList}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              imageStyle={styles.imageCard}
              onPress={() => console.log("HorizontalFoodCard")}
              item={item}
              containerStyle={styles.horizontalFoodCard} />
          )
        }}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  imageCard: {
    width: 110,
    height: 110,
    marginTop: 20
  },

  horizontalFoodCard: {
    height: 130,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },

  icon: {
    width: 24,
    height: 24
  },

  searchInput: {
    flex: 1
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white2
  },

  searchContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.base,
    marginHorizontal: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    alignItems: 'center'
  }
})