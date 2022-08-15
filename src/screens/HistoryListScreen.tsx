import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import 'moment/locale/ko';
import React from 'react';
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { CAR_DATA, SOCARZONE_DATA, SOCAR_DATA } from '../components/data';
import { Colors, normalize } from '../components/styles';
import { SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';
import { MainStore } from '../store/mainStore';

const HistoryListScreen = (props) => {
  const { st }: { st: MainStore } = props;
  const { route, navigation } = props;
  const insets = useSafeAreaInsets();
  console.log(
    '>>>',
    st.histories.map((i) => toJS(i)),
  );
  const ListEmptyComponent = () => {
    return <WText style={{ color: '#999', fontSize: 16, textAlign: 'center', marginTop: 60 }}>이용 내역이 없습니다.</WText>;
  };

  const renderItem = ({ item, index }) => {
    console.log('🚀 ~ file: HistoryListScreen.tsx ~ line 41 ~ renderItem ~ item', toJS(item));
    const socarInfo = SOCAR_DATA.find((i) => i.id === item.socarId);
    const zoneInfo = SOCARZONE_DATA.find((i) => i.id === item.zoneId);
    const carInfo = CAR_DATA.find((i) => i.id === socarInfo?.carId);
    const onPressItem = () => {};
    const onCancel = () => {
      Alert.alert('예약을 취소하시겠습니까?', '', [
        { text: '아니요' },
        {
          text: '취소하기',
          onPress: () => {
            st.cancelReservation(item.id);
            Alert.alert('예약이 취소되었습니다.');
          },
        },
      ]);
    };
    return (
      <>
        <View style={{ borderWidth: 1, height: 8, backgroundColor: '#FAFAFA', borderColor: '#eee' }} />
        <TouchableOpacity onPress={onPressItem} style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: item.state === '예약완료' ? '#333' : '#ddd', borderRadius: 2, paddingHorizontal: 8, paddingVertical: 4 }}>
              <WText style={{ color: item.state === '예약완료' ? '#fff' : '#666', fontSize: 12 }}>{item.state}</WText>
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <View style={{ alignItems: 'center', marginRight: 12, width: '30%', opacity: item.state === '예약취소' ? 0.5 : 1 }}>
              <Image style={{ width: normalize(70), height: normalize(50) }} source={{ uri: carInfo?.imageUri }} />
              <WText style={{ fontSize: 12, color: '#333', marginTop: 12 }}>{carInfo?.name}</WText>
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="place" size={20} color={Colors.Main} />
                <WText>{zoneInfo?.title}</WText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <MaterialIcons name="place" size={20} color={Colors.MainDark} />
                <WText>{zoneInfo?.title}</WText>
              </View>
              <WText style={{ marginTop: 16, fontSize: 12, color: '#333' }}>
                {moment(new Date(item.dateStart)).format(SOCAR_DATE_FORMAT)} ~ {moment(new Date(item.dateEnd)).format(SOCAR_DATE_FORMAT)}
              </WText>
            </View>
          </View>
          {item.state === '예약완료' && (
            <TouchableOpacity
              onPress={onCancel}
              style={{ marginTop: 20, borderWidth: 1, borderColor: '#eee', height: normalize(60), alignItems: 'center', justifyContent: 'center' }}>
              <WText style={{ fontSize: 16, color: '#666' }}>예약취소</WText>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <FlatList contentContainerStyle={{ paddingBottom: insets.bottom + 10 }} renderItem={renderItem} data={[...st.histories].reverse()} ListEmptyComponent={ListEmptyComponent} />
  );
};
export default inject('st')(observer(HistoryListScreen));
