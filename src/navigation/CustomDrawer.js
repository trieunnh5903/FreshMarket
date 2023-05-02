import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator, useDrawerProgress } from '@react-navigation/drawer'
import Home from '../screens/home/Home';
import Cart from '../screens/cart/Cart';
import { COLORS } from '../constants/colors';
import { screens } from '../constants/screens';
import icons from '../constants/icons';
import { FONTS } from '../constants/fonts';
import data from '../constants/data';
import { SIZES } from '../constants/sizes';

const CustomDrawerItem = ({ label, icon }) => {
    return (
        <TouchableOpacity style={styles.drawerItem}>
            <Image style={styles.drawerItemIcon} source={icon} />
            <Text style={styles.drawerItemLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView
            scrollEnabled
            contentContainerStyle={styles.contentContainerStyle}>
            <View style={{ flex: 1, padding: SIZES.spacing }}>
                {/* button close */}
                {/* <TouchableOpacity
                    onPress={() => props.navigation.closeDrawer()}
                    style={styles.btnCloseContainer}>
                    <Image style={styles.btnClose} source={icons.close} />
                </TouchableOpacity> */}
                {/* profile */}
                <View style={styles.profileContainer}>
                    <Image style={styles.profileIcon} source={{ uri: data.myProfile.profile_image }}></Image>
                    <View style={styles.profileContent}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{data.myProfile.name}</Text>
                        <Text style={{ ...FONTS.body4, color: COLORS.white }}>View your profile</Text>
                    </View>
                </View>
                {/* drawer Item */}
                <View style={styles.drawerItemContainer}>
                    <CustomDrawerItem label={screens.home} icon={icons.home} />
                    <CustomDrawerItem label={screens.my_wallet} icon={icons.wallet} />
                    <CustomDrawerItem label={screens.favourite} icon={icons.favourite} />
                    <CustomDrawerItem label={screens.notification} icon={icons.notification} />
                    <View style={styles.lineDivider}></View>
                    <CustomDrawerItem label={'Track Your Order'} icon={icons.location} />
                    <CustomDrawerItem label={'Invite a Friend'} icon={icons.add_persion} />
                    <CustomDrawerItem label={'Help Center'} icon={icons.help_center} />
                    <CustomDrawerItem label={'Setting'} icon={icons.setting} />
                    <View style={{ flex: 1 }} />
                    <CustomDrawerItem label={'Logout'} icon={icons.logout} />
                </View>
                {/* line divider */}

            </View>
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator();
const CustomDrawer = () => {
    return (

        <View style={styles.container}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerType: 'slide',
                    drawerStyle: styles.drawerStyle,
                    sceneContainerStyle: { backgroundColor: COLORS.transparent }
                }}
                drawerContent={props => {
                    return (
                        <CustomDrawerContent {...props} />
                    )
                }}
                initialRouteName={screens.home}>
                <Drawer.Screen component={Home} name={screens.home}>

                </Drawer.Screen>
                {/* <Drawer.Screen component={Home} name={screens.home} /> */}
            </Drawer.Navigator>
        </View>


    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    profileContainer: {
        margin: SIZES.spacing,
        // backgroundColor: 'yellow'

    },

    profileIcon: {
        width: '65%',
        aspectRatio: 1,
        borderRadius: SIZES.radius / 2,
        margin: SIZES.spacing,

    },

    profileContent: {
        justifyContent: 'center',
        marginLeft: SIZES.spacing
    },

    lineDivider: {
        height: 1,
        backgroundColor: COLORS.lightGray1,
        margin: SIZES.spacing
    },

    drawerItem: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingLeft: SIZES.spacing,
        borderRadius: SIZES.radius,
        // backgroundColor: 'yellow',
    },

    drawerItemContainer: {
        padding: SIZES.spacing,
        flex: 1,
        // backgroundColor: 'yellow'
    },

    drawerItemIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.white,
    },

    drawerItemLabel: {
        marginLeft: SIZES.spacing,
        color: COLORS.white,
        ...FONTS.h3
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
        backgroundColor: COLORS.transparent,
    },
    contentContainerStyle: {
        flex: 1,
    },
    btnCloseContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: SIZES.spacing
    }
})