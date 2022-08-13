import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import NaverMapView, { Marker, Path, Polyline, Circle, Polygon } from "react-native-nmap";
import { Colors, globalStyles, normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/styles";
import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {checkLocationAccuracy} from 'react-native-permissions';
import { WText } from "../components/WText";
import { Img } from "../assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { reverseGeo_ } from "../api/naverApi";


    const P0 = {latitude: 37.565051, longitude: 126.978567};
    const SocarZoneScree=({route,navigation})=> {
  const insets=useSafeAreaInsets()
    const [mark,setMark]=useState(P0)
    const [addKor,setAddKor]=useState('')
    console.log('>>')
  const getPermission = async()=>{
    // const res =await requestAuthorization("whenInUse")
    // console.log("🚀 ~ file: SocarZoneScreen.tsx ~ line 11 ~ getPermission ~ res", res)
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  .then((result) => {
    console.log("🚀 ~ file: SocarZoneScreen.tsx ~ line 15 ~ .then ~ result", result)
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
  const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  console.log("🚀 ~ file: SocarZoneScreen.tsx ~ line 40 ~ getPermission ~ res", res)
  // checkLocationAccuracy()
  // .then((accuracy) => console.log(`Location accuracy is: ${accuracy}`))
  // .catch(() => console.warn('Cannot check location accuracy'));
  }
const checkLocation =()=>{
  // if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  // }
}
useEffect(()=>{
  getPermission()
  checkLocation()
  reverseGeo_().then(res=>{
  console.log("🚀 ~ file: SocarZoneScreen.tsx ~ line 72 ~ useEffect ~ res", res)
    
  })
},[])

    return (
      <View style={{alignItems: 'center', justifyContent: 'center',height:SCREEN_HEIGHT}}>
        <NaverMapView
      scaleBar={false}
      zoomControl={false}
      showsMyLocationButton={false}
      onMapClick={() => {
        console.log('On Map Click');
      }}
      onTouch={() => {
        console.log('On Touch Map');
      }}
      onCameraChange={(e)=>{
        console.log('onCameraChange',e);
        setMark({latitude:e.latitude,longitude:e.longitude})
        try {
          reverseGeo_({coords:e.longitude+','+e.latitude}).then(res=>{
            console.log("🚀 ~ file: SocarZoneScreen.tsx ~ line 93 ~ SocarZoneScree ~ res", res)
              if(res?.results){
                const dong = res?.results[0].region.area3.name
                const land = `${res?.results[0].land.number1}-${res?.results[0].land.number2}`
                setAddKor(dong+' '+land)
              }
            })
        } catch (error) {
        console.log("🚀 ~ file: SocarZoneScreen.tsx ~ line 103 ~ SocarZoneScree ~ error", error)
          
        }
       
      }}
      rotateGesturesEnabled={false}
      style={{ width: SCREEN_WIDTH,flex:1 }}
      center={{ ...P0, zoom: 15 }}>
        <Marker  caption={{ text: '',color:'#fff',offset:-70,haloColor:Colors.Dim06 }} coordinate={mark} />
    </NaverMapView>
       <TouchableOpacity style={[styles.shadow,{borderRadius:8,borderColor:'#FAFAFA',backgroundColor:'#fff',padding:20, position:'absolute',top:normalize(15), left:10,right:0,width:SCREEN_WIDTH-20,alignItems:'center'}]}>
<View style={{flexDirection:'row',alignItems:'center'}}>
<MaterialCommunityIcons size={16} name={'record-circle'} color={Colors.Main}/>
<WText style={{fontSize:16,marginLeft:8}}>{addKor}</WText>
</View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.shadow,{borderRadius:8,borderColor:'#FAFAFA',backgroundColor:'#fff',padding:20, position:'absolute',bottom:insets.bottom+normalize(100), left:10,right:0,width:SCREEN_WIDTH-20,flexDirection:'row',alignItems:'center'}]}>
<AntDesign size={20} name={'clockcircleo'} color={Colors.Main}/>
<WText m style={{fontSize:16,marginLeft:12,flex:1}}>이용시간 설정하기</WText>
<WText style={{color:'#999'}}>오늘 19:30 ~ 23:30</WText>
        </TouchableOpacity>
      </View>
    );
  }
export default SocarZoneScree
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