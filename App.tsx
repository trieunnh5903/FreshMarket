import * as React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from './src/navigation/CustomDrawer';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ForgotPassword, OnBoarding, Otp, SignIn, SignUp } from './src/screens';
import FoodDetail from './src/screens/food/FoodDetail';

const Stack = createStackNavigator()

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Provider store={store}>
      < NavigationContainer>
        <Stack.Navigator
          initialRouteName='CustomDrawer'
          screenOptions={{
            headerShown: false
          }}>
             {/* <Stack.Screen
            name='FoodDetail'
            component={FoodDetail} />
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
            component={ForgotPassword} /> */}
          <Stack.Screen
            name='CustomDrawer'
            component={CustomDrawer} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}