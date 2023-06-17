import * as React from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { MainNavigator } from './src/navigation';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}