import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { confirmAccount } from '../api/truckowner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import store from '../store';

function ConfirmPwd({navigation}) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const carNumber = store.getState().user.carNumber;

  useEffect(() => {
    console.log(carNumber)
  },[])

  const onChangePasswd = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const toMyReg = useCallback(() => {
    navigation.navigate('MyReg');
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    } else {
      const info = {
        carNumber: carNumber,
        password: password
      }
      confirmAccount(info)
      .then(res => {
        if(res.status !== 200){
          Alert.alert('오류', '잘못된 비밀번호 입니다.');
        } else {
          Alert.alert('알림', `${res.data}`)
          toMyReg()
        }
        
      })
    }

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
  }, [loading, password]);

  return (
    <DismissKeyboardView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.pwdinfoTextContainer}>
          <Text style={styles.pwdinfoTextS}>
            차주님의 안전한 정보보호를 위해 비밀번호를 확인합니다.
          </Text>
        </View>

        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="비밀번호"
              onChangeText={onChangePasswd}
              value={password}
              textContentType="password"
              secureTextEntry
              clearButtonMode="while-editing"
              // ref={passwordRef}
              onSubmitEditing={onSubmit}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.Button]}
          onPress={onSubmit}>
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
}
export default ConfirmPwd;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFD740',
  },
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD740',
    // marginTop: StatusBar.currentHeight,
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },

  inputs: {
    height: 45,
    marginLeft: 14,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontsize: 13,
  },
  // icon: {
  //   width: 30,
  //   height: 30,
  // },
  // inputIcon: {
  //   marginLeft: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
    width: 290,
    borderRadius: 30,
  },

  confirmText: {
    color: 'white',
    fontWeight: '300',
  },

  pwdinfoTextContainer: {
    marginTop: '30%',
    color: '#FFFFFF',
    alignItems: 'center',
  },

  pwdinfoTextS: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 30,
  },

  Button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
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
