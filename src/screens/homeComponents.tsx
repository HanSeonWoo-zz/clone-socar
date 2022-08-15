import { useNavigation } from '@react-navigation/native';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Image, View, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { SOCAR_DATA, SOCARZONE_DATA, CAR_DATA } from '../components/data';
import { SCREEN_WIDTH, normalize, Colors } from '../components/styles';
import { SOCAR_DATE_FORMAT } from '../components/util';
import { WText } from '../components/WText';
import { MainStore } from '../store/mainStore';

const IMAGE_ARRAY = [
  'https://source.unsplash.com/random/375x375',
  'https://source.unsplash.com/random',
  'https://source.unsplash.com/random/400x400',
  'https://source.unsplash.com/random/401x401',
  'https://source.unsplash.com/random/402x402',
  'https://source.unsplash.com/random/403x403',
  'https://source.unsplash.com/random/1',
  'https://source.unsplash.com/random/2',
];

export const MyReservation = inject('st')(
  observer((props) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { st }: { st: MainStore } = props;
    if (!st.getRecentReservation) return <></>;
    const socarInfo = SOCAR_DATA.find((i) => i.id === st.getRecentReservation.socarId);
    const zoneInfo = SOCARZONE_DATA.find((i) => i.id === st.getRecentReservation.zoneId);
    const carInfo = CAR_DATA.find((i) => i.id === socarInfo?.carId);

    return (
      <>
        {!!st.getRecentReservation && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Reservation', { id: st.getRecentReservation.id })}
            style={{
              position: 'absolute',
              left: 10,
              width: SCREEN_WIDTH - 20,
              height: normalize(80),
              bottom: insets.bottom + 10,
              backgroundColor: '#333',
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
            }}>
            <Image style={{ width: normalize(70), height: normalize(50) }} source={{ uri: carInfo?.imageUri }} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <WText m style={{ color: '#fff' }}>
                {carInfo?.name}
              </WText>
              <WText style={{ marginTop: 4, color: '#999', fontSize: 12 }}>{moment(new Date(st.getRecentReservation.dateStart)).format(SOCAR_DATE_FORMAT)} ~</WText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.Main, borderRadius: 20, padding: 8, paddingHorizontal: 12 }}>
              <WText m style={{ color: '#fff', fontSize: 12, marginRight: 4 }}>
                내 예약
              </WText>
              <SimpleLineIcons name={'arrow-right'} color={'#fff'} size={8} />
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }),
);

export function MainTopBanner() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const renderCarousel = useCallback(({ item, index }) => {
    const onPressBanner = () => {};

    return (
      <TouchableWithoutFeedback key={String(item.idx)} onPress={onPressBanner}>
        <Image
          style={{
            width: SCREEN_WIDTH,
            height: 100,
          }}
          source={{ uri: item }}
        />
      </TouchableWithoutFeedback>
    );
  }, []);
  return (
    <View>
      <Carousel
        data={IMAGE_ARRAY}
        renderItem={renderCarousel}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        onSnapToItem={setCarouselIndex}
        inactiveSlideScale={1}
        loop
        autoplay
      />
      <View style={{ backgroundColor: Colors.Dim04, position: 'absolute', bottom: 8, right: 15, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 4 }}>
        <WText b style={{ color: '#fff', fontSize: 10 }}>
          {carouselIndex + 1}/{IMAGE_ARRAY?.length} 모두 보기
        </WText>
      </View>
    </View>
  );
}

const IMAGE_MIDDLE_ARRAY = [
  'https://source.unsplash.com/random/1',
  'https://source.unsplash.com/random/2',
  'https://source.unsplash.com/random/3',
  'https://source.unsplash.com/random/4',
  'https://source.unsplash.com/random/5',
  'https://source.unsplash.com/random/6',
  'https://source.unsplash.com/random/7',
  'https://source.unsplash.com/random/8',
];

export function MainMiddleBanner() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const renderCarousel = useCallback(({ item, index }) => {
    const onPressBanner = () => {};
    return (
      <TouchableWithoutFeedback key={String(item.idx)} onPress={onPressBanner}>
        <Image
          style={{
            width: SCREEN_WIDTH - 30,
            height: normalize(130),
            borderRadius: 16,
          }}
          source={{ uri: item }}
        />
      </TouchableWithoutFeedback>
    );
  }, []);
  return (
    <View style={{ borderRadius: 16 }}>
      <Carousel
        data={IMAGE_MIDDLE_ARRAY}
        renderItem={renderCarousel}
        sliderWidth={SCREEN_WIDTH - 30}
        itemWidth={SCREEN_WIDTH - 30}
        onSnapToItem={setCarouselIndex}
        inactiveSlideScale={1}
        slideStyle={{ borderRadius: 16 }}
        loop
        autoplay
      />
      <View style={{ backgroundColor: Colors.Dim04, position: 'absolute', bottom: 8, right: 15, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 4 }}>
        <WText b style={{ color: '#fff', fontSize: 10 }}>
          {carouselIndex + 1}/{IMAGE_ARRAY?.length} 모두 보기
        </WText>
      </View>
    </View>
  );
}
