import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTS } from '../constants/fonts'
import { COLORS } from '../constants/colors'

const Header = ({ title, containerStyle, leftComponent, rightComponent }) => {
    return (
        <View style={{ flexDirection: 'row', ...containerStyle }}>
            {/* left */}
            {leftComponent}
            {/* title */}
            <Text style={styles.title}>{title}</Text>
            {/* right */}
            {rightComponent}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    title: {
        textTransform: 'uppercase',
        ...FONTS.h3,
        flex: 1,
        textAlign: 'center',
        color: COLORS.blackText
    }
})