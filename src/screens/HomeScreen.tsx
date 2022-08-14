import React, { useCallback, useState } from 'react';
import { ScrollView, Image, View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Img } from '../assets/images';
import { normalize, globalStyles, SCREEN_WIDTH, Colors } from '../components/styles';
import { WText } from '../components/WText';

function HomeScreen({ route, navigation }) {
  return (
    <ScrollView style={{ backgroundColor: '#F1F1F1' }}>
      <MainTopBanner />
      <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SocarZone')}
            style={{
              flex: 1,
              ...globalStyles.border,
              ...globalStyles.shadow,
              height: normalize(300),
              marginRight: 10,
            }}>
            <View style={{ padding: 16 }}>
              <WText style={{ fontSize: 20 }}>가지러 가기</WText>
              <WText
                style={{
                  fontSize: 14,
                  color: '#666',
                  marginTop: 12,
                }}>
                {'가까운 쏘카존\n찾기'}
              </WText>
            </View>
            <Image
              style={{
                width: '100%',
                height: normalize(180),
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
              source={Img.go}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  ...globalStyles.border,
                  ...globalStyles.shadow,
                  height: normalize(145),
                  padding: 16,
                }}>
                <WText style={{ fontSize: 20 }}>여기로 부르기</WText>
                <WText
                  style={{
                    fontSize: 14,
                    color: '#666',
                    marginTop: 12,
                    marginBottom: 24,
                  }}>
                  {'원하는 차\n받기'}
                </WText>
              </View>
              <Image
                style={{
                  width: normalize(80),
                  height: normalize(70),
                  position: 'absolute',
                  bottom: 15,
                  right: 0,
                }}
                source={Img.call_here}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...globalStyles.border,
                ...globalStyles.shadow,
                height: normalize(145),
              }}>
              <View style={{ padding: 16 }}>
                <WText style={{ fontSize: 20 }}>한 달 이상</WText>
                <WText
                  style={{
                    fontSize: 14,
                    color: '#666',
                    marginTop: 12,
                    marginBottom: 24,
                  }}>
                  {'더 오래\n타기'}
                </WText>
              </View>

              <Image
                style={{
                  width: normalize(80),
                  height: normalize(70),
                  position: 'absolute',
                  bottom: 15,
                  right: 0,
                }}
                source={Img.more_month}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
          <View style={[styles.container, { alignItems: 'center', width: normalize(105) }]}>
            <Image style={{ width: normalize(25), height: normalize(25) }} source={Img.pathport} />
            <WText style={{ marginTop: 12 }}>패스포트</WText>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(22,125,251,1)',
                borderRadius: 12,
                padding: 3,
                paddingHorizontal: 5,
                width: normalize(80),
                transform: [{ translateY: -10 }],
              }}>
              <WText b style={{ fontSize: 10, color: '#fff' }}>
                무제한 50% 할인
              </WText>
            </View>
          </View>
          <View style={[styles.container, { alignItems: 'center', width: normalize(105) }]}>
            <Image style={{ width: normalize(25), height: normalize(25) }} source={Img.socar_card} />
            <WText style={{ marginTop: 12 }}>쏘카카드</WText>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(22,125,251,1)',
                borderRadius: 12,
                padding: 3,
                paddingHorizontal: 5,
                width: normalize(80),
                transform: [{ translateY: -10 }],
              }}>
              <WText b style={{ fontSize: 10, color: '#fff' }}>
                최대 10만원 혜택
              </WText>
            </View>
          </View>
          <View style={[styles.container, { alignItems: 'center', width: normalize(105) }]}>
            <Image style={{ width: normalize(25), height: normalize(25) }} source={Img.socar_business} />
            <WText style={{ marginTop: 12 }}>쏘카비즈니스</WText>
          </View>
        </View>
        <View style={[styles.container, { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="help-circle-outline" size={24} />
            <WText style={{ marginTop: 8, fontSize: 12 }}>고객센터</WText>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Ionicons name="receipt-outline" size={24} />
            <WText style={{ marginTop: 8, fontSize: 12 }}>이용 내역</WText>
          </View>
          <View style={{ alignItems: 'center' }}>
            <AntDesign name="creditcard" size={24} />
            <WText style={{ marginTop: 8, fontSize: 12 }}>결제면허</WText>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="alpha-c-circle-outline" size={24} />
            <WText style={{ marginTop: 8, fontSize: 12 }}>내 크레딧</WText>
          </View>
        </View>
        <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <Image style={{ width: normalize(30), height: normalize(30), marginLeft: 16 }} resizeMode="contain" source={Img.use_guide} />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <WText b style={{ fontSize: 15 }}>
              이용 가이드
            </WText>
            <WText style={{ color: '#666', marginTop: 8 }}>쏘카에서 차를 처음 예약하시나요?</WText>
          </View>
          <AntDesign name="right" color="#bbb" size={20} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' }}>
          <View style={[styles.container, { width: normalize(165) }]}>
            <WText m style={{ fontSize: 16 }}>
              쏘카페어링
            </WText>
            <WText style={{ marginTop: 4, fontSize: 13, color: '#666' }}>취향을 잇는 차</WText>
            <Image
              style={{
                width: normalize(70),
                height: normalize(35),
                position: 'absolute',
                bottom: 5,
                right: 0,
              }}
              source={Img.socar_sharing}
            />
          </View>
          <View style={[styles.container, { width: normalize(165) }]}>
            <WText m style={{ fontSize: 16 }}>
              쏘카마이존
            </WText>
            <WText style={{ marginTop: 4, fontSize: 13, color: '#666' }}>쏘카존 만들기</WText>
            <Image
              style={{
                width: normalize(55),
                height: normalize(45),
                position: 'absolute',
                bottom: 5,
                right: 0,
                resizeMode: 'contain',
              }}
              source={Img.socar_myzone}
            />
          </View>
        </View>
        <View style={{ marginTop: 12, borderRadius: 16 }}>
          <MainMiddleBanner />
        </View>

        <View style={{ marginTop: 30 }}>
          <WText m style={{ fontSize: 16 }}>
            쏘카 스토리
          </WText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story1} />
            <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story2} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
            <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story3} />
            <Image style={{ width: normalize(165), height: normalize(220) }} source={Img.story4} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.border,
    ...globalStyles.shadow,
    padding: 16,
  },
});

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

function MainTopBanner() {
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

function MainMiddleBanner() {
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
