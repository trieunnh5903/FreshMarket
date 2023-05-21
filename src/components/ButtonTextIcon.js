import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '../constants'

const ButtonTextIcon = ({ label, labelStyle, iconRight, iconLeft, iconStyle, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', ...containerStyle }}>
            {
                iconLeft != null && <Image style={iconStyle} source={iconLeft} />
            }
            <Text style={labelStyle}>{label}</Text>
            {
                iconRight != null && <Image style={iconStyle} source={iconRight} />
            }
        </TouchableOpacity>
    )
}

export default ButtonTextIcon

const styles = StyleSheet.create({})