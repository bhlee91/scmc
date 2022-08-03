import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect, useState} from 'react';
import MyInfo from './src/pages/MyInfo';
import OwnerCarinfo from './src/pages/OwnerCarinfo';
import TraceDelivery from './src/pages/TraceDelivery';
import ShipInfo from './src/pages/ShipInfo';
import ShipReg from './src/pages/ShipReg';
import RecommendShip from './src/pages/RecommendShip';
import LogIn from './src/pages/LogIn';
import SignUp from './src/pages/SignUp';
import {Provider, useSelector} from 'react-redux';
import store, {useAppDispatch} from './src/store';
import {RootState} from './src/store/reducer';
import useSocket from './src/hooks/useSocket';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import userSlice from './src/slices/user';
import Config from 'react-native-config';
import {Alert} from 'react-native';
import orderSlice from './src/slices/order';
import usePermissions from './src/hooks/usePermissions';
import NowMap from './src/pages/NowMap';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type LoggedInParamList = {
  OwnerCarinfo: undefined;
  ShipInfo: undefined;
  Settings: undefined;
  TraceDelivery: undefined;
  ShipReg: undefined;
  RecommendShip: undefined;
  MyInfo: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  NowMap: undefined;
  LogIn: undefined;
  SignUp: undefined;
};
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppInner() {
  // useSelector은 Porvider 내부에서만 사용 가능 하여 AppInner로 분리 하여 사용
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log('isLoggedIn', isLoggedIn);

  const [socket, disconnect] = useSocket();

  const dispatch = useAppDispatch();

  usePermissions();

  // 키,값

  useEffect(() => {
    const callback = (data: any) => {
      console.log(data);
      dispatch(orderSlice.actions.addOrder(data));
    };
    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');
      socket.on('order', callback);
    }
    return () => {
      if (socket) {
        socket.off('order', callback);
      }
    };
  }, [dispatch, isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
      SplashScreen.hide();
    }
  }, [isLoggedIn, disconnect]);

  // 중복 된 상황이 계속 발생 시 Axios interceptors 를 사용
  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originalRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            // token refresh 요청
            const {data} = await axios.post(
              `${Config.API_URL}/refreshToken`, // token refresh api
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );
            // 새로운 토큰 저장
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);
  // 앱 껏다 켜돟 로그인 유지 하도록********
  // Refresh 토큰 확인 하여 서버에 보내 토근 확인 하기
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          SplashScreen.hide();
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken,
          }),
        );
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        SplashScreen.hide();
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  return isLoggedIn ? (
    <Tab.Navigator>
      <Tab.Screen
        name="내위치"
        component={NowMap}
        options={{
          title: '내위치',

          tabBarIcon: () => (
            <FontAwesome5Icon name="search-location" size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="화물등록"
        component={ShipReg}
        options={{
          title: '화물등록',
          tabBarIcon: () => <FontAwesome5 name="registered" size={20} />,
        }}
      />
      <Tab.Screen
        name="추천화물"
        component={RecommendShip}
        options={{
          title: '추천화물',
          tabBarIcon: () => <FontAwesome5 name="truck" size={20} />,
        }}
      />

      <Tab.Screen
        name="TraceDelivery"
        component={TraceDelivery}
        options={{
          title: '화물추적',
          tabBarIcon: () => <FontAwesome5 name="truck" size={20} />,
        }}
      />

      <Tab.Screen
        name="내정보"
        component={MyInfo}
        options={{
          title: '내 정보',
          unmountOnBlur: true, //탭에서 빠져 나갈때 Unmounted, 갱신 필요시
          tabBarIcon: () => <FontAwesome5 name="user-circle" size={20} />,
        }}
      />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          title: '로그인',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: '회원가입'}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
