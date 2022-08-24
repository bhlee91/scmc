import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
    Dimensions
    , Text
    , View
    , TextInput
    , StyleSheet
    , Button,
    Alert
  } from 'react-native';
import NaverMapView, {Marker, Path} from 'react-native-nmap';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type IngScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'TraceDelivery', 'NowMap'
>;

function NowMap({navigation}: IngScreenProps) {
  console.dir(navigation);
  //const deliveries = useSelector((state: RootState) => state.order.deliveries);
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<TextInput | null>(null);

  const onChangeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, [searchText]);


  useEffect(() => {
    Geolocation.getCurrentPosition(
      //watchPosition == 이동 위치 표시
      info => {
        //성공
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error, //실패
      {
        // 옵션
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter: 10, //10M
      },
    );
  }, []);


  const searchAddr = async () => {
    
    try{
      console.log('fhjkdlsajgklajl;f');
      const res = await axios  
        .get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`,{
          
        headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json",
            "X-NCP-APIGW-API-KEY-ID" : "205xj64cr0",
            "X-NCP-APIGW-API-KEY" : "fKCrRKmTNrI3JWOYjzOITzkWpqb97mO3XutBDa9n"
          
        },
        params :{
          query: searchText
        }, 
          
        })
        .then((res) => {
          const result = res.data;
          return result;
        })
        .then((result) => {
          setMyPosition({
            longitude : parseFloat(result.addresses[0].x),
            latitude : parseFloat(result.addresses[0].y)
          })
        });
    }catch(error){
      console.log(error)
    }
    
  };

  // if (!delivries?.[0]) {
  //   return (
  //     <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
  //       <Text>화물 배달을</Text>
  //     </View>
  //   );
  // }

  if (!myPosition || !myPosition.latitude) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>내 위치를 로딩 중입니다. 권한을 허용했는지 확인해주세요.</Text>
      </View>
    );
  }

  //const {start, end} = deliveries?.[0];

  return (
    <View>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.textInput}
                    placeholder='주소 및 장소를 입력해주세요.'
                    onChangeText={onChangeSearchText}
                    value={searchText}
                    ref={searchRef}/>
        <Button title="검색" onPress={searchAddr}></Button>
      </View>
      <View
        style={{
          width: Dimensions.get('window').width, //화면 꽉 차게 하라는 뜻
          height: Dimensions.get('window').height,
        }}>
        
        <NaverMapView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '100%'}}
          zoomControl={true}
          center={{
            zoom: 10,
            tilt: 50,
            latitude: (myPosition.latitude + myPosition.latitude) / 2,
            longitude: (myPosition.longitude + myPosition.longitude) / 2,
          }}
          
          >
          {myPosition?.latitude && (
            <Marker
              coordinate={{
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}
              width={15}
              height={15}
              anchor={{x: 0.5, y: 0.5}}
              caption={{text: '내위치'}}
              image={require('../assets/red-dot.png')}
            />
          )}
        </NaverMapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor:'white'},
  inputWrapper: {
    padding: 20
  }
});

export default NowMap;
