import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NaverMapView, { Marker } from 'react-native-nmap';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { reverseGeo_ } from '../api/naverApi';
import { Colors, normalize, SCREEN_WIDTH } from '../components/styles';
import { getDefaultEnd, getDefaultStart, SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';

const P0 = { latitude: 37.565051, longitude: 126.978567 };
const SocarZoneScree = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [dateStart, setDateStart] = useState(getDefaultStart());
  const [dateEnd, setDateEnd] = useState(getDefaultEnd());
  const [mark, setMark] = useState(P0);
  const [addKor, setAddKor] = useState('');

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
          setMark({ latitude: position.coords.latitude, longitude: position.coords.longitude });
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
    // checkLocation();
    // reverseGeo_().then((res) => {
    //   console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 72 ~ useEffect ~ res', res);
    // });
  }, []);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <NaverMapView
        scaleBar={false}
        zoomControl={false}
        showsMyLocationButton={false}
        useTextureView
        onMapClick={() => {
          console.log('On Map Click');
        }}
        onTouch={() => {
          console.log('On Touch Map');
        }}
        onCameraChange={(e) => {
          console.log('onCameraChange', e);
          setMark({ latitude: e.latitude, longitude: e.longitude });
          try {
            reverseGeo_({ coords: e.longitude + ',' + e.latitude }).then((res) => {
              console.log('🚀 ~ file: SocarZoneScreen.tsx ~ line 93 ~ SocarZoneScree ~ res', res);
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
        center={{ ...P0, zoom: 16 }}>
        <Marker caption={{ text: '', color: '#fff', offset: -70, haloColor: Colors.Dim06 }} coordinate={mark} />
      </NaverMapView>
      <TouchableOpacity
        style={[
          styles.shadow,
          {
            borderRadius: 8,
            borderColor: '#FAFAFA',
            backgroundColor: '#fff',
            padding: 16,
            position: 'absolute',
            top: normalize(15),
            left: 10,
            right: 0,
            width: SCREEN_WIDTH - 20,
            alignItems: 'center',
          },
        ]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons size={16} name={'record-circle'} color={Colors.Main} />
          <WText style={{ fontSize: 16, marginLeft: 8 }}>{addKor}</WText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onTimeSet}
        style={[
          styles.shadow,
          {
            borderRadius: 8,
            borderColor: '#FAFAFA',
            backgroundColor: '#fff',
            padding: 20,
            position: 'absolute',
            bottom: insets.bottom + normalize(20),
            left: 10,
            right: 0,
            width: SCREEN_WIDTH - 20,
            flexDirection: 'row',
          },
        ]}>
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
    </View>
  );
};
export default SocarZoneScree;
const styles = StyleSheet.create({
  shadow: {
    backgroundColor: '#fff',
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
