import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Marker } from 'react-native-nmap';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { reverseGeo_ } from '../api/naverApi';
import { Img } from '../assets/images';
import { Colors, normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/styles';
import { formatNumber, getDefaultEnd, getDefaultStart, SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';

const SOCARZONE_DATA = [
  {
    id: 1,
    title: '홍익대학교 예문관 주차장',
    placeType: '지상',
    subTitle: '상수역 2번출구',
    imageUri: 'https://source.unsplash.com/random/1',
    coordinate: { latitude: 37.54798700000001, longitude: 126.9248078 },
  },
  {
    id: 2,
    title: '로하스타워',
    placeType: '지하',
    subTitle: '상수역 2번출구',
    imageUri: 'https://source.unsplash.com/random/2',
    coordinate: { latitude: 37.54852829999998, longitude: 126.92341520000002 },
  },
  {
    id: 3,
    title: '동거동락 쉐어하우스 32호점',
    placeType: '지상',
    subTitle: '동거동락 쉐어하우스 32호점',
    imageUri: 'https://source.unsplash.com/random/3',
    coordinate: { latitude: 37.548181899999996, longitude: 126.9240286 },
  },
  {
    id: 4,
    title: '상수크리원 기계식주차장',
    placeType: '기계식',
    subTitle: '역세권 청년주택 상수역',
    imageUri: 'https://source.unsplash.com/random/4',
    coordinate: { latitude: 37.545397499999986, longitude: 126.92533750000003 },
  },
];
const CAR_DATA = [
  {
    id: 1,
    name: '쏘나타DN8 센슈어스',
    oil: '휘발유',
    imageUri:
      'https://w.namu.la/s/8ebc09787916315ddc213b7db4ab3ada866f9bfda49a2e669d804ae03278ac063b8eaea4cc5aa05eee5dd123c277121946b362d7f30803a55ac7ed32fe22fa028cbbb22f58f26511bdd9f6a049e604b2e4b2860a88dc5e573859cf4541185f8b89cf506b450858bf9e34eac829ccaffb',
    minPrice: 321,
    oilPrice1: 210,
    oilPrice2: 230,
    oilPrice3: 240,
    insureancePrice1: 2500,
    insureancePrice2: 3750,
    insureancePrice3: 4500,
  },
  {
    id: 2,
    name: 'QM6',
    oil: '휘발유',
    imageUri:
      'https://w.namu.la/s/e773f0ac71cc5dc7ad8de6b9a8f5d182f939553b29177aeec7e18065f3a51a4cd919d47f910ad43cbf1266b0e47bb39882bbb8d60a1d9c5e152c7642949c0c9db0615b950572a1debfede47b04438379823984b0c1e5aadbce789d0a2f6c9058841a03a56c017e8981573bb7e714345b',
    minPrice: 432,
    oilPrice1: 220,
    oilPrice2: 240,
    oilPrice3: 260,
    insureancePrice1: 3210,
    insureancePrice2: 3900,
    insureancePrice3: 4790,
  },
  {
    id: 3,
    name: '더뉴레이',
    oil: '휘발유',
    imageUri:
      'https://w.namu.la/s/6dfb6517ce56d950d2ef666cc7f319be0da47910a77a4f9961da65cde122af947e8afb6f531547025264839ec9f9d6793cbb0ffda83f3b4e563d3c471c8201a7acc961964bc1cdec42d4a3419c8819aaed6277b4d83f513b4d2764e0fa534484c8ffd9911e6f716c2098c3ca51fec6bb',
    minPrice: 123,
    oilPrice1: 180,
    oilPrice2: 200,
    oilPrice3: 220,
    insureancePrice1: 2800,
    insureancePrice2: 3000,
    insureancePrice3: 3450,
  },
];
const SOCAR_DATA = [
  { id: 1, carId: 1, zoneId: 1 },
  { id: 2, carId: 2, zoneId: 1 },
  { id: 3, carId: 3, zoneId: 1 },
  { id: 4, carId: 1, zoneId: 2 },
  { id: 5, carId: 2, zoneId: 2 },
  { id: 6, carId: 1, zoneId: 3 },
  { id: 7, carId: 2, zoneId: 3 },
  { id: 8, carId: 3, zoneId: 3 },
];
const RESERVATION_DATA = [{ id: 1, socarId: 1, time: '' }];

const DEFAULT_PLACE = { latitude: 37.54585579999996, longitude: 126.92158830000007 };
const SocarZoneScree = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [dateStart, setDateStart] = useState(getDefaultStart());
  const [dateEnd, setDateEnd] = useState(getDefaultEnd());
  const [center, setCenter] = useState(DEFAULT_PLACE);
  const [addKor, setAddKor] = useState('');
  const [currentZone, setCurrentZone] = useState(null);

  useEffect(() => {
    if (route.params?.center) {
      setCenter(route.params?.center);
    } else {
      setCenter(DEFAULT_PLACE);
    }
  }, [route.params?.center]);

  useEffect(() => {
    if (route.params?.dateStart) {
      setDateStart(new Date(route.params?.dateStart));
    } else {
      getDefaultStart();
    }
  }, [route.params?.dateStart]);
  useEffect(() => {
    if (route.params?.dateEnd) {
      setDateEnd(new Date(route.params?.dateEnd));
    } else {
      getDefaultEnd();
    }
  }, [route.params?.dateEnd]);

  const onTimeSet = () => {
    navigation.navigate('TimeSetModal', { dateStart: dateStart.toString(), dateEnd: dateEnd.toString() });
  };
  const onSearch = () => {
    navigation.navigate('Search');
  };

  const getPermission = async () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 15 ~ .then ~ result', result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
    const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 47 ~ getPermission ~ res', res);
    if (res === 'granted') {
      checkLocation();
    }
  };
  const checkLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        if ((position.coords.latitude > 0, position.coords.longitude > 0)) {
          setCenter({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        } else {
          console.log('getCurrentPosition > Simulator에서는 위치 정보가 명확하지 않다.');
        }

        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  useEffect(() => {
    getPermission();
  }, []);

  const renderZone = (item, index) => {
    return (
      <Marker
        key={String(item.id)}
        onClick={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setCurrentZone(item);
        }}
        caption={{ text: '대여', color: '#fff', offset: -40, haloColor: '#000' }}
        coordinate={item.coordinate}
      />
    );
  };

  const renderSocar = ({ item, index }) => {
    const carInfo = CAR_DATA.find((i) => i.id === item.carId);
    console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 187 ~ renderSocar ~ carInfo', carInfo);
    console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 175 ~ renderSocar ~ item', item);
    console.log('>>>>', moment(dateEnd).diff(dateStart, 'minutes'));
    const useTime = moment(dateEnd).diff(dateStart, 'minutes');
    const wholeLength = moment(moment(dateEnd).add(1, 'day')).diff(moment(dateStart).subtract(1, 'day'), 'minutes');
    console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 220 ~ renderSocar ~ wholeLength', wholeLength);
    const reservationLength = moment(dateEnd).diff(dateStart, 'minutes');
    const middleTime = moment(dateStart)
      .add(reservationLength / 2, 'minutes')
      .format('M/D');
    console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 222 ~ renderSocar ~ reservationLength', reservationLength);
    return (
      <TouchableOpacity style={{ paddingVertical: 20, borderBottomWidth: 1, borderColor: '#eee' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ width: normalize(70), height: normalize(50) }} source={{ uri: carInfo.imageUri }} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <WText style={{ fontSize: 15 }}>{carInfo.name}</WText>
            <WText style={{ color: '#999', fontSize: 12 }}>
              {carInfo?.oilPrice1} ~ {carInfo?.oilPrice3} /km
            </WText>
            <WText m style={{ textAlign: 'right', fontSize: 18 }}>
              <Text style={{ color: Colors.Main, fontSize: 15 }}>50% </Text> {formatNumber(useTime * carInfo?.minPrice)}원
            </WText>
            <WText style={{ textAlign: 'right', fontSize: 12, color: '#333' }}>
              쿠폰 할인 <Text style={{ textDecorationLine: 'line-through' }}>{formatNumber(useTime * carInfo?.minPrice * 2)}원</Text>
            </WText>
          </View>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#eee', marginTop: 12, flexDirection: 'row' }}>
          <View style={{ flex: 1440 }} />
          <View style={{ flex: reservationLength, backgroundColor: Colors.Main, height: 6 }}></View>
          <View style={{ flex: 1440 }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
          <WText style={{ fontSize: 12, color: '#666' }}>{moment(dateStart).subtract(1, 'day').format('M/D')}</WText>
          <WText style={{ fontSize: 12, color: '#666' }}>{middleTime}</WText>
          <WText style={{ fontSize: 12, color: '#666' }}>{moment(dateEnd).add(1, 'day').format('M/D')}</WText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <NaverMapView
        scaleBar={false}
        zoomControl={false}
        showsMyLocationButton={false}
        useTextureView
        onMapClick={() => {
          console.log('On Map Click');
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setCurrentZone(null);
        }}
        onTouch={() => {
          console.log('On Touch Map');
        }}
        onCameraChange={(e) => {
          setCenter({ latitude: e.latitude, longitude: e.longitude });
          try {
            reverseGeo_({ coords: e.longitude + ',' + e.latitude }).then((res) => {
              if (res?.results) {
                const dong = res?.results[0].region.area3.name;
                const land = res?.results[0].land.number1 + (res?.results[0].land.number2 ? '-' + res?.results[0].land.number2 : '');
                setAddKor(dong + ' ' + land);
              }
            });
          } catch (error) {
            console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 103 ~ SocarZoneScree ~ error', error);
          }
        }}
        rotateGesturesEnabled={false}
        style={{ width: SCREEN_WIDTH, flex: 1 }}
        center={{ ...center, zoom: 16 }}>
        <Marker pinColor={Colors.Main} height={25} width={20} caption={{ text: '', color: '#fff', offset: -70, haloColor: Colors.Dim06 }} coordinate={center} />
        {SOCARZONE_DATA.map(renderZone)}
      </NaverMapView>
      <TouchableOpacity onPress={onSearch} style={[styles.container, { padding: 16, top: normalize(15), alignItems: 'center' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons size={16} name={'record-circle'} color={Colors.Main} />
          <WText style={{ fontSize: 16, marginLeft: 8 }}>{addKor}</WText>
        </View>
      </TouchableOpacity>

      {!currentZone ? (
        <TouchableOpacity onPress={onTimeSet} style={[styles.container, { padding: 20, bottom: insets.bottom + normalize(20), flexDirection: 'row' }]}>
          <AntDesign size={20} name={'clockcircleo'} color={Colors.Main} />
          <View style={{ marginLeft: 12 }}>
            <WText m style={{ fontSize: 16 }}>
              이용시간 설정하기
            </WText>
            <WText style={{ color: '#999', marginTop: 8 }}>
              {moment(dateStart).format(SOCAR_DATE_FORMAT)} ~ {moment(dateEnd).format(SOCAR_DATE_FORMAT)}
            </WText>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ height: SCREEN_HEIGHT / 2, borderTopLeftRadius: 8, borderTopRightRadius: 8, width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
          {/* 컴포넌트화 */}
          <View style={{ width: 40, height: 3, borderRadius: 8, backgroundColor: '#eee', marginTop: 8, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
            <View style={{ flex: 1 }}>
              <WText m style={{ fontSize: 16 }}>
                {currentZone.title}
              </WText>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <View style={{ backgroundColor: '#eee', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 }}>
                  <WText style={{ fontSize: 12, color: '#999' }}>{currentZone.placeType}</WText>
                </View>
                <WText style={{ marginLeft: 8, color: '#666' }}>{currentZone.subTitle}</WText>
              </View>
            </View>
            <Image style={{ width: normalize(70), height: normalize(50) }} source={{ uri: currentZone.imageUri }} />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={SOCAR_DATA.filter((i) => i.zoneId === currentZone.id)}
            renderItem={renderSocar}
            contentContainerStyle={{ paddingBottom: insets.bottom }}
          />
        </View>
      )}
    </View>
  );
};
export default SocarZoneScree;
const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderColor: '#FAFAFA',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 10,
    right: 0,
    width: SCREEN_WIDTH - 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.Dim04,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
