import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { COLORS, FONTS, SIZES } from '../constants'

const TwoPointSlider = ({ values, min, max, postfix, onValuesChangeFinish, prefix }) => {
    return (
        <MultiSlider
            markerOffsetY={18}
            containerStyle={{ alignSelf: 'center' }}
            allowOverlap={false}
            minMarkerOverlapDistance={50}
            trackStyle={{ height: 10, borderRadius: 10, backgroundColor: COLORS.gray2 }}
            selectedStyle={{ backgroundColor: COLORS.primary }}
            values={values}
            sliderLength={SIZES.width - 4 * SIZES.padding}
            customMarker={(e) => {
                return (
                    <View>
                        <View style={[styles.marker, styles.shadow]} />
                        <Text style={[FONTS.body4, { color: COLORS.darkGray, marginTop: 4 }]}>{prefix ? prefix : ''}{e.currentValue} {postfix ? postfix : ''}</Text>
                    </View>
                )
            }}
            min={min}
            max={max}
            step={1}
            onValuesChangeFinish={onValuesChangeFinish} />
    )
}

export default TwoPointSlider

const styles = StyleSheet.create({
    marker: {
        width: 24, height: 24, borderRadius: 12,
        borderWidth: 3,
        borderColor: COLORS.white,
        backgroundColor: COLORS.primary
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})