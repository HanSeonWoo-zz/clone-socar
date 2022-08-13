import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SCREEN_WIDTH, normalize, Colors } from '../components/styles';
import { WText } from '../components/WText';
import MainNavigator from './MainNavigator';

const Drawer = createDrawerNavigator();
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
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <View style={{ flexDirection: 'row' }}>
          <WText m style={{ fontSize: 24 }}>
            한선우
          </WText>
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