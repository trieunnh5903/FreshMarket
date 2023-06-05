import { StyleSheet, ScrollView, View, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonIcon, ButtonTextIcon, Header, ButtonQuantityCart, ButtonText } from '../../components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, data, icons } from '../../constants'
const FoodDetail = () => {
    const insets = useSafeAreaInsets();
    const [foodItem, setFoodItem] = useState(data.hamburger);
    const [quantity, setQuantity] = useState(1);
    const FoodCart = ({ item, onPress }) => {
        return (
            <View
                onPress={onPress}
                style={{
                    margin: SIZES.padding,
                    padding: SIZES.radius,
                }}>
                {/* image */}
                <Image
                    resizeMode='contain'
                    source={{ uri: item.image }}
                    style={{
                        width: 200, height: 200, alignSelf: 'center',
                    }} />
            </View>
        )
    };

    return (
        <View style={{
            backgroundColor: COLORS.white2,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* header */}
            <Header
                containerStyle={{
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center',
                }}
                title={"DETAILS"}
                leftComponent={
                    <ButtonIcon
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
                rightComponent={
                    <ButtonQuantityCart
                        quantity={3}
                        onPress={() => console.log("cart")} />
                }
            />
            <ScrollView contentContainerStyle={{ width: SIZES.width, flex: 1 }}>
                {/* image food*/}
                <FoodCart item={foodItem} />
                {/* quantity */}
                <View
                    style={{
                        marginBottom: -20,
                        zIndex: 1,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.primary,
                        borderRadius: 3 * SIZES.radius,
                        height: 50,
                        width: 120
                    }}>
                    <ButtonIcon
                        icon={icons.remove}
                        iconStyle={{
                            width: 24,
                            height: 24,
                            tintColor: COLORS.white
                        }}
                        onPress={() => {
                            console.log('remove');
                        }}
                    />
                    <Text
                        style={{
                            color: COLORS.white,
                            marginHorizontal: 20,
                            ...FONTS.h2
                        }}>{`${quantity}`}</Text>
                    <ButtonIcon
                        icon={icons.add}
                        iconStyle={{
                            width: 24,
                            height: 24,
                            tintColor: COLORS.white
                        }}
                        onPress={() => {
                            console.log('add');
                        }}
                    />
                </View>
                {/* information */}
                <View
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        elevation: 8,
                        padding: SIZES.padding
                    }}>
                    {/* name */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: SIZES.padding
                        }}>
                        <Text
                            style={{
                                color: COLORS.blackText,
                                ...FONTS.h2
                            }}>{foodItem.name}</Text>
                        <Text
                            style={{
                                color: COLORS.blackText,
                                ...FONTS.h2
                            }}>$ {foodItem.price}</Text>
                    </View>
                    {/* calories */}
                    <View
                        style={{
                            marginVertical: SIZES.radius,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                        <ButtonTextIcon
                            disabled={true}
                            iconLeft={icons.star}
                            label={"3"}
                            iconStyle={{
                                width: 24,
                                height: 24,
                                tintColor: COLORS.black
                            }}
                            labelStyle={{
                                color: COLORS.blackText,
                                marginLeft: 5,
                                ...FONTS.h3
                            }}
                        />
                        <Text
                            style={{
                                color: COLORS.blackText,
                                ...FONTS.h3
                            }}>{foodItem.calories} Calories</Text>
                        <ButtonTextIcon
                            disabled={true}
                            iconLeft={icons.clock}
                            label={"20-30 min"}
                            iconStyle={{
                                width: 24,
                                height: 24,
                                tintColor: COLORS.black
                            }}
                            labelStyle={{
                                color: COLORS.blackText,
                                marginLeft: 5,
                                ...FONTS.h3
                            }}
                        />
                    </View>
                    {/* description */}
                    <View>
                        <Text
                            style={{
                                marginTop: SIZES.padding,
                                color: COLORS.blackText,
                                ...FONTS.h3
                            }}>Description</Text>
                        <Text>{foodItem.description}</Text>
                    </View>
                </View>


                {/* footer */}
            </ScrollView>
            <ButtonTextIcon
                iconLeft={icons.cart}
                iconStyle={{
                    width: 24,
                    height: 24,
                    tintColor: COLORS.white
                }}
                label={"Add to Cart"}
                labelStyle={{
                    color: COLORS.white,
                    marginLeft: 5,
                    ...FONTS.h3
                }}
                containerStyle={{
                    height: 50,
                    backgroundColor: COLORS.primary,
                    position: 'absolute',
                    bottom: 50,
                    borderRadius: 20,
                    width: SIZES.width - 2 * SIZES.padding
                }}
            />
        </View>
    )
}

export default FoodDetail

const styles = StyleSheet.create({})