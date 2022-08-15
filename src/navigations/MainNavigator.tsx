import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors, normalize } from '../components/styles';
import { WText } from '../components/WText';
import HistoryListScreen from '../screens/HistoryListScreen';
import ReservationScreen from '../screens/ReservationScreen';
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
      <MainStack.Screen
        name="Reservation"
        component={ReservationScreen}
        options={({ route, navigation }) => ({
          presentation: 'transparentModal',
          cardStyle: { backgroundColor: '#333' },
          headerStyle: { backgroundColor: '#333' },
          headerShadowVisible: false,
          title: '내 예약',
          headerTitleStyle: { color: '#fff' },
          headerLeft: () => (
            <TouchableOpacity>
              <WText style={{ color: '#fff', marginLeft: 20 }}>고객센터</WText>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <EvilIcons style={{ marginRight: 20 }} name="close" size={30} color={'#fff'} />
            </TouchableOpacity>
          ),
        })}
      />
      <MainStack.Screen
        name="HistoryList"
        component={HistoryListScreen}
        options={({ route, navigation }) => ({
          presentation: 'transparentModal',
          title: '이용내역',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <EvilIcons style={{ marginLeft: 20 }} name="close" size={30} />
            </TouchableOpacity>
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
