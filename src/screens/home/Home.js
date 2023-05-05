import { Image, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import icons from '../../constants/icons'
import { COLORS } from '../../constants/colors'
import { SIZES } from '../../constants/sizes'
import data from '../../constants/data'
import { HorizontalFoodCard } from '../../components'
import { FONTS } from '../../constants/fonts'
import VerticalFoodCard from '../../components/VerticalFoodCard'

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View style={styles.section}>
        <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.blackText }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>Show All</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>

  )
}

const Home = () => {
  const [categoryId, setCategoryId] = useState(1);
  const [menuTypeId, setMenuTypeId] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [popular, setPopular] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false);
  const tabMenuList = useRef();
  useEffect(() => {
    handlerChangeCategory(categoryId, menuTypeId);
  }, [])

  const handlerChangeCategory = (categoryId, menuTypeId) => {
    let selectedPopular = data.menu.find(a => a.name == "Popular");
    let selectedRecommend = data.menu.find(a => a.name == 'Recommended');
    let menu = data.menu.filter(a => a.id == menuTypeId);
    setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))
    setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))
    setMenuList(menu[0]?.list.filter(a => a.categories.includes(categoryId)))
  }

  const onTabPress = useCallback((tabId) => {
    setMenuTypeId(tabId);
    handlerChangeCategory(categoryId, tabId);
  }, [])

  const SearchInput = () => {
    return (
      <View style={styles.searchContainer}>
        {/* icon */}
        <Image source={icons.search} style={styles.icon} />
        {/* text input */}
        <TextInput placeholder='search food' style={styles.searchInput} />
        {/* filter */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image source={icons.filter} style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }

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

  const RecommendedSection = () => {
    return (
      <Section
        title={"Recomended"}
        onPress={() => console.log("show all recommended")}
      >
        <FlatList
          data={recommends}
          keyExtractor={item => `${item.id}`}
          horizontal
          decelerationRate="fast"
          snapToInterval={SIZES.width * 0.85 + 18}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                imageStyle={{
                  marginTop: 35,
                  height: 150,
                  width: 150
                }}
                item={item}
                containerStyle={{
                  height: 180,
                  width: SIZES.width * 0.85,
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                  paddingRight: SIZES.radius,
                  alignItems: 'center'
                }} />
            )
          }} />
      </Section>
    )
  }

  const PopularSection = () => {
    return (
      <Section
        onPress={() => console.log("Popular section")}
        title={"Popular"}>
        <FlatList
          data={popular}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <VerticalFoodCard
                item={item}
                containerStyle={{
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: index == popular.length - 1 ? SIZES.padding : 0,
                  padding: SIZES.radius
                }}
                imageStyle={{
                  width: 150,
                  height: 150,
                  marginTop: 30
                }}
              />
            )
          }} />
      </Section>
    )
  }
  const onListCategoryPress = useCallback(
    (categoryId) => {
      setCategoryId(categoryId)
      handlerChangeCategory(categoryId, menuTypeId)
    }, [menuTypeId]
  )
  const ListCategory = () => {
    return (
      <FlatList
        data={data.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => onListCategoryPress(item.id)}
              style={[
                styles.categoriesItem,
                {
                  backgroundColor: item.id == categoryId ? COLORS.primary : COLORS.lightGray2,
                  marginLeft: index == 0 ? SIZES.padding : 18,
                  marginRight: index == data.categories.length - 1 ? SIZES.padding : 0
                }]}>
              <Image style={{ width: 32, height: 32, }} source={{ uri: item.icon }} />
              <Text
                style={{
                  color: item.id == categoryId ? COLORS.white : COLORS.darkGray,
                  marginLeft: SIZES.base,
                  ...FONTS.h3
                }}>{item.name}</Text>
            </TouchableOpacity>
          )
        }} />
    )
  }

  const DeliveryTo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding
        }}>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3
          }}>
          DELIVERY TO
        </Text>

        <TouchableOpacity
          style={styles.deliveryTo}>
          <Text
            style={{ ...FONTS.h3, color: COLORS.blackText }}
          >{data?.myProfile?.address}</Text>
          <Image source={icons.down_arrow} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* search */}
      <SearchInput />
      {/* filter modal */}
      {
        showFilterModal &&
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      }

      {/* list */}
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              {/* delivery to */}
              <DeliveryTo />
              {/* list category */}
              <ListCategory />
              {/* list popular */}
              <PopularSection />
              {/* list recommended */}
              <RecommendedSection />
              {/* menu type */}
              <HeaderMenuType />
            </View>
          )
        }}
        // ListFooterComponent={() => {
        //   return (<View style={{ height: 200 }} />)
        // }}
        data={menuList}
        scrollEnabled={true}
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
  deliveryTo: {
    flexDirection: 'row',
    marginTop: SIZES.base,
    alignItems: 'center'
  },

  categoriesItem: {
    alignItems: 'center',
    minHeight: 50,
    borderRadius: SIZES.radius,
    padding: 8,
    flexDirection: 'row',
    marginTop: SIZES.padding
  },

  section: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginTop: 30,
    marginBottom: 20
  },

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