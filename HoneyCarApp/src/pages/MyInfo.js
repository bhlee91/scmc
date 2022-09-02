import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import { useSelector } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import orderSlice from '../slices/order';
import FastImage from 'react-native-fast-image';

const MyInfo = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const money = useSelector((state) => state.user.money);
  const name = useSelector((state) => state.user.name);
  const completes = useSelector((state) => state.order.completes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getCompletes() {
      const response = await axios.get(
        `${Config.API_URL}/completes`,
        {
          headers: {authorization: `Bearer ${accessToken}`},
        },
      );
      console.log('completes', response.data);
      dispatch(orderSlice.actions.setCompletes(response.data.data));
    }
    getCompletes();
  }, [dispatch, accessToken]);

  useEffect(() => {
    // useEffect는 async를 사용 못하여 아래와 같이 함수를 만들어 줌
    async function getMoney() {
      const response = await axios.get( // 서버로 부터 데이타 받아올때 Type을 지정 (Data: number을 안 쓸 경우 Any)
        `${Config.API_URL}/showmethemoney`,
        {
          headers: {authorization: `Bearer ${accessToken}`},
        },
      );
      dispatch(userSlice.actions.setMoney(response.data.data));
    }
    getMoney();
  }, [accessToken, dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            athorization: `Bearer ${accessToken}`,
          },
        },
      );
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: '',
          email: '',
          accessToken: '',
        }),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = error.response;
      console.error(errorResponse);
    }
  }, [accessToken, dispatch]);

  // 가급적 아래 내용은 components로 빼라
  const renderItem = useCallback(({ item }) => {
    return (
      <FastImage
        source={{uri: `${Config.API_URL}/${item.image}`}}
        resizeMode="contain"
        style={{
          height: Dimensions.get('window').width / 3,
          width: Dimensions.get('window').width / 3,
        }}
      />
    );
  }, []);

  return (
    <View>
      <View style={styles.money}>
        <Text style={styles.moneyText}>
          {name}님의 수익금{' '}
          <Text style={{fontWeight: 'bold'}}>
            {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          원
        </Text>
      </View>

      <View>
        <FlatList
          data={completes}
          numColumns={3}
          keyExtractor={o => o.orderId}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={StyleSheet.compose(
            styles.loginButton,
            styles.loginButtonActive,
          )}
          onPress={onLogout}>
          <Text style={styles.loginButtonText}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  money: {
    padding: 20,
  },
  moneyText: {
    fontSize: 16,
  },
  buttonZone: {
    alignItems: 'center',
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MyInfo;
