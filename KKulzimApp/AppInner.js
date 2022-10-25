import React, { useEffect } from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyInfo from './src/pages/MyInfo';
import LogIn from './src/pages/LogIn';
import SignUp from './src/pages/SignUp';
import MyLocation from './src/pages/MyLocation';
import RecomShipInfo from './src/pages/RecomShipInfo';
import ShipInfo from './src/pages/ShipInfo';
import Home from './src/pages/Home';
// import {RootState} from './src/store/reducer';
// import useSocket from './src/hooks/useSocket';
// import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
// import userSlice from './src/slices/user';
// import Config from 'react-native-config';
import {Alert} from 'react-native';
// import orderSlice from './src/slices/order';
// import usePermissions from './src/hooks/usePermissions';
// import MyLocation from './pages/MyLocation';
import {BottomNavigation, Text, Button} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, Image, StyleSheet} from 'react-native';
import ConfirmSms from './src/pages/ConfirmSms';
import ResetPassword from './src/pages/ResetPassword';
// import Cardiv from './src/pages/Cardiv';
import TrTerms from './src/pages/TrTerms';
import UsTerms from './src/pages/UsTerms';
import PrTerms from './src/pages/PrTerms';
import ConfirmPwd from './src/pages/ConfirmPwd';
import MyReg from './src/pages/MyReg';
import PaymentMgt from './src/pages/PaymentMgt';
import DeliveryHistory from './src/pages/DeliveryHistory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Certification from './src/pages/Certification';
import CustomCenter from './src/pages/CustomCenter';
import CargoReg from './src/pages/CargoReg';
import CargoDetail from './src/pages/CargoDetail';
import RecomDetail from './src/pages/RecomDetail';
import usePermissions from './src/hooks/usePermissions';
import Address from "./src/common/Address";
import NMap from './src/common/NMap';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { useAppDispatch } from './src/store';
import userSlice from './src/slices/user';
import MapViewScreen from './src/common/MapViewScreen';
import { getTruckOwnerCurrentLocation } from "api/truck/index";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 아래 URL 참고 하여 Param 등 참고 하삼
// https://reactnavigation.org/docs/nesting-navigators

function Main() {
  return (
    <Tab.Navigator
      style={styles.tabbar}
      screenOptions={({route}) => ({
        cardStyle: {backgroundColor: '#ffffff'},
        headerStyle: {
          height: 60,
          backgroundColor: '#FFD740',
          borderBottomWidth: 1,
          borderBottomColor: '#FFD740',
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: true,
        headerBackTitle: 'Prev',
        headerTitleStyle: {fontsize: 24},
        headerTintColor: '#ffffff',
        // headerLeft: () => (
        //   <Icon name="angle-left" size={30} style={{marginLeft: 15}} />
        // ),

        // headerShown: false,

        tabBarIcon: ({focused, color, size}) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused
              ? require('assets/images/home.png')
              : require('assets/images/outline_home.png');
          } else if (route.name === 'CargoReg') {
            iconName = focused
              ? require('assets/images/register.png')
              : require('assets/images/outline_register.png');
          } else if (route.name === 'RecomShipInfo') {
            iconName = focused
              ? require('assets/images/recommend.png')
              : require('assets/images/outline_recommend.png');
          } else if (route.name === 'MyInfo') {
            iconName = focused
              ? require('assets/images/my.png')
              : require('assets/images/outline_my.png');
          }

          return <Image source={iconName} style={{ width: 25, height: 25 }} />;
        },
        tabBarActiveTintColor: '#e91e63',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "홈",
          tabBarLabel: "Home",
          unmountOnBlur: true,
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="CargoReg"
        component={CargoReg}
        options={{
          title: "화물등록",
          tabBarLabel: "화물등록",
        }}
      />
      <Tab.Screen
        name="RecomShipInfo"
        component={RecomShipInfo}
        options={{
          title: "추천화물",
          tabBarLabel: "추천화물",
        }}
      />
      <Tab.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          title: "마이페이지",
          tabBarLabel: "마이페이지",
        }}
      />
    </Tab.Navigator>
  );
}

function AppInner({navigation}) {
  const dispatch = useAppDispatch()
  // useSelector은 Porvider 내부에서만 사용 가능 하여 AppInner로 분리 하여 사용
  const isFocused = useIsFocused();
  // const isLoggedIn = store.getState().user.isLoggedIn
  const isLoggedIn = true

  // 오산시청 좌표
  const osanPosition = {
    latitude: 37.1498870,
    longitude: 127.0774620,
  }

  useEffect(() => {
    console.log(isLoggedIn)
  },[isFocused])

  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  const getCurrentLocation = async () => {
    const options = { 
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000
    }

    await getPosition(options)
    .then(response => {
      // 현위치(탄천상로 164)
      // const params = {
      //   lat: response.coords.latitude,
      //   lon: response.coords.longitude,
      // }

      const params = {
        lat: osanPosition.latitude,
        lon: osanPosition.longitude,
      }

      getTruckOwnerCurrentLocation(params)
      .then(res => {
        dispatch(
          userSlice.actions.SET_LOCATION({
            latitude: params.lat,
            longitude: params.lon,
            addr: res.data.address?.address_name
          })
        )
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <Stack.Navigator
      //initialRouteName="Main"
      screenOptions={{
        cardStyle: {backgroundColor: '#ffffff'},
        headerStyle: {
          height: 110,
          backgroundColor: '#FFD740',
          borderBottomWidth: 1,
          borderBottomColor: '#FFD740',
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: true,
        headerBackTitle: 'Prev',
        headerTitleStyle: {fontsize: 24},
        headerTintColor: '#ffffff',
      }}>
      <Stack.Group screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
          <Stack.Screen
            name="Address"
            component={Address}
            options={({ route }) => ({ 
              headerShown: true, 
              title: route.params.d === "load" ? "상차지 주소 입력" : "하차지 주소 입력" 
            })}
          />
          <Stack.Screen
            name="NMap"
            component={NMap}
            options={{ 
              headerShown: true,
              title: "지도"
            }}
          />
          <Stack.Screen
            name="MapViewScreen"
            component={MapViewScreen}
            options={{ 
              headerShown: true,
              title: "지도(예시)"
            }}
          />
        </>
      ) : (
        // Auth screens
        <>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ title: "로그인", unmountOnBlur: true }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "회원가입"}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: true, unmountOnBlur: true }}
          />
          <Stack.Screen
            name="Address"
            component={Address}
            options={({ route }) => ({ 
              headerShown: true, 
              title: route.params.d === "load" ? "상차지 주소 입력" : "하차지 주소 입력" 
            })}
          />
          <Stack.Screen
            name="NMap"
            component={NMap}
            options={{ 
              headerShown: true,
              title: "지도"
            }}
          />
          <Stack.Screen
            name="MapViewScreen"
            component={MapViewScreen}
            options={{ 
              headerShown: true,
              title: "지도(예시)"
            }}
          />
        </>
      )}
      </Stack.Group>
      {/* Common modal screens */}
      <Stack.Group screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="ConfirmSms"
          component={ConfirmSms}
          options={{title: '문자인증'}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{title: '비밀번호재설정'}}
        />
        <Stack.Screen
          name="ConfirmPwd"
          component={ConfirmPwd}
          options={{title: '비밀번호확인'}}
        />
        <Stack.Screen
          name="MyReg"
          component={MyReg}
          options={{title: '나의 등록정보'}}
        />
        <Stack.Screen
          name="PaymentMgt"
          component={PaymentMgt}
          options={{title: '결제관리'}}
        />
        <Stack.Screen
          name="DeliveryHistory"
          component={DeliveryHistory}
          options={{title: '나의 운송이력'}}
        />
        <Stack.Screen
          name="Certification"
          component={Certification}
          options={{title: '증빙발급'}}
        />
        <Stack.Screen
          name="CustomCenter"
          component={CustomCenter}
          options={{title: '고객센터'}}
        />
        <Stack.Screen
          name="PrTerms"
          component={PrTerms}
          options={{title: '개인정보보호방침'}}
        />
        <Stack.Screen
          name="TrTerms"
          component={TrTerms}
          options={{title: '운송약관'}}
        />
        <Stack.Screen
          name="UsTerms"
          component={UsTerms}
          options={{title: '이용약관'}}
        />

        <Stack.Screen
          name="CargoDetail"
          component={CargoDetail}
          options={{title: '운송상세정보'}}
        />
        <Stack.Screen
          name="RecomDetail"
          component={RecomDetail}
          options={{title: '추천상세정보'}}
        />
      </Stack.Group>
    </Stack.Navigator>

  );
}

export default AppInner;

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#B3E5FC',
    color: '#B3E5FC',
  },
});
