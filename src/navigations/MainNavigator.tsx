import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Img } from '../assets/images';
import { Colors, normalize } from '../components/styles';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SocarZoneScreen from '../screens/SocarZoneScreen';
import TimeSetModalScreen from '../screens/TimeSetModalScreen';
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
      }}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ route, navigation }) => ({
          header: (props) => (
            <SafeAreaView edges={['top']}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  height: normalize(45),
                }}>
                <Image resizeMode="contain" style={{ width: 70, height: 18 }} source={Img.socar} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode="contain" style={{ width: 70, height: 18 }} source={Img.coupon} />
                  <AntDesign style={{ marginRight: 20 }} name="bells" size={20} />
                  <Feather
                    onPress={() => {
                      console.log(route);
                      console.log(navigation);
                      navigation.openDrawer();
                    }}
                    name="menu"
                    size={20}
                  />
                </View>
              </View>
            </SafeAreaView>
          ),
        })}
      />
      <MainStack.Screen
        name="SocarZone"
        component={SocarZoneScreen}
        options={({ route, navigation }) => ({
          title: '쏘카',
          headerRight: (props) => (
            <Feather
              onPress={() => {
                console.log(route);
                console.log(navigation);
                navigation.openDrawer();
              }}
              style={{ marginRight: 20 }}
              name="menu"
              size={20}
            />
          ),
        })}
      />
      <MainStack.Screen name="TimeSetModal" component={TimeSetModalScreen} options={{ presentation: 'modal', headerShown: false }} />
      <MainStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
