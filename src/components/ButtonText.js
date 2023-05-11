import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonText = ({ label, labelStyle, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, containerStyle]}>
            <Text style={[labelStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonText

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})