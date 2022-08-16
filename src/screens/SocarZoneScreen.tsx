import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Marker } from 'react-native-nmap';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { reverseGeo_ } from '../api/naverApi';
import { DEFAULT_PLACE, CAR_DATA, SOCARZONE_DATA, SOCAR_DATA } from '../components/data';
import { Colors, globalStyles, normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../components/styles';
import { Socar } from '../components/types';
import { formatNumber, getDefaultEnd, getDefaultStart, SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';

const SocarZoneScree = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [dateStart, setDateStart] = useState(getDefaultStart());
  const [dateEnd, setDateEnd] = useState(getDefaultEnd());
  const [center, setCenter] = useState(DEFAULT_PLACE);
  const [addKor, setAddKor] = useState('');
  const [currentZone, setCurrentZone] = useState<Socar | null>(null);

  const onTimeSet = () => {
    navigation.navigate('TimeSetModal', { dateStart: dateStart.toString(), dateEnd: dateEnd.toString() });
  };
  const onSearch = () => {
    navigation.navigate('Search');
  };

  useEffect(() => {
    getPermission();
  }, []);

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

  const getPermission = async () => {
    // TODO : Android Permission
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
          console.log('getCurrentPosition > Simulator에서는 위치 정보가 명확하지 않습니다.', { latitude: position.coords.latitude, longitude: position.coords.longitude });
        }
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const renderZone = useCallback((item, index) => {
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
  }, []);

  const renderSocar = ({ item, index }) => {
    const carInfo = CAR_DATA.find((i) => i.id === item.carId);
    const useTime = moment(dateEnd).diff(dateStart, 'minutes');
    const DAY_IN_MINUTES = 1440;
    const reservationLength = moment(dateEnd).diff(dateStart, 'minutes');
    const middleTime = moment(dateStart)
      .add(reservationLength / 2, 'minutes')
      .format('M/D');
    const onSocar = () => {
      navigation.navigate('SocarDetail', { id: item.id, dateStart: dateStart.toString(), dateEnd: dateEnd.toString() });
    };
    return (
      <TouchableOpacity onPress={onSocar} style={{ paddingVertical: 20, borderBottomWidth: 1, borderColor: '#eee' }}>
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
          <View style={{ flex: DAY_IN_MINUTES }} />
          <View style={{ flex: reservationLength, backgroundColor: Colors.Main, height: 6 }}></View>
          <View style={{ flex: DAY_IN_MINUTES }} />
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
      {!currentZone ? (
        <TouchableOpacity onPress={onSearch} style={[styles.container, { padding: 16, top: normalize(15), alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons size={16} name={'record-circle'} color={Colors.Main} />
            <WText style={{ fontSize: 16, marginLeft: 8 }}>{addKor}</WText>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onTimeSet} style={[styles.container, { padding: 16, top: normalize(15), flexDirection: 'row' }]}>
          <AntDesign size={20} name={'clockcircleo'} color={Colors.Main} />
          <WText m style={{ fontSize: 16, marginLeft: 12 }}>
            이용시간 설정하기
          </WText>
          <WText numberOfLines={1} style={{ color: '#999', marginLeft: 12, flex: 1 }}>
            {moment(dateStart).format(SOCAR_DATE_FORMAT)} ~ {moment(dateEnd).format(SOCAR_DATE_FORMAT)}
          </WText>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={checkLocation} style={styles.locationContainer}>
        <MaterialIcons size={16} name={'my-location'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCenter(DEFAULT_PLACE)} style={{ ...styles.locationContainer, padding: 8, top: normalize(130) }}>
        <WText style={{ fontSize: 12 }}>해리</WText>
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
  locationContainer: {
    top: normalize(80),
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    ...globalStyles.shadow,
    shadowColor: '#111',
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
