import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { Img } from '../assets/images';
import { FixedButton } from '../components/buttons';
import { CAR_DATA, SOCARZONE_DATA, SOCAR_DATA } from '../components/data';
import { Colors } from '../components/styles';
import { formatNumber } from '../components/util';
import { WText } from '../components/WText';
import { MainStore } from '../store/mainStore';

const SocarPayScreen = (props) => {
  const insets = useSafeAreaInsets();
  const { st }: { st: MainStore } = props;
  const { route, navigation } = props;
  const { id } = route.params;
  const socarInfo = SOCAR_DATA.find((socar) => socar.id === id);
  const carInfo = CAR_DATA.find((car) => car.id === socarInfo?.carId);
  const zoneInfo = SOCARZONE_DATA.find((zone) => zone.id === socarInfo?.zoneId);
  const [selectedPayMethod, setSelectedPayMethod] = useState<'naverPay' | 'socarCard'>('socarCard');
  const [isAgree0, setIsAgree0] = useState(false);
  const [isAgree1, setIsAgree1] = useState(false);
  const [isAgree2, setIsAgree2] = useState(false);
  const [isAgree3, setIsAgree3] = useState(false);
  const [isAgree4, setIsAgree4] = useState(false);
  const [dateStart] = useState(new Date(route.params.dateStart));
  const [dateEnd] = useState(new Date(route.params.dateEnd));
  const [useTime] = useState(moment(dateEnd).diff(dateStart, 'minutes'));

  const onAgreeAll = () => {
    if (isAgree0 && isAgree1 && isAgree2 && isAgree3 && isAgree4) {
      setIsAgree0(false);
      setIsAgree1(false);
      setIsAgree2(false);
      setIsAgree3(false);
      setIsAgree4(false);
    } else {
      setIsAgree0(true);
      setIsAgree1(true);
      setIsAgree2(true);
      setIsAgree3(true);
      setIsAgree4(true);
    }
  };
  const onReservation = () => {
    Alert.alert('(???)??????', '????????? : ????????? ?????????\n?????? ????????? ???????????????????\n[??????] ?????? ???, ?????? ??? ????????? ???????????????.', [
      { text: '??????' },
      {
        text: '??????',
        onPress: async () => {
          const newId = await st.addHistory({ dateStart: route.params.dateStart, dateEnd: route.params.dateEnd, zoneId: zoneInfo?.id, socarId: socarInfo?.id, state: '????????????' });
          navigation.popToTop();
          navigation.navigate('Reservation', { id: newId });
        },
      },
    ]);
  };
  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>
        <View style={{ paddingHorizontal: 20, marginTop: 12 }}>
          <WText m style={{ fontSize: 22 }}>
            ?????? ?????? ??????
          </WText>
          <WText m style={{ fontSize: 18, marginTop: 24 }}>
            ????????????
          </WText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
            <WText style={{ flex: 1, color: '#666', fontSize: 15 }}>????????????</WText>
            <WText b style={{ fontSize: 15 }}>
              {formatNumber(useTime * carInfo?.minPrice * 2)}???
            </WText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <WText style={{ flex: 1, color: '#666', fontSize: 15 }}>???????????? ??????</WText>
            <WText b style={{ fontSize: 15 }}>
              {formatNumber(route.params.insureanceFee)}???
            </WText>
          </View>
        </View>
        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />

        <View style={{ paddingHorizontal: 20 }}>
          <WText m style={{ fontSize: 18 }}>
            ??????
          </WText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
            <WText m style={{ flex: 1, fontSize: 15 }}>
              ??????
            </WText>
            <WText b style={{ fontSize: 15 }}>
              {formatNumber(-useTime * carInfo?.minPrice)}???
            </WText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Image style={{ width: 14, height: 14, margin: 4 }} source={Img.pathport} />
            <WText style={{ fontSize: 13, color: '#666', marginLeft: 4 }}>[????????????] ??? ?????? ???????????? 50% ??????</WText>
            <View style={{ flex: 1 }} />
          </View>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#eee', marginVertical: 24 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <WText m style={{ fontSize: 15, marginRight: 8 }}>
              ?????????
            </WText>
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <WText m style={{ fontSize: 13, flex: 1, color: '#999' }}>
              ????????? ?????? ????????? {formatNumber(3637)}
            </WText>
            <TouchableOpacity>
              <WText style={{ color: Colors.Main }}>????????????</WText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <WText m style={{ fontSize: 18, flex: 1 }}>
              ????????????
            </WText>
            <TouchableOpacity>
              <WText style={{ color: '#666', fontSize: 13 }}>????????????</WText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setSelectedPayMethod('naverPay');
            }}
            style={{ flexDirection: 'row', paddingVertical: 12, marginTop: 12 }}>
            <MaterialIcons name={selectedPayMethod === 'naverPay' ? 'radio-button-on' : 'radio-button-off'} size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <WText style={{ fontSize: 16, color: selectedPayMethod === 'naverPay' ? '#333' : '#999' }}>??????????????? / ??????</WText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedPayMethod('socarCard');
            }}
            style={{ flexDirection: 'row', paddingVertical: 12 }}>
            <MaterialIcons name={selectedPayMethod === 'socarCard' ? 'radio-button-on' : 'radio-button-off'} size={20} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <WText style={{ fontSize: 16, color: selectedPayMethod === 'socarCard' ? '#333' : '#999' }}>????????????</WText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <WText m style={{ fontSize: 18 }}>
            ?????? ?????? ??????
          </WText>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
            <WText style={{ flex: 1, color: '#666' }}>?????? ??????</WText>
            <WText b style={{ fontSize: 15 }}>
              {formatNumber(useTime * carInfo?.minPrice * 2)}???
            </WText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <WText style={{ flex: 1, color: '#666' }}>?????? ??????</WText>
            <WText b style={{ fontSize: 15 }}>
              {formatNumber(-useTime * carInfo?.minPrice)}???
            </WText>
          </View>
          <View style={{ borderWidth: 0.5, borderStyle: 'dotted', width: '100%', borderColor: '#eee', marginVertical: 24 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <WText style={{ flex: 1, fontSize: 16 }}>??? ?????? ??????</WText>
            <WText b style={{ fontSize: 22, color: Colors.Main }}>
              {formatNumber(useTime * carInfo?.minPrice + route.params.insureanceFee)}???
            </WText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <WText style={{ fontSize: 13, color: '#333', marginRight: 4 }}>?????? ?????? ?????????</WText>
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={20} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <WText>{formatNumber((useTime * carInfo?.minPrice + route.params.insureanceFee) * 0.05)} ?????????</WText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Image style={{ width: 14, height: 14, margin: 4 }} source={Img.pathport} />
            <WText style={{ fontSize: 13, color: '#666', marginLeft: 4 }}>???????????? 5%</WText>
            <View style={{ flex: 1 }} />
            <WText>{formatNumber((useTime * carInfo?.minPrice + route.params.insureanceFee) * 0.05)}</WText>
          </View>
        </View>
        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee', marginVertical: 30 }} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <WText b style={{ fontSize: 16 }}>
              ?????? ??? ?????? ??????
            </WText>
            <TouchableOpacity>
              <WText style={{ color: '#666' }}>?????????</WText>
            </TouchableOpacity>
          </View>
          <WText style={{ color: '#666', lineHeight: 20 }}>
            {`
?????? ????????? ?????? ?????? ???????????? ???????????? ?????? ??? ????????????.
?????? ????????? ????????? ?????? ????????? ??? ??? ????????????.
?????? ?????? ???????????? ??? ????????? ?????? ?????????, ????????? ?????? ?????? ????????? ?????? ???????????????.
?????????????????? ?????? ?????? ?????? 10??? ???????????? ????????? ??? ????????????.`}
          </WText>
          <WText b style={{ fontSize: 16, marginTop: 24, marginBottom: 12 }}>
            ?????? ??? ?????? ?????? ??????
          </WText>
          <TouchableOpacity onPress={onAgreeAll} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <MaterialIcons name="check-circle" size={24} color={isAgree0 && isAgree1 && isAgree2 && isAgree3 && isAgree4 ? '#333' : '#ccc'} />
            <WText style={{ flex: 1, marginLeft: 8, color: isAgree0 && isAgree1 && isAgree2 && isAgree3 && isAgree4 ? '#111' : '#666' }}>
              ?????? ?????? ?????? ??? ?????? ????????? ???????????????.
            </WText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsAgree0(!isAgree0)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <MaterialIcons name="check" size={24} color={isAgree0 ? '#333' : '#ccc'} />
            <WText style={{ flex: 1, marginLeft: 8, color: isAgree0 ? '#111' : '#666' }}>(??????) ?????? ?????????????????????</WText>
            <TouchableOpacity>
              <SimpleLineIcons name={'arrow-right'} color={'#666'} size={8} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAgree1(!isAgree1)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <MaterialIcons name="check" size={24} color={isAgree1 ? '#333' : '#ccc'} />
            <WText style={{ flex: 1, marginLeft: 8, color: isAgree1 ? '#111' : '#666' }}>(??????) ?????? ???????????????????????? ????????????</WText>
            <TouchableOpacity>
              <SimpleLineIcons name={'arrow-right'} color={'#666'} size={8} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAgree2(!isAgree2)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <MaterialIcons name="check" size={24} color={isAgree2 ? '#333' : '#ccc'} />
            <WText style={{ flex: 1, marginLeft: 8, color: isAgree2 ? '#111' : '#666' }}>(??????) ???????????? ?????? ??? ?????? ??????</WText>
            <TouchableOpacity>
              <SimpleLineIcons name={'arrow-right'} color={'#666'} size={8} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAgree3(!isAgree3)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <MaterialIcons name="check" size={24} color={isAgree3 ? '#333' : '#ccc'} />
            <WText style={{ flex: 1, marginLeft: 8, color: isAgree3 ? '#111' : '#666' }}>(??????) ???????????? ???3??? ?????? ??????</WText>
            <TouchableOpacity>
              <SimpleLineIcons name={'arrow-right'} color={'#666'} size={8} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsAgree4(!isAgree4)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <MaterialIcons name="check" size={24} color={isAgree4 ? '#333' : '#ccc'} />
            <WText style={{ flex: 1, marginLeft: 8, color: isAgree4 ? '#111' : '#666' }}>(??????) ???????????? ????????????</WText>
            <TouchableOpacity>
              <SimpleLineIcons name={'arrow-right'} color={'#666'} size={8} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FixedButton
        disabled={!(isAgree0 && isAgree1 && isAgree2 && isAgree3 && isAgree4)}
        title={`??? ${formatNumber(useTime * carInfo?.minPrice + route.params.insureanceFee)}??? ????????????`}
        onPress={onReservation}
      />
    </>
  );
};
export default inject('st')(observer(SocarPayScreen));
