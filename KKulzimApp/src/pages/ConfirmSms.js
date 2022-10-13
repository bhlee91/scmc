import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import { getAuth, getAuthNumber } from '../api/truckowner';
import store, { useAppDispatch } from '../store';
import userSlice from '../slices/user';

function ConfirmSms({navigation}) {
  const [authno, setAuthno] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('')
  const dispatch = useAppDispatch();

  const authSms = () => {
    if(phoneNumber === '' || phoneNumber === undefined || phoneNumber === null){
      Alert.alert('휴대폰 번호를 입력해 주세요.')
    } else if(phoneNumber.length !== 11 ) {
      Alert.alert('입력하신 휴대폰 번호를 확인해 주세요.')  
    } else {
      Alert.alert('문자가 전송되었습니다.')  
      getAuthNumber(phoneNumber)
    }
  };

  const confirmAuthSms = () => {
    getAuth(phoneNumber, authno)
    .then(res => {
      console.log(res)
      if(res.data !== "" ){
        dispatch(
          userSlice.actions.SET_CHPWD({
            phoneNumber : phoneNumber,
            isLoggedIn : false
          })
        )
        Alert.alert('인증되었습니다.')
        toConfirmPassword()
      } else {
        Alert.alert('인증번호를 다시 확인해 주세요.')
      }
    })
    .catch(err => {
      console.log(err)
      Alert.alert('알수 없는 오류중에 있습니다. 다시 시도해주세요.')
    }) 
  };
  const onChangeHpnumber = useCallback(text => {
    setPhoneNumber(text.trim());
  }, []);

  const onChangeAuth = useCallback(text => {
    setAuthno(text.trim());
  }, []);

  const toConfirmPassword = useCallback(() => {
    navigation.navigate('ResetPassword');
  }, [navigation]);

  // const onSubmit = useCallback(async () => {
  //   if (!authno || !authno.trim()) {
  //     return Alert.alert('알림', '인증번호를 입력해주세요.');
  //   }

    // try {
    //   setLoading(true);
    //   const response = await axios.post(`${Config.API_URL}/login`, {
    //     carno,
    //     password,
    //   });
    //   console.log(response.data);
    //   Alert.alert('알림', '로그인 되었습니다.');
    //   dispatch(
    //     userSlice.actions.setUser({
    //       name: response.data.data.name,
    //       carno: response.data.data.carno,
    //       accessToken: response.data.data.accessToken, //유효기간이 있는 토근 10, 5분 등, 짧을 수록 보안에......좋음, Redux에만 저장
    //       refreshToken: response.data.data.refreshToken, //유효기간 1일 30일 1년 ==> accessToken보다 크다 EncryptedStorage에 저장
    //     }),
    //   );
    //   await EncryptedStorage.setItem(
    //     'refreshToken',
    //     response.data.data.refreshToken,
    //   );
    // } catch (error) {
    //   const errorResponse = error.response;
    //   if (errorResponse) {
    //     Alert.alert('알림', errorResponse.data.message);
    //   }
    // } finally {
    //   setLoading(false);
    // }
    //  }, [loading, authno]);

  return (
    <View style={styles.mainView}>
      <View style={styles.confirmTextContainer}>
        <Text style={styles.confirmText}>문자인증</Text>
        <Text style={styles.confirmTextS}>
          문자 인증을 통한 본인 인증 과정입니다.
        </Text>
        <Text style={styles.confirmTextS}>
          문자로 전달 받은 인증번호를 입력하여 주세요
        </Text>
      </View>
      <DismissKeyboardView behavior style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
          <View style={styles.box2}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={onChangeHpnumber}
                    Outlined
                    placeholder="휴대폰번호"
                    placeholderTextColor="#666"
                    value={phoneNumber}
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                <Pressable
                  style={styles.Button}
                  onPress={authSms}>
                  <Text style={styles.ButtonText}>문자전송</Text>
                </Pressable>
            </View>
          </Card.Content>
          <Card.Content>
            <View>
              
              <View style={styles.box2}>
                <TextInput
                  style={styles.textInput}
                  placeholder="인증번호"
                  onChangeText={onChangeAuth}
                  value={authno}
                  clearButtonMode="while-editing"
                />
                <Pressable
                  style={styles.Button}
                  onPress={confirmAuthSms}>
                  <Text style={styles.ButtonText}>확인</Text>
                </Pressable>
              </View>
            </View>
          </Card.Content>
        </Card>
      </DismissKeyboardView>
    </View>
  );
}
export default ConfirmSms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  text: {
    color: '#545454',
    fontWeight: '700',
    fontSize: 15,
  },

  confirmTextContainer: {
    marginTop: '20%',
    marginLeft: '5%',
    marginBottom: 20,
  },
  confirmText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 29.3,
    marginBottom: 16,
  },
  confirmTextS: {
    fontSize: 12,
    fontWeight: '300',
    color: '#000000',
    marginTop: 2,
  },
  box2: {
    flexDirection: 'row',
    height: 45,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: '60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
    marginLeft: 5,
    fontSize: 11,
  },

  Button: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },

  ButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});
