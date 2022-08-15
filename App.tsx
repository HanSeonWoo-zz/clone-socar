import { NavigationContainer } from '@react-navigation/native';
import { Provider as MobxProvider } from 'mobx-react';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainNavigator from './src/navigations/MainNavigator';
import { store } from './src/store/mainStore';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MobxProvider st={store}>
          <MainNavigator />
        </MobxProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
