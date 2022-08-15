import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors, normalize } from '../components/styles';
import SearchScreen from '../screens/SearchScreen';
import TimeSetModalScreen from '../screens/TimeSetModalScreen';
import DrawerNavigator from './DrawerNavigator';
const MainStack = createStackNavigator();
const MainNavigator = (props) => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerLeftLabelVisible: false,
        headerBackImage: () => <MaterialIcons name="arrow-back" size={normalize(24)} style={{ marginLeft: 20 }} />,
        cardStyle: { backgroundColor: Colors.White },
        headerStyle: { shadowColor: 'transparent' },
        headerTitleAlign: 'center',
        gestureEnabled: false,
      }}>
      <MainStack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      <MainStack.Screen name="TimeSetModal" component={TimeSetModalScreen} options={{ presentation: 'modal', headerShown: false }} />
      <MainStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
