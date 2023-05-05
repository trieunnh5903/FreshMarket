import { Image, Text, StyleSheet, StatusBar, View, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLORS } from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTab } from '../redux/slice/tabSlice';
import { screens, bottom_tabs } from '../constants/screens';
import { SIZES } from '../constants/sizes';
import { Header } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import icons from '../constants/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import data from '../constants/data';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../constants/fonts';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Home from './home/Home';
import Search from './search/Search';
import Cart from './cart/Cart';
import Favourite from './favourite/Favourite';
import Notification from './notification/Notification';
import { FlashList } from '@shopify/flash-list';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';


const TabButton = ({ icon, label, isFocused, onPress, colorReanimatedStyle, flexReanimatedStyle }) => {
    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={onPress}>
            <Animated.View style={[styles.tabButton, flexReanimatedStyle]}>
                <Animated.View style={[styles.tabButtonContent, colorReanimatedStyle]}>
                    <Image style={[styles.iconBottomTab, { tintColor: isFocused ? COLORS.white : COLORS.black }]} source={icon} />
                    {
                        isFocused ? (<Text numberOfLines={1} style={styles.tabButtonLabel}>{label}</Text>) : null
                    }
                </Animated.View>
            </Animated.View>

        </TouchableWithoutFeedback>
    )
}

const MainLayout = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const selectedTab = useSelector((state) => state.tab.selectedTab);
    const flatListRef = useRef();
    // reanimated bottom tab
    const homeTabColor = useSharedValue(COLORS.white);
    const homeTabFlex = useSharedValue(1);

    const searchTabColor = useSharedValue(COLORS.white);
    const searchTabFlex = useSharedValue(1);

    const cartTabColor = useSharedValue(COLORS.white);
    const cartTabFlex = useSharedValue(1);

    const favouriteTabColor = useSharedValue(COLORS.white);
    const favouriteTabFlex = useSharedValue(1);

    const notificationTabColor = useSharedValue(COLORS.white);
    const notificationTabFlex = useSharedValue(1);

    const homeFlexReanimated = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value,
        }
    })

    const homeColorReanimated = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value
        }
    })

    const searchFlexReanimated = useAnimatedStyle(() => {
        return {
            flex: searchTabFlex.value,
        }
    })

    const searchColorReanimated = useAnimatedStyle(() => {
        return {
            backgroundColor: searchTabColor.value
        }
    })

    const cartFlexReanimated = useAnimatedStyle(() => {
        return {
            flex: cartTabFlex.value,
        }
    })

    const cartColorReanimated = useAnimatedStyle(() => {
        return {
            backgroundColor: cartTabColor.value
        }
    })

    const favouriteFlexReanimated = useAnimatedStyle(() => {
        return {
            flex: favouriteTabFlex.value,
        }
    })

    const favouriteColorReanimated = useAnimatedStyle(() => {
        return {
            backgroundColor: favouriteTabColor.value
        }
    })

    const notificationFlexReanimated = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value,
        }
    })


    const notificationColorReanimated = useAnimatedStyle(() => {
        return {
            backgroundColor: notificationTabColor.value
        }
    })

    useEffect(() => {
        dispatch(setSelectedTab({ selectedTab: screens.home }))
    }, [])

    useEffect(() => {
        if (selectedTab == screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                animated: false
            })
            homeTabFlex.value = withTiming(4, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            homeTabFlex.value = withTiming(1, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == screens.search) {
            searchTabFlex.value = withTiming(4, { duration: 500 })
            searchTabColor.value = withTiming(COLORS.primary, { duration: 500 })
            flatListRef?.current?.scrollToIndex({
                index: 1,
                animated: false
            })
        } else {
            searchTabFlex.value = withTiming(1, { duration: 500 })
            searchTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == screens.cart) {
            cartTabFlex.value = withTiming(4, { duration: 500 })
            cartTabColor.value = withTiming(COLORS.primary, { duration: 500 })
            flatListRef?.current?.scrollToIndex({
                index: 2,
                animated: false
            })
        } else {
            cartTabFlex.value = withTiming(1, { duration: 500 })
            cartTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == screens.favourite) {
            flatListRef?.current?.scrollToIndex({
                index: 3,
                animated: false
            })
            favouriteTabFlex.value = withTiming(4, { duration: 500 })
            favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            favouriteTabFlex.value = withTiming(1, { duration: 500 })
            favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }

        if (selectedTab == screens.notification) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                animated: false
            })
            notificationTabFlex.value = withTiming(4, { duration: 500 })
            notificationTabColor.value = withTiming(COLORS.primary, { duration: 500 })
        } else {
            notificationTabFlex.value = withTiming(1, { duration: 500 })
            notificationTabColor.value = withTiming(COLORS.white, { duration: 500 })
        }
    }, [selectedTab])
    return (
        <View style={[styles.container,
        {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }]}>
            <FocusAwareStatusBar barStyle={"dark-content"} animated translucent backgroundColor={COLORS.transparent} />
            <Header
                containerStyle={styles.containerStyle}
                title={selectedTab}
                rightComponent={
                    <View>
                        <Image style={styles.profile} source={{ uri: data.myProfile.profile_image }}></Image>
                    </View>
                }
                leftComponent={
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={styles.leftComponent}>
                        <Image source={icons.menu} style={styles.iconMenu} />
                    </TouchableOpacity>
                }
            />
            {/* content */}
            <View>
                <FlashList
                    estimatedItemSize={SIZES.width}
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    pagingEnabled
                    data={bottom_tabs}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.flatListItemContainer}>
                                {item.label == screens.home && <Home />}
                                {item.label == screens.search && <Search />}
                                {item.label == screens.cart && <Cart />}
                                {item.label == screens.favourite && <Favourite />}
                                {item.label == screens.notification && <Notification />}
                            </View>
                        )
                    }}
                />
            </View>


            {/* Footer */}
            <View style={styles.footerContainer}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={[
                        COLORS.transparent, COLORS.lightGray1
                    ]}
                    style={styles.footerGradient} />
                <View
                    style={styles.tabButtonContainer}>
                    <TabButton
                        onPress={() => {
                            dispatch(setSelectedTab({ selectedTab: screens.home }));
                            // navigation.navigate(screens.home)
                        }}
                        isFocused={selectedTab == screens.home}
                        label={screens.home}
                        flexReanimatedStyle={homeFlexReanimated}
                        colorReanimatedStyle={homeColorReanimated}
                        icon={icons.home} />

                    <TabButton
                        onPress={() => {
                            dispatch(setSelectedTab({ selectedTab: screens.search }));
                            // navigation.navigate(screens.search)
                        }}
                        isFocused={selectedTab == screens.search}
                        label={screens.search}
                        flexReanimatedStyle={searchFlexReanimated}
                        colorReanimatedStyle={searchColorReanimated}
                        icon={icons.search} />

                    <TabButton
                        onPress={() => {
                            dispatch(setSelectedTab({ selectedTab: screens.cart }));
                            // navigation.navigate(screens.cart)
                        }}
                        isFocused={selectedTab == screens.cart}
                        label={screens.cart}
                        flexReanimatedStyle={cartFlexReanimated}
                        colorReanimatedStyle={cartColorReanimated}
                        icon={icons.cart} />

                    <TabButton
                        onPress={() => {
                            dispatch(setSelectedTab({ selectedTab: screens.favourite }));
                            // navigation.navigate(screens.favourite)
                        }}
                        isFocused={selectedTab == screens.favourite}
                        label={screens.favourite}
                        flexReanimatedStyle={favouriteFlexReanimated}
                        colorReanimatedStyle={favouriteColorReanimated}
                        icon={icons.favourite} />

                    <TabButton
                        onPress={() => {
                            dispatch(setSelectedTab({ selectedTab: screens.notification }));
                            // navigation.navigate(screens.notification)
                        }}
                        isFocused={selectedTab == screens.notification}
                        label={screens.notification}
                        flexReanimatedStyle={notificationFlexReanimated}
                        colorReanimatedStyle={notificationColorReanimated}
                        icon={icons.notification} />
                </View>
            </View>
        </View>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    flatListItemContainer: {
        width: SIZES.width,
        // height: SIZES.height
        height: SIZES.height - 150 - StatusBar.currentHeight,
    },

    tabButtonContent: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },

    tabButtonLabel: {
        marginLeft: SIZES.base,
        color: COLORS.white2,
        ...FONTS.h3
    },

    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    tabButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.radius,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        backgroundColor: COLORS.white,
        zIndex: 2
    },

    footerContainer: {
        height: 100,
    },

    footerGradient: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 100,
        position: 'absolute',
        left: 0,
        right: 0,
        top: -40,
    },

    containerStyle: {
        height: 50,
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.radius,
        alignItems: 'center',
    },

    profile: {
        width: 40,
        height: 40,
        borderRadius: SIZES.radius
    },

    iconBottomTab: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.white2,
    },

    leftComponent: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray2
    },

    iconMenu: {
        width: 24,
        height: 24,
        tintColor: COLORS.gray2,
    }
})