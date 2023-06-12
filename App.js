import * as React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Button, StatusBar, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from './src/navigation/CustomDrawer';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { AddCard, Cart, CheckOut, ForgotPassword, OnBoarding, Otp, SignIn, SignUp } from './src/screens';
import FoodDetail from './src/screens/food/FoodDetail';
import MyCard from './src/screens/card/MyCard';


const Stack = createStackNavigator()

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Provider store={store}>
      < NavigationContainer>
        <Stack.Navigator
          initialRouteName='MyCard'
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name='CheckOut'
            component={CheckOut} />
          <Stack.Screen
            name='FoodDetail'
            component={FoodDetail} />
          <Stack.Screen
            name='MyCard'
            component={MyCard} />
          <Stack.Screen
            name='AddCard'
            component={AddCard} />
          <Stack.Screen
            name='Cart'
            component={Cart} />
          <Stack.Screen
            name='OnBoarding'
            component={OnBoarding} />
          <Stack.Screen
            name='SignIn'
            component={SignIn} />
          <Stack.Screen
            name='SignUp'
            component={SignUp} />
          <Stack.Screen
            name='Otp'
            component={Otp} />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPassword} />
          <Stack.Screen
            name='CustomDrawer'
            component={CustomDrawer} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}