import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const ButtonTextIcon = ({ label, labelStyle, icon, iconStyle, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ justifyContent: 'center', alignItems: 'center',flexDirection: 'row', ...containerStyle }}>
            <Text style={labelStyle}>{label}</Text>
            <Image style={iconStyle} source={icon} />
        </TouchableOpacity>
    )
}

export default ButtonTextIcon

const styles = StyleSheet.create({})