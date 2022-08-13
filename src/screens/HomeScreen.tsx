import React from "react";
import { ScrollView, Image, View, TouchableOpacity, Button } from "react-native";
import { Img } from "../assets/images";
import { normalize, globalStyles } from "../components/styles";
import { WText } from "../components/WText";

const HomeScreen=({route,navigation})=> {
    return (
      <ScrollView>
        <Image
          style={{width: '100%', height: normalize(100)}}
          source={{uri: 'https://source.unsplash.com/random'}}
        />
        <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SocarZone')}
              style={{
                flex: 1,
                ...globalStyles.border,
                ...globalStyles.shadow,
                height: normalize(300),
                marginRight: 10,
              }}>
              <View style={{padding: 16}}>
                <WText style={{fontSize: 20}}>가지러 가기</WText>
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
                  <WText style={{fontSize: 20}}>여기로 부르기</WText>
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
                <View style={{padding: 16}}>
                  <WText style={{fontSize: 20}}>한 달 이상</WText>
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
        </View>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </ScrollView>
    );
  }

  export default HomeScreen;