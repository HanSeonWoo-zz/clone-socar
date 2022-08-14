import 'moment/locale/ko';
import moment from 'moment';
import React, { useState } from 'react';
import { LayoutAnimation, ScrollView, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { FixedButton } from '../components/buttons';
import { SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';

const TimeSetModalScreen = ({ route, navigation }) => {
  const [dateStart, setDateStart] = useState(new Date(route.params.dateStart));
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [dateEnd, setDateEnd] = useState(new Date(route.params.dateEnd));
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const onOK = () => {
    navigation.navigate('SocarZone', { dateStart: dateStart.toString(), dateEnd: dateEnd.toString() });
  };
  const onClose = () => {
    navigation.goBack();
  };

  const onToggleStart = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpenStart(!isOpenStart);
  };
  const onToggleEnd = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpenEnd(!isOpenEnd);
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <EvilIcons onPress={onClose} style={{ alignSelf: 'flex-end', margin: 16 }} name="close" size={30} />
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <WText b style={{ fontSize: 22 }}>
            이용시간 설정하기
          </WText>
          <WText style={{ color: '#999', marginTop: 12, marginBottom: 24 }}>
            {moment(dateStart).format(SOCAR_DATE_FORMAT)} ~ {moment(dateEnd).format(SOCAR_DATE_FORMAT)}
          </WText>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ borderTopWidth: 1, borderColor: '#eee', paddingVertical: 20 }}>
              <TouchableOpacity onPress={onToggleStart} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <WText style={{ flex: 1, color: '#666' }}>대여 시각</WText>
                <WText b style={{ fontSize: 16 }}>
                  {moment(dateStart).format(SOCAR_DATE_FORMAT)}
                </WText>
                <SimpleLineIcons name={isOpenStart ? 'arrow-up' : 'arrow-down'} color={'#666'} style={{ marginLeft: 24 }} size={16} />
              </TouchableOpacity>
              {isOpenStart && <DatePicker date={dateStart} onDateChange={setDateStart} minimumDate={new Date()} androidVariant={'iosClone'} minuteInterval={10} mode="datetime" />}
            </View>
            <View style={{ borderTopWidth: 1, borderColor: '#eee', paddingVertical: 20 }}>
              <TouchableOpacity onPress={onToggleEnd} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <WText style={{ flex: 1, color: '#666' }}>반납 시각</WText>
                <WText b style={{ fontSize: 16 }}>
                  {moment(dateEnd).format(SOCAR_DATE_FORMAT)}
                </WText>
                <SimpleLineIcons name={isOpenEnd ? 'arrow-up' : 'arrow-down'} color={'#666'} style={{ marginLeft: 24 }} size={16} />
              </TouchableOpacity>
              {isOpenEnd && <DatePicker date={dateEnd} onDateChange={setDateEnd} minimumDate={dateStart} androidVariant={'iosClone'} minuteInterval={10} mode="datetime" />}
            </View>
          </ScrollView>
        </View>
      </View>
      <FixedButton title={'확인'} onPress={onOK} />
    </>
  );
};
export default TimeSetModalScreen;
