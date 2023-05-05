import * as React from 'react';
import { Button, StatusBar, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from './src/navigation/CustomDrawer';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      < NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name='CustomDrawer'
            component={CustomDrawer} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}