import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Img } from '../assets/images';
import { SCREEN_WIDTH, normalize, Colors } from '../components/styles';
import { WText } from '../components/WText';
import HomeScreen from '../screens/HomeScreen';
import SocarZoneScreen from '../screens/SocarZoneScreen';

const Drawer = createDrawerNavigator();
const DrawerStack = createStackNavigator();
const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.2)',
        drawerStyle: { width: SCREEN_WIDTH - normalize(70) },
        headerShown: false,
      }}
      drawerContent={CustomDrawerContent}
      initialRouteName="Home">
      <Drawer.Screen name="DrawerStack" component={DrawerStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const DrawerStackNavigator = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerLeftLabelVisible: false,
        headerBackImage: () => <MaterialIcons name="arrow-back" size={normalize(24)} style={{ marginLeft: 20 }} />,
        cardStyle: { backgroundColor: Colors.White },
        headerStyle: { shadowColor: 'transparent' },
        headerTitleAlign: 'center',
      }}>
      <DrawerStack.Screen
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
      <DrawerStack.Screen
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
    </DrawerStack.Navigator>
  );
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <WText m style={{ fontSize: 24 }}>
            한선우
          </WText>
          <Image style={{ width: normalize(20), height: normalize(20), marginLeft: 8 }} source={Img.pathport} />
          <View style={{ flex: 1 }} />
          <Feather name="settings" size={20} />
          <Feather style={{ marginLeft: 20 }} name="bell" size={20} />
        </View>
        <WText style={{ marginTop: 8, color: '#666' }}>gkstjsdn10@naver.com</WText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <WText style={{ color: '#aaa' }}>크레딧</WText>
          <WText m style={{ color: Colors.Main, fontSize: 16, marginLeft: 6 }}>
            3,637
          </WText>
        </View>
      </View>
      <Image style={{ width: '100%', height: normalize(65), marginTop: 30 }} source={{ uri: 'https://source.unsplash.com/random' }} />
      <View style={{ height: 1, width: '100%', backgroundColor: '#eee' }} />
      <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 16, paddingTop: 16 }}>
        <WText style={{ color: '#333', fontSize: 15 }}>이용내역</WText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <WText style={{ color: '#333', fontSize: 16 }}>패스포트</WText>
        <WText style={{ color: Colors.Main, fontSize: 14, marginLeft: 8 }}>이용중</WText>
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        <WText style={{ color: '#333', fontSize: 16 }}>쿠폰</WText>
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        <WText style={{ color: '#333', fontSize: 16 }}>이벤트/혜택</WText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <WText style={{ color: '#333', fontSize: 16 }}>쏘카클럽</WText>
        <WText style={{ color: '#999', fontSize: 14, marginLeft: 8 }}>Level 5</WText>
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 16 }}>
        <WText style={{ color: '#333', fontSize: 16 }}>친구 초대하기</WText>
      </TouchableOpacity>
      <View style={{ height: 1, width: '100%', backgroundColor: '#eee' }} />
      <DrawerItem label="고객센터" onPress={() => Linking.openURL('https://mywebsite.com/help')} />
      <DrawerItem label="공지사항" onPress={() => Linking.openURL('https://mywebsite.com/help')} />
    </DrawerContentScrollView>
  );
}
