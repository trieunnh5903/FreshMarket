import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/sizes'
import { COLORS } from '../constants/colors'
import { FONTS } from '../constants/fonts'
import icons from '../constants/icons'

const HorizontalFoodCard = ({ containerStyle, item, imageStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]}>
            {/* image */}
            <Image source={{ uri: item.image }} style={imageStyle} />
            {/* info */}
            <View style={{ flex: 1 }}>
                <Text style={[FONTS.h3, { color: COLORS.blackText }]}>{item.name}</Text>
                <Text style={[FONTS.body4, { color: COLORS.darkGray2 }]}>{item.description}</Text>
                <Text style={[{ color: COLORS.blackText, marginTop: SIZES.base }, FONTS.h2]}>${item.price}</Text>
            </View>
            {/* calories */}
            <View style={styles.icon}>
                <Image style={{ width: 24, height: 24 }} source={icons.calories} />
                <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>{item.calories} Calories</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HorizontalFoodCard

const styles = StyleSheet.create({
    icon: {
        flexDirection: 'row',
        position: 'absolute', top: SIZES.radius, right: SIZES.radius
    },

    container: {
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        alignItems: 'center'
    }
})