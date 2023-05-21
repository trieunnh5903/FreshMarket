import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES, data, icons } from '../../constants'
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { ButtonIcon, ButtonText, ButtonTextIcon, TwoPointSlider } from '../../components';
const Section = ({ containerStyle, title, children }) => {
    return (
        <View style={[containerStyle, { marginTop: SIZES.padding }]}>
            <Text style={[FONTS.h3, { color: COLORS.blackText }]}>{title}</Text>
            {children}
        </View>
    )
}
const FilterProduct = ({ isVisible, onClose }) => {
    const [showModal, setShowModal] = useState(isVisible);
    const [deliveryTime, setDeliveryTime] = useState('');
    const [ratings, setRatings] = useState('');
    const [tags, setTags] = useState('');
    const progress = useSharedValue(0);
    const closeModal = () => {
        onClose();
    }
    React.useEffect(() => {
        if (showModal) {
            progress.value = withTiming(1, { duration: 500 });
        } else {
            progress.value = withTiming(0, { duration: 500 }, () => {
                runOnJS(closeModal)();
            });
        }
    })

    const reanimatedStyle = useAnimatedStyle(() => {
        const bottom = interpolate(progress.value, [0, 1], [-SIZES.height, 0]);
        return {
            bottom
        }
    })
    const Distance = () => {
        return (
            <Section
                title={"Distance"}>
                <TwoPointSlider
                    values={[3, 10]}
                    min={1}
                    max={20}
                    postfix={'km'}
                    onValuesChangeFinish={(value) => console.log('onValuesChangeFinish: ' + value)} />
            </Section>
        )
    }

    const DeliveryTime = () => {
        return (
            <Section
                title={"Delivery Time"}
                containerStyle={{ marginTop: SIZES.spacing * 4 }}>
                <View
                    style={styles.rowContainer}>
                    {
                        data.delivery_time.map((item) => {
                            return (
                                <ButtonText
                                    key={item.id.toString()}
                                    label={item.label}
                                    labelStyle={{
                                        color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                                        ...FONTS.body3
                                    }}
                                    containerStyle={{
                                        width: '30%',
                                        height: 50,
                                        margin: 5,
                                        borderRadius: SIZES.base,
                                        backgroundColor: item.id == deliveryTime ? COLORS.primary : COLORS.lightGray2
                                    }}
                                    onPress={() => setDeliveryTime(item.id)} />
                            )
                        })
                    }
                </View>
            </Section>
        )
    }

    const PricingRange = () => {
        return (
            <Section title={"Pricing Range"}>
                <TwoPointSlider
                    values={[10, 50]}
                    min={0}
                    max={100}
                    prefix={"$"}
                    onValuesChangeFinish={(value) => console.log('onValuesChangeFinish: ' + value)} />
            </Section>
        )
    }

    const Ratings = () => {
        return (
            <Section
                containerStyle={{
                    marginTop: SIZES.spacing * 4
                }}
                title={"Rating"}>
                <View style={styles.rowContainer}>
                    {
                        data.ratings.map(item => {
                            return (
                                <ButtonTextIcon
                                    containerStyle={{
                                        height: 50,
                                        flex: 1,
                                        borderRadius: SIZES.base,
                                        backgroundColor: item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                                        margin: 5
                                    }}
                                    label={item.label}
                                    labelStyle={{
                                        color: item.id == ratings ? COLORS.white : COLORS.gray,
                                        marginRight: SIZES.base,
                                        ...FONTS.h3
                                    }}
                                    iconRight={icons.star}
                                    iconStyle={{
                                        width: 24,
                                        height: 24,
                                        tintColor: item.id == ratings ? COLORS.white : COLORS.gray,
                                    }}
                                    onPress={() => setRatings(item.id)}
                                    key={item.id.toString()}>
                                </ButtonTextIcon>
                            )
                        })
                    }
                </View>
            </Section>
        )
    }

    const Tags = () => {
        return (
            <Section
                containerStyle={{ marginTop: SIZES.spacing * 4 }}
                title={"Tags"}>
                <View
                    style={styles.rowContainer}>
                    {
                        data.tags.map((item) => {
                            return (
                                <ButtonText
                                    key={item.id.toString()}
                                    label={item.label}
                                    labelStyle={{
                                        color: item.id == tags ? COLORS.white : COLORS.gray,
                                        ...FONTS.body3
                                    }}
                                    containerStyle={{
                                        height: 50,
                                        margin: 5,
                                        borderRadius: SIZES.base,
                                        paddingHorizontal: SIZES.padding,
                                        backgroundColor: item.id == tags ? COLORS.primary : COLORS.lightGray2
                                    }}
                                    onPress={() => setTags(item.id)} />
                            )
                        })
                    }
                </View>
            </Section>
        )
    }
    return (
        <Modal
            animationType='fade'
            transparent
            visible={isVisible}
        >
            <View style={{ flex: 1 }} >
                <TouchableWithoutFeedback
                    onPress={() => setShowModal(false)}>
                    <Animated.View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}></Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.filter, reanimatedStyle]}>
                    <View style={styles.line} />
                    {/* header */}

                        <View style={styles.header}>
                            <Text style={styles.title}>Filter Your Search</Text>
                            <ButtonIcon
                                containerStyle={styles.iconClose}
                                icon={icons.close}
                                iconStyle={styles.icon}
                                onPress={() => setShowModal(false)} />
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: SIZES.padding}}
                        >
                            {/* distance */}
                            <Distance />
                            {/* delivery time */}
                            <DeliveryTime />
                            {/* PricingRange */}
                            <PricingRange />
                            {/* Rating */}
                            <Ratings />
                            {/* tags */}
                            <Tags />
                        </ScrollView>
                       
                        <ButtonText
                            label={"Apply Filter"}
                            labelStyle={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}
                            containerStyle={{
                                height: 50,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.primary,
                                margin: SIZES.padding
                            }}
                            onPress={() => console.log("Apply Filter")}
                        />
                </Animated.View>
            </View>

        </Modal>
    )
}

export default FilterProduct

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: SIZES.radius
    },

    iconClose: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray2
    }
    ,
    icon: {
        width: 24,
        height: 24,
        tintColor: COLORS.gray2
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding
    },
    title: {
        color: COLORS.blackText,
        ...FONTS.h3
    },
    filter: {
        width: '100%',
        height: SIZES.height * 0.8,
        backgroundColor: COLORS.white2,
        borderTopLeftRadius: SIZES.padding,
        borderTopRightRadius: SIZES.padding,
        position: 'absolute',
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: COLORS.gray,
        marginVertical: SIZES.spacing,
        borderRadius: 2,
        alignSelf: 'center'
    }
})