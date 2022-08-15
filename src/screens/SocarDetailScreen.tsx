import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { CAR_DATA, SOCARZONE_DATA, SOCAR_DATA } from '../components/data';
import { Colors, globalStyles, normalize, SCREEN_WIDTH } from '../components/styles';
import { formatNumber, getDefaultEnd, getDefaultStart } from '../components/util';
import { WText } from '../components/WText';

const SocarDetailScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { id } = route.params;
  console.log('🚀 ~ file: SocarDetailScreen.tsx ~ line 9 ~ SocarDetailScreen ~ id', id);
  console.log('🚀 ~ file: SocarDetailScreen.tsx ~ line 109 ~ SocarDetailScreen ~ route', route);
  const socarInfo = SOCAR_DATA.find((socar) => socar.id === id);
  const carInfo = CAR_DATA.find((car) => car.id === socarInfo?.carId);
  const zoneInfo = SOCARZONE_DATA.find((zone) => zone.id === socarInfo?.zoneId);
  console.log('🚀 ~ file: SocarDetailScreen.tsx ~ line 14 ~ SocarDetailScreen ~ carInfo', carInfo);
  const [selectedInsureance, setSelectedInsureance] = useState(1);
  const [dateStart, setDateStart] = useState(new Date(route.params.dateStart));
  const [dateEnd, setDateEnd] = useState(new Date(route.params.dateEnd));
  const [useTime, setUseTime] = useState(0);
  const [insureanceFee, setInsureanceFee] = useState(carInfo?.insureancePrice2);

  useEffect(() => {
    setUseTime(moment(dateEnd).diff(dateStart, 'minutes'));
  }, [dateStart, dateEnd]);
  const onNext = () => {
    navigation.navigate('SocarPay', { id, dateStart: dateStart.toString(), dateEnd: dateEnd.toString(), insureanceFee });
  };
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

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <WText m style={{ fontSize: 22, marginTop: 12 }}>
            대여 정보 확인
          </WText>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Image style={{ width: normalize(140), height: normalize(100) }} source={{ uri: carInfo?.imageUri }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
              <WText m style={{ fontSize: 16 }}>
                {carInfo?.name}
              </WText>
              <WText style={{ marginLeft: 4, color: '#666' }}>{carInfo?.oil}</WText>
              <SimpleLineIcons name={'arrow-right'} color={'#999'} style={{ marginLeft: 8 }} size={12} />
            </View>
          </View>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#eee', marginVertical: 24 }} />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <WText b style={{ fontSize: 16 }}>
              주행요금
            </WText>
            <WText b style={{ color: Colors.Main, fontSize: 15, marginLeft: 8, flex: 1 }}>
              {carInfo?.oilPrice1} ~ {carInfo?.oilPrice3}원 /km
            </WText>
            <Ionicons name="help-circle-outline" size={24} />
          </View>
          <WText style={{ color: '#666', lineHeight: 20 }}>
            {`
주행요금은 반납 후 등록하신 결제카드로 자동 결제됩니다.
주행요금은 거리에 따라 구간별 차등 적용하여 계산됩니다.
          
- 주행거리 30km 이하 : (km 당 주행요금) ${carInfo?.oilPrice1}원
- 주행거리 30 초과 ~ 100km 이하 : (km 당 주행요금) ${carInfo?.oilPrice2}원
- 주행거리 100km 초과 : (km 당 주행요금) ${carInfo?.oilPrice3}원`}
          </WText>
        </View>
        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <WText m style={{ fontSize: 16 }}>
            이용 방식 왕복
          </WText>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#eee', marginVertical: 24 }} />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ paddingVertical: 3, paddingHorizontal: 6, backgroundColor: Colors.Main, borderRadius: 2 }}>
              <WText style={{ color: '#fff', fontSize: 12 }}>대여</WText>
            </View>
            <WText style={{ marginLeft: 8, flex: 1 }}>{zoneInfo?.title}</WText>
            <TouchableOpacity>
              <WText style={{ color: '#666', fontSize: 13 }}>자세히</WText>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
            <View style={{ paddingVertical: 3, paddingHorizontal: 6, backgroundColor: 'blue', borderRadius: 2 }}>
              <WText style={{ color: '#fff', fontSize: 12 }}>반납</WText>
            </View>
            <WText style={{ marginLeft: 8, flex: 1 }}>{zoneInfo?.title}</WText>
            <TouchableOpacity>
              <WText style={{ color: '#666', fontSize: 13 }}>자세히</WText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <WText m style={{ fontSize: 16 }}>
            자동차종합보험
          </WText>
          <WText style={{ color: '#666', lineHeight: 20 }}>
            {`
쏘카의 모든 차량은 차량손해면책 외 자손/대인/대물의 피해를 보상하는 자동차종합보험에 가입되어 있습니다.`}
          </WText>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#eee', marginVertical: 24 }} />
          <WText m style={{ fontSize: 16 }}>
            차량손해면책 상품
          </WText>
          <WText style={{ color: '#666', lineHeight: 20 }}>
            {`
운행 중 일어난 사고로 쏘카 차를 수리할 때, 회원님이 부담할 자기부담금 최고액을 고르세요.
* 이용 기간 안에 신고한 차 손상만 차량손해면책제도를 적용받을 수 있으니, 차가 손상됐을 땐 바로 신고하세요.`}
          </WText>
          <TouchableOpacity
            onPress={() => {
              setSelectedInsureance(0);
              setInsureanceFee(carInfo?.insureancePrice3);
            }}
            style={{ flexDirection: 'row', paddingVertical: 12 }}>
            <MaterialIcons name={selectedInsureance === 0 ? 'radio-button-on' : 'radio-button-off'} size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <WText style={{ fontSize: 16, color: selectedInsureance === 0 ? '#333' : '#999' }}>자기부담금 최대 5만원</WText>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <WText style={{ fontSize: 12, color: '#666', textDecorationLine: 'underline' }}>AXA 운전자보험 포함</WText>
              </TouchableOpacity>
            </View>
            <WText style={{ color: selectedInsureance === 0 ? '#333' : '#999' }}>+ {formatNumber(carInfo?.insureancePrice3)}원</WText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedInsureance(1);
              setInsureanceFee(carInfo?.insureancePrice2);
            }}
            style={{ flexDirection: 'row', paddingVertical: 12 }}>
            <MaterialIcons name={selectedInsureance === 1 ? 'radio-button-on' : 'radio-button-off'} size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <WText style={{ fontSize: 16, color: selectedInsureance === 1 ? '#333' : '#999' }}>자기부담금 최대 30만원</WText>
            </View>
            <WText style={{ color: selectedInsureance === 1 ? '#333' : '#999' }}>+ {formatNumber(carInfo?.insureancePrice2)}원</WText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedInsureance(2);
              setInsureanceFee(carInfo?.insureancePrice1);
            }}
            style={{ flexDirection: 'row', paddingVertical: 12 }}>
            <MaterialIcons name={selectedInsureance === 2 ? 'radio-button-on' : 'radio-button-off'} size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <WText style={{ fontSize: 16, color: selectedInsureance === 2 ? '#333' : '#999' }}>자기부담금 최대 70만원</WText>
            </View>
            <WText style={{ color: selectedInsureance === 2 ? '#333' : '#999' }}>+ {formatNumber(carInfo?.insureancePrice1)}원</WText>
          </TouchableOpacity>
        </View>
        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <WText m style={{ fontSize: 16 }}>
            개인 업무용 예약이신가요?
          </WText>
          <WText style={{ color: '#666', lineHeight: 20 }}>
            {`
예약을 업무용으로 기록해두세요.
영수증을 포함한 이용내역서를 따로 보내드립니다.`}
          </WText>
        </View>
      </ScrollView>
      <View style={[globalStyles.shadow, { borderTopWidth: 1, borderColor: '#eee', paddingBottom: insets.bottom + 10, flexDirection: 'row', padding: 20 }]}>
        <View style={{ flex: 1 }}>
          <WText m style={{ fontSize: 16 }}>
            총 {formatNumber(useTime * carInfo?.minPrice + insureanceFee)}원
          </WText>
          <WText style={{ color: '#666', fontSize: 11, marginTop: 4 }}>대여요금 + 면책상품 요금</WText>
        </View>
        <TouchableOpacity onPress={onNext} style={{ paddingHorizontal: 40, paddingVertical: 15, backgroundColor: Colors.Main }}>
          <WText b style={{ fontSize: 17, color: '#fff' }}>
            다음
          </WText>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default SocarDetailScreen;
