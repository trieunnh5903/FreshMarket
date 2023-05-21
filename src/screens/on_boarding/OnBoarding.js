import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { COLORS, FONTS, SIZES, data, images } from '../../constants'
import Animated, { Extrapolate, event, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { ButtonText } from '../../components'
import { useNavigation } from '@react-navigation/native'

const OnBoarding = () => {
    const navigation = useNavigation();
    const scrollX = useRef(useSharedValue(0)).current
    const flastListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const onViewChangeRef = React.useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    })

    const Header = () => {
        return (
            <View style={styles.headerLogo}>
                <Image
                    style={styles.logo}
                    source={images.logo_02}
                    resizeMode='contain' />
            </View>
        )
    }

    const Dots = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {
                    data.onboarding_screens.map((item, index) => {
                        const reanimatedStyle = useAnimatedStyle(() => {
                            const inputRange = [(index - 1) * SIZES.width, index * SIZES.width, (index + 1) * SIZES.width];
                            const backgroundColor = interpolateColor(scrollX.value,
                                inputRange,
                                [COLORS.lightOrange, COLORS.primary, COLORS.lightOrange]);
                            const width = interpolate(scrollX.value,
                                inputRange,
                                [10, 30, 10],
                                Extrapolate.CLAMP)
                            return {
                                backgroundColor,
                                width
                            }
                        })
                        return (
                            <Animated.View
                                key={`${item.id}`}
                                style={[{
                                    borderRadius: 10,
                                    marginHorizontal: SIZES.base,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: COLORS.primary
                                }, reanimatedStyle]}>

                            </Animated.View>
                        )
                    })
                }
            </View>
        )
    }
    const Footer = () => {
        const onPress = useCallback(
            () => {
                flastListRef?.current.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true
                })
            }, [currentIndex])
        return (
            <View style={{
                height: 160,
            }}>
                {/* dots */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <Dots />
                </View>
                {/* button */}
                {currentIndex < data.onboarding_screens.length - 1 &&
                    <View
                        style={{
                            width: SIZES.width,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding
                        }}>
                        <ButtonText
                            onPress={() => navigation.navigate("SignIn")}
                            label={"Skip"}
                            labelStyle={[FONTS.h3, { color: COLORS.gray }]} />
                        <ButtonText
                            label={"Next"}
                            labelStyle={[FONTS.h3, { color: COLORS.white }]}
                            containerStyle={{
                                backgroundColor: COLORS.primary,
                                height: 60,
                                width: SIZES.width * 0.5,
                                borderRadius: SIZES.radius
                            }}
                            onPress={onPress} />
                    </View>
                }

                {currentIndex == data.onboarding_screens.length - 1 &&
                    <View style={{
                        paddingHorizontal: SIZES.padding,
                        marginVertical: SIZES.padding,
                    }}>
                        <ButtonText
                            label={"Let's Get Started"}
                            labelStyle={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            containerStyle={{
                                height: 60,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                                width: SIZES.width - 2 * SIZES.padding
                            }}
                            onPress={() => navigation.navigate("SignIn")} />
                    </View>
                }

            </View>
        )
    }
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x
    })
    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                top: -SIZES.width / 2,
                width: 1.5 * SIZES.width,
                aspectRatio: 1,
                borderRadius: SIZES.width,
                backgroundColor: COLORS.lightOrange2
            }} />
            <Header />
            <Animated.FlatList
                ref={flastListRef}
                onViewableItemsChanged={onViewChangeRef.current}
                pagingEnabled
                horizontal
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                data={data.onboarding_screens}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flex: 1, width: SIZES.width }}>
                            <View style={{ flex: 3 }}>
                                <View style={[styles.backgroundImage]} >
                                    <Image
                                        resizeMode='contain'
                                        style={styles.image}
                                        source={item.bannerImage}></Image>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                // backgroundColor: 'orange',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: SIZES.radius,
                            }}>
                                <Text style={{
                                    color: COLORS.blackText,
                                    textAlign: 'center',
                                    ...FONTS.h2
                                }}>{item.title}</Text>
                                <Text style={{
                                    color: COLORS.gray,
                                    textAlign: 'center',
                                    paddingHorizontal: SIZES.padding,
                                    marginTop: SIZES.radius,
                                    ...FONTS.body3
                                }}>{item.description}</Text>
                            </View>
                        </View>
                    )
                }} />
            <Footer />
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    image: {
        width: SIZES.width * 0.8,
        height: SIZES.width * 0.8,
    },
    backgroundImage: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    logo: {
        width: SIZES.width * 0.5,
        height: 100
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.white2,
        alignItems: 'center'
    },

    headerLogo: {
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.height > 800 ? 50 : 25,
        left: 0,
        right: 0,
        // backgroundColor: 'red'
    },

    header: {

    }
})