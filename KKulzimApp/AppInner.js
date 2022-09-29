import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import MyInfo from './src/pages/MyInfo';
import LogIn from './src/pages/LogIn';
import SignUp from './src/pages/SignUp';
import MyLocation from './src/pages/MyLocation';
import RecomShipInfo from './src/pages/RecomShipInfo';
import ShipInfo from './src/pages/ShipInfo';
import TruckOwnerInfo from './src/pages/TruckOwnerInfo';
import Home from './src/pages/Home';
import {Provider, useSelector} from 'react-redux';
// import store, {useAppDispatch} from './src/store';
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

import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 아래 URL 참고 하여 Param 등 참고 하삼
// https://reactnavigation.org/docs/nesting-navigators

function Main() {
  return (
    <Tab.Navigator
      style={styles.tabbar}
      screenOptions={({route, navigation}) => ({
        cardStyle: {backgroundColor: '#ffffff'},
        headerStyle: {
          height: 60,
          backgroundColor: '#4527A0',
          borderBottomWidth: 1,
          borderBottomColor: '#99154E',
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: true,
        headerBackTitle: 'Prev',
        headerTitleStyle: {fontsize: 24},
        headerTintColor: '#ffffff',
        headerLeft: () => (
          <Icon name="angle-left" size={30} style={{marginLeft: 15}} />
        ),

        // headerShown: false,

        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? require('./src/assets/images/home.png')
              : require('./src/assets/images/outline_home.png');
          } else if (route.name === '화물등록') {
            iconName = focused
              ? require('./src/assets/images/register.png')
              : require('./src/assets/images/outline_register.png');
          } else if (route.name === '추천화물') {
            iconName = focused
              ? require('./src/assets/images/recommend.png')
              : require('./src/assets/images/outline_recommend.png');
          } else if (route.name === '마이페이지') {
            iconName = focused
              ? require('./src/assets/images/my.png')
              : require('./src/assets/images/outline_my.png');
          }

          return <Image source={iconName} style={{width: 25, height: 25}} />;
        },
        tabBarActiveTintColor: '#e91e63',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="화물등록"
        component={CargoReg}
        options={{
          tabBarLabel: '화물등록',
        }}
      />
      <Tab.Screen
        name="추천화물"
        component={RecomShipInfo}
        options={{
          tabBarLabel: '추천화물',
        }}
      />

      <Tab.Screen
        name="마이페이지"
        component={MyInfo}
        options={{
          tabBarLabel: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
}

function AppInner({navigation}) {
  // useSelector은 Porvider 내부에서만 사용 가능 하여 AppInner로 분리 하여 사용
  //   const isLoggedIn = useSelector(state => !!state.user.email);
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  console.log('isLoggedIn', isLoggedIn);

  //   const [socket, disconnect] = useSocket();

  //   const dispatch = useAppDispatch();

  //   usePermissions();

  // 키,값

  //   useEffect(() => {
  //     const callback = (data) => {
  //       console.log(data);
  //       dispatch(orderSlice.actions.addOrder(data));
  //     };
  //     if (socket && isLoggedIn) {
  //       socket.emit('acceptOrder', 'hello');
  //       socket.on('order', callback);
  //     }
  //     return () => {
  //       if (socket) {
  //         socket.off('order', callback);
  //       }
  //     };
  //   }, [dispatch, isLoggedIn, socket]);

  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       console.log('!isLoggedIn', !isLoggedIn);
  //       disconnect();
  //     }
  //   }, [isLoggedIn, disconnect]);
  // 중복 된 상황이 계속 발생 시 Axios interceptors 를 사용
  //   useEffect(() => {
  //     axios.interceptors.response.use(
  //       response => {
  //         return response;
  //       },
  //       async error => {
  //         const {
  //           config,
  //           response: {status},
  //         } = error;
  //         if (status === 419) {
  //           if (error.response.data.code === 'expired') {
  //             const originalRequest = config;
  //             const refreshToken = await EncryptedStorage.getItem('refreshToken');
  //             // token refresh 요청
  //             const {data} = await axios.post(
  //               `${Config.API_URL}/refreshToken`, // token refresh api
  //               {},
  //               {headers: {authorization: `Bearer ${refreshToken}`}},
  //             );
  //             // 새로운 토큰 저장
  //             dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
  //             originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`; //엣날 요청 보냈던 것은 새로은 토근으로 갱신
  //             // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
  //             return axios(originalRequest);
  //           }
  //         }
  //         return Promise.reject(error);
  //       },
  //     );
  //   }, [dispatch]);

  // 앱 껏다 켜돟 로그인 유지 하도록********
  // Refresh 토큰 확인 하여 서버에 보내 토근 확인 하기
  //   useEffect(() => {
  //     const getTokenAndRefresh = async () => {
  //       try {
  //         const token = await EncryptedStorage.getItem('refreshToken');
  //         if (!token) {
  //           return;
  //         }
  //         const response = await axios.post(
  //           `${Config.API_URL}/refreshToken`,
  //           {},
  //           {
  //             headers: {
  //               authorization: `Bearer ${token}`,
  //             },
  //           },
  //         );
  //         dispatch(
  //           userSlice.actions.setUser({
  //             name: response.data.data.name,
  //             email: response.data.data.email,
  //             accessToken: response.data.data.accessToken,
  //           }),
  //         );
  //       } catch (error) {
  //         console.error(error);
  //         if ((error as AxiosError).response?.data.code === 'expired') {
  //           Alert.alert('알림', '다시 로그인 해주세요.');
  //         }
  //       } finally {
  //         // 스플래시 스크린 없애기
  //       }
  //     };
  //     getTokenAndRefresh();
  //   }, [dispatch]);

  return (
    // <Tab.Navigator
    //   style={styles.tabbar}
    //   screenOptions={({route}) => ({
    //     tabBarIcon: ({focused, color, size}) => {
    //       let iconName;
    //       if (route.name === 'Home') {
    //         iconName = focused
    //           ? require('./src/assets/images/home.png')
    //           : require('./src/assets/images/outline_home.png');
    //       } else if (route.name === '화물등록') {
    //         iconName = focused
    //           ? require('./src/assets/images/register.png')
    //           : require('./src/assets/images/outline_register.png');
    //       } else if (route.name === '추천화물') {
    //         iconName = focused
    //           ? require('./src/assets/images/recommend.png')
    //           : require('./src/assets/images/outline_recommend.png');
    //       } else if (route.name === '마이페이지') {
    //         iconName = focused
    //           ? require('./src/assets/images/my.png')
    //           : require('./src/assets/images/outline_my.png');
    //       }

    //       return <Image source={iconName} style={{width: 25, height: 25}} />;
    //     },
    //     tabBarActiveTintColor: '#e91e63',
    //   })}>
    //   <Tab.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       tabBarLabel: 'Home',
    //     }}
    //   />
    //   <Tab.Screen
    //     name="화물등록"
    //     component={ShipInfo}
    //     options={{
    //       tabBarLabel: '화물등록',
    //     }}
    //   />
    //   <Tab.Screen
    //     name="추천화물"
    //     component={RecomShipInfo}
    //     options={{
    //       tabBarLabel: '추천화물',
    //     }}
    //   />

    //   <Tab.Screen
    //     name="마이페이지"
    //     component={MyInfo}
    //     options={{
    //       tabBarLabel: '마이페이지',
    //     }}
    //   />
    // </Tab.Navigator>

    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        cardStyle: {backgroundColor: '#ffffff'},
        headerStyle: {
          height: 110,
          backgroundColor: '#4527A0',
          borderBottomWidth: 1,
          borderBottomColor: '#99154E',
        },
        headerTitleAlign: 'center',
        headerBackTitleVisible: true,
        headerBackTitle: 'Prev',
        headerTitleStyle: {fontsize: 24},
        headerTintColor: '#ffffff',
      }}>
      {isLoggedIn ? (
        // Screens for logged in users
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Main"
            component={Main}
            // options={{headerShown: false}}
          />
        </Stack.Group>
      ) : (
        // Auth screens
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Group>
      )}
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
