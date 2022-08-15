import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ko';
import React from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { CAR_DATA, SOCARZONE_DATA, SOCAR_DATA } from '../components/data';
import { Colors, normalize, SCREEN_HEIGHT } from '../components/styles';
import { SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';
import { MainStore } from '../store/mainStore';

const ReservationScreen = (props) => {
  const insets = useSafeAreaInsets();
  const { st }: { st: MainStore } = props;
  const { route, navigation } = props;
  const reservationInfo = st.histories?.find((i) => i.id === route.params.id);
  if (!reservationInfo) return <ActivityIndicator />;
  const onCancel = () => {
    Alert.alert('예약을 취소하시겠습니까?', '', [
      { text: '아니요' },
      {
        text: '취소하기',
        onPress: () => {
          st.cancelReservation(route.params.id);
          Alert.alert('예약이 취소되었습니다.');
          navigation.goBack();
        },
      },
    ]);
  };
  const socarInfo = SOCAR_DATA.find((i) => i.id === reservationInfo.socarId);
  const zoneInfo = SOCARZONE_DATA.find((i) => i.id === socarInfo.zoneId);
  const carInfo = CAR_DATA.find((i) => i.id === socarInfo?.carId);

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Image style={{ width: normalize(140), height: normalize(100) }} source={{ uri: carInfo?.imageUri }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <WText m style={{ fontSize: 22, color: '#fff' }}>
                {carInfo?.name}
              </WText>
              <SimpleLineIcons name={'arrow-right'} color={'#999'} style={{ marginLeft: 8 }} size={12} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <WText style={{ color: '#ccc' }}>차량 준비 중</WText>
              <View style={{ height: '50%', width: 1, backgroundColor: '#999', marginHorizontal: 4 }} />
              <WText style={{ color: '#ccc' }}>{carInfo?.oil}</WText>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: Colors.Main, paddingBottom: 8, marginTop: 20 }}>
            <WText style={{ color: Colors.Main, fontSize: 12, flex: 1 }}>{moment(new Date(reservationInfo.dateStart)).format(SOCAR_DATE_FORMAT)}</WText>
            <WText style={{ color: Colors.Main, fontSize: 12 }}>{moment(new Date(reservationInfo.dateEnd)).format(SOCAR_DATE_FORMAT)}</WText>
          </View>
          <WText b style={{ color: '#fff', marginTop: 20, fontSize: 16 }}>
            예약이 완료되었습니다.
          </WText>
          <TouchableOpacity style={{ marginTop: 20, borderRadius: 4, backgroundColor: Colors.Main, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <WText style={{ color: '#fff', marginRight: 16 }}>대여 장소</WText>
              <WText m style={{ color: '#fff', flex: 1, fontSize: 16 }}>
                {zoneInfo?.title}
              </WText>
              <Image style={{ width: normalize(50), height: normalize(40) }} source={{ uri: 'https://source.unsplash.com/random' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 8 }}>
              <MaterialIcons name="warning" size={12} color={'yellow'} />
              <WText b style={{ color: 'yellow', fontSize: 12, marginLeft: 4 }}>
                대여시 주의사항이 있어요
              </WText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 8, borderRadius: 4, backgroundColor: '#444', padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <WText style={{ color: '#fff', marginRight: 16 }}>차량 확인</WText>
              <WText m style={{ color: '#fff', flex: 1, fontSize: 16 }}>
                사진을 등록해주세요
              </WText>
              <SimpleLineIcons name={'arrow-right'} color={'#fff'} size={16} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 8 }}>
              <MaterialIcons name="warning" size={12} color="#fff" />
              <WText b style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>
                수리비 청구 방지 위해 필수!
              </WText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 4, backgroundColor: '#444', padding: 20, marginVertical: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <WText style={{ color: '#fff', flex: 1, fontSize: 16 }}>쏘카 이용방법이 궁금하다면?</WText>
              <SimpleLineIcons name={'arrow-right'} color={'#fff'} size={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
            <AntDesign name={'clockcircle'} color={'#999'} size={20} />
            <WText style={{ color: '#eee', marginLeft: 16, marginRight: 16 }}>대여 시각</WText>
            <WText style={{ color: '#eee', fontSize: 15, flex: 1 }}>{moment(new Date(reservationInfo.dateStart)).format(SOCAR_DATE_FORMAT)}</WText>
            <TouchableOpacity>
              <WText style={{ color: '#eee' }}>앞당기기</WText>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#666' }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
            <Ionicons name={'people'} color={'#999'} size={20} />
            <WText style={{ color: '#eee', marginLeft: 16, flex: 1, fontSize: 15 }}>동승운전자</WText>
            <TouchableOpacity>
              <WText style={{ color: '#eee' }}>등록하기</WText>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#666' }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
            <MaterialCommunityIcons name={'water-boiler'} color={'#999'} size={20} />
            <WText style={{ color: '#eee', marginLeft: 16, flex: 1, fontSize: 15 }}>주유 방법 안내</WText>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#666' }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
            <MaterialIcons name={'warning'} color={'#999'} size={20} />
            <WText style={{ color: '#eee', marginLeft: 16, flex: 1, fontSize: 15 }}>취소수수료 및 패널티 안내</WText>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#999' }} />
          <TouchableOpacity onPress={onCancel} style={{ alignItems: 'center', paddingVertical: 30 }}>
            <WText style={{ color: '#eee', fontSize: 16 }}>예약 취소하기</WText>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#999' }} />
          <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 30 }}>
            <WText style={{ color: '#eee', fontSize: 16 }}>예약 내용 자세히 보기</WText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ height: SCREEN_HEIGHT / 5, backgroundColor: '#fff', borderTopLeftRadius: 4, borderTopRightRadius: 4, paddingHorizontal: 20 }}>
        <View style={{ width: 40, height: 4, backgroundColor: '#ddd', alignSelf: 'center', marginTop: 8, borderRadius: 4 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <WText b>스마트키</WText>
          <WText b style={{ color: '#ccc', marginLeft: 8 }}>
            OFF
          </WText>
        </View>
        <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ width: normalize(105), height: normalize(60), borderRadius: 12, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' }}>
            <WText style={{ color: '#999' }}>반납하기</WText>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 12, backgroundColor: '#ddd' }}>
            <TouchableOpacity style={{ width: normalize(105), height: normalize(60), borderRadius: 12, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' }}>
              <SimpleLineIcons name="lock" size={20} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: normalize(105), height: normalize(60), borderRadius: 12, backgroundColor: '#ddd', alignItems: 'center', justifyContent: 'center' }}>
              <SimpleLineIcons name="lock-open" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default inject('st')(observer(ReservationScreen));
