import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawer from './src/navigation/CustomDrawer';

const Stack = createStackNavigator()
const Progress = React.createContext();
export const useProgressContext = () => {
  return React.useContext(Progress)
}
export default function App() {
  const [progress, setProgress] = React.useState(useSharedValue(0))
  return (
    <Progress.Provider value={{ progress, setProgress }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name='CustomDrawer'
            component={CustomDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Progress.Provider>
  );
}