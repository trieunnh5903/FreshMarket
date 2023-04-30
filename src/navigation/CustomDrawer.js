import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator, useDrawerProgress } from '@react-navigation/drawer'
import Home from '../screens/home/Home';
import Cart from '../screens/cart/Cart';
import { COLORS } from '../constants/colors';
import { useProgressContext } from '../../App';
import { screens } from '../constants/screens';
import icons from '../constants/icons';
import { color } from 'react-native-reanimated';
const CustomDrawerContent = (props) => {
    let progressValue = useDrawerProgress().value;
    let { setProgress } = useProgressContext();

    setTimeout(() => {
        setProgress(progressValue);
    }, 0)
    return (
        <DrawerContentScrollView
            scrollEnabled
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={{ flex: 1 }}>
                {/* button close */}
                <TouchableOpacity
                    onPress={() => props.navigation.closeDrawer()}
                    style={styles.btnCloseContainer}>
                    <Image style={styles.btnClose} source={icons.close} />
                </TouchableOpacity>
                {/* profile */}
                <View style={styles.profileContainer}>
                    <Image style={styles.profileIcon} source={icons.close}></Image>
                    <View style={styles.profileContent}>
                        <Text>By Coder</Text>
                        <Text>View your profile</Text>
                    </View>
                </View>
                {/* drawer Item */}
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator();
const CustomDrawer = () => {
    return (
        <>
            <StatusBar barStyle={'default'} animated translucent backgroundColor={COLORS.transparent} />
            <View style={styles.container}>
                <Drawer.Navigator initialRouteName={screens.home}
                    screenOptions={{
                        overlayColor: COLORS.transparent,
                        headerShown: false,
                        drawerType: 'slide',
                        drawerStyle: styles.drawerStyle,

                    }}
                    drawerContent={props => {
                        return (
                            <CustomDrawerContent {...props} />
                        )
                    }}>
                    <Drawer.Screen component={Home} name={screens.home} />
                    <Drawer.Screen component={Cart} name={screens.cart} />
                </Drawer.Navigator>
            </View>
        </>

    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row'
    },

    profileIcon: {
        width: 50,
        height: 50,
    },

    profileContent: {
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    btnClose: {
        width: 30,
        height: 30,
        tintColor: COLORS.white,
    },
    drawerStyle: {
        flex: 1,
        width: '65%',
        paddingRight: 20,
        backgroundColor: COLORS.transparent
    },
    contentContainerStyle: {
        flex: 1, marginHorizontal: 10
    },
    btnCloseContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    }
})