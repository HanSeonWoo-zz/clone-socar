import 'moment/locale/ko';
import React, { useEffect, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { geocode_, naverSearch_ } from '../api/naverApi';
import { normalize } from '../components/styles';
import { WText } from '../components/WText';

// 검색기록 저장 등은 나중에 해보기로
const HistoryListScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [searchArr, setSearchArr] = useState([]);

  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    searchText && search();
    !searchText && setSearchArr([]);
  }, [searchText]);

  const search = async () => {
    const res = await naverSearch_({ query: searchText });
    console.log('🚀 ~ file: SearchScreen.tsx ~ line 27 ~ search ~ res', res);
    setSearchArr(res.items);
  };

  const ListEmptyComponent = () => {
    return <WText style={{ color: '#999', fontSize: 16, textAlign: 'center', marginTop: 60 }}>검색한 기록이 없습니다.</WText>;
  };
  const ListFooterComponent = () => {
    return <></>;
  };

  const renderItem = ({ item, index }) => {
    const onPressItem = async () => {
      const res = await geocode_({ query: item.address });
      if (res.status === 'OK') {
        navigation.navigate('SocarZone', { center: { longitude: Number(res.addresses[0].x), latitude: Number(res.addresses[0].y) } });
        // 검색기록 저장
      }
    };
    return (
      <TouchableOpacity onPress={onPressItem} style={{ flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: '#eee' }}>
        <MaterialIcons name="place" size={24} color={'#ccc'} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <WText>{item.title.replaceAll('<b>', '').replaceAll('</b>', '')}</WText>
          <WText style={{ marginTop: 4, color: '#666' }}>{item.address}</WText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderColor: '#ddd' }}>
        <MaterialIcons onPress={onBack} name="arrow-back" size={normalize(24)} style={{ marginLeft: 20 }} />
        <TextInput
          style={{ marginLeft: 12, flex: 1, marginRight: 20 }}
          textAlignVertical="center"
          placeholder="주소 또는 건물명 검색"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          autoFocus
          clearButtonMode="always"
          onChangeText={setSearchText}
        />
      </View>
      <FlatList renderItem={renderItem} data={searchArr} ListEmptyComponent={ListEmptyComponent} ListFooterComponent={ListFooterComponent} />
    </SafeAreaView>
  );
};
export default HistoryListScreen;
