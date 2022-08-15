import { NavigationContainer } from '@react-navigation/native';
import { Provider as MobxProvider } from 'mobx-react';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainNavigator from './src/navigations/MainNavigator';
import { MainStore } from './src/store/mainStore';
const st = new MainStore();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MobxProvider st={st}>
          <MainNavigator />
        </MobxProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;
