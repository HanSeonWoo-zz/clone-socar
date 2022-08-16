import { inject, observer } from 'mobx-react';
import React from 'react';
import { ScrollView, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Img } from '../assets/images';
import { normalize, globalStyles } from '../components/styles';
import { WText } from '../components/WText';
import { MainStore } from '../store/mainStore';
import { MainMiddleBanner, MainTopBanner, MyReservation } from './homeComponents';

function HomeScreen(props) {
  const insets = useSafeAreaInsets();
  const { st }: { st: MainStore } = props;
  const { route, navigation } = props;
  return (
    <>
      <ScrollView style={{ backgroundColor: '#F1F1F1' }} contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <MainTopBanner />
        <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate('SocarZone')} style={styles.goContainer}>
              <View style={{ padding: 16 }}>
                <WText style={{ fontSize: 20 }}>가지러 가기</WText>
                <WText style={{ fontSize: 14, color: '#666', marginTop: 12 }}>{'가까운 쏘카존\n찾기'}</WText>
              </View>
              <Image style={styles.goImage} source={Img.go} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <TouchableOpacity>
                <View style={styles.callContainer}>
                  <WText style={{ fontSize: 20 }}>여기로 부르기</WText>
                  <WText style={{ fontSize: 14, color: '#666', marginTop: 12, marginBottom: 24 }}>{'원하는 차\n받기'}</WText>
                </View>
                <Image style={{ width: normalize(80), height: normalize(70), position: 'absolute', bottom: 15, right: 0 }} source={Img.call_here} />
              </TouchableOpacity>
              <TouchableOpacity style={{ ...globalStyles.border, ...globalStyles.shadow, height: normalize(145) }}>
                <View style={{ padding: 16 }}>
                  <WText style={{ fontSize: 20 }}>한 달 이상</WText>
                  <WText style={{ fontSize: 14, color: '#666', marginTop: 12, marginBottom: 24 }}>{'더 오래\n타기'}</WText>
                </View>
                <Image style={{ width: normalize(80), height: normalize(70), position: 'absolute', bottom: 15, right: 0 }} source={Img.more_month} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
            <View style={[styles.container, { alignItems: 'center', width: normalize(105) }]}>
              <Image style={{ width: normalize(25), height: normalize(25) }} source={Img.pathport} />
              <WText style={{ marginTop: 12 }}>패스포트</WText>
              <View style={styles.tipContainer}>
                <WText b style={{ fontSize: 10, color: '#fff' }}>
                  무제한 50% 할인
                </WText>
              </View>
            </View>
            <View style={[styles.container, { alignItems: 'center', width: normalize(105) }]}>
              <Image style={{ width: normalize(25), height: normalize(25) }} source={Img.socar_card} />
              <WText style={{ marginTop: 12 }}>쏘카카드</WText>
              <View style={styles.tipContainer}>
                <WText b style={{ fontSize: 10, color: '#fff' }}>
                  최대 10만원 혜택
                </WText>
              </View>
            </View>
            <View style={[styles.container, { alignItems: 'center', width: normalize(105) }]}>
              <Image style={{ width: normalize(25), height: normalize(25) }} source={Img.socar_business} />
              <WText style={{ marginTop: 12 }}>쏘카비즈니스</WText>
            </View>
          </View>
          <View style={[styles.container, { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="help-circle-outline" size={24} />
              <WText style={{ marginTop: 8, fontSize: 12 }}>고객센터</WText>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('HistoryList')} style={{ alignItems: 'center' }}>
              <Ionicons name="receipt-outline" size={24} />
              <WText style={{ marginTop: 8, fontSize: 12 }}>이용 내역</WText>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <AntDesign name="creditcard" size={24} />
              <WText style={{ marginTop: 8, fontSize: 12 }}>결제면허</WText>
            </View>
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="alpha-c-circle-outline" size={24} />
              <WText style={{ marginTop: 8, fontSize: 12 }}>내 크레딧</WText>
            </View>
          </View>
          <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', padding: 16 }}>
            <Image style={{ width: normalize(30), height: normalize(30), marginLeft: 16 }} resizeMode="contain" source={Img.use_guide} />
            <View style={{ flex: 1, marginLeft: 20 }}>
              <WText b style={{ fontSize: 15 }}>
                이용 가이드
              </WText>
              <WText style={{ color: '#666', marginTop: 8 }}>쏘카에서 차를 처음 예약하시나요?</WText>
            </View>
            <AntDesign name="right" color="#bbb" size={20} />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
            <View style={[styles.container, { width: normalize(165) }]}>
              <WText m style={{ fontSize: 16 }}>
                쏘카페어링
              </WText>
              <WText style={{ marginTop: 4, fontSize: 13, color: '#666' }}>취향을 잇는 차</WText>
              <Image style={{ width: normalize(70), height: normalize(35), position: 'absolute', bottom: 5, right: 0 }} source={Img.socar_sharing} />
            </View>
            <View style={[styles.container, { width: normalize(165) }]}>
              <WText m style={{ fontSize: 16 }}>
                쏘카마이존
              </WText>
              <WText style={{ marginTop: 4, fontSize: 13, color: '#666' }}>쏘카존 만들기</WText>
              <Image style={{ width: normalize(55), height: normalize(45), position: 'absolute', bottom: 5, right: 0, resizeMode: 'contain' }} source={Img.socar_myzone} />
            </View>
          </View>
          <View style={{ marginTop: 12, borderRadius: 16 }}>
            <MainMiddleBanner />
          </View>

          <View style={{ marginTop: 30 }}>
            <WText m style={{ fontSize: 16 }}>
              쏘카 스토리
            </WText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story1} />
              <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story2} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story3} />
              <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story4} />
            </View>
          </View>
        </View>
      </ScrollView>
      <MyReservation />
    </>
  );
}

export default inject('st')(observer(HomeScreen));

const styles = StyleSheet.create({
  container: {
    ...globalStyles.border,
    ...globalStyles.shadow,
    padding: 16,
  },
  tipContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(22,125,251,1)',
    borderRadius: 12,
    padding: 3,
    paddingHorizontal: 5,
    width: normalize(80),
    transform: [{ translateY: -10 }],
  },
  goContainer: {
    flex: 1,
    ...globalStyles.border,
    ...globalStyles.shadow,
    height: normalize(300),
    marginRight: 10,
  },
  goImage: {
    width: '100%',
    height: normalize(180),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  callContainer: {
    ...globalStyles.border,
    ...globalStyles.shadow,
    height: normalize(145),
    padding: 16,
  },
});
