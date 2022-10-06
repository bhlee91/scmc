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
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ResetPassword({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmpassword1, setconfirmpassword1] = useState('');
  const [confirmpassword2, setconfirmpassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onChangeConrirmPassword1 = useCallback(text => {
    setconfirmpassword1(text.trim());
  }, []);
  const onChangeConrirmPassword2 = useCallback(text => {
    setconfirmpassword2(text.trim());
  }, []);

  // const canGoNext = confirmpassword1 && password;

  const toLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    if (!password || !password.trim()) {
      return Alert.alert('알림', '현재비밀번호를 입력해주세요.');
    }

    if (!confirmpassword1 || !confirmpassword1.trim()) {
      return Alert.alert('알림', '새비밀번호 확인을 입력해주세요.');
    }

    if (!confirmpassword2 || !confirmpassword2.trim()) {
      return Alert.alert('알림', '새비밀번호 확인을 입력해주세요.');
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
  }, [loading, confirmpassword1, confirmpassword2, password]);

  return (
    <DismissKeyboardView style={styles.maincontainer}>
      <View style={styles.container}>
        <View style={styles.resetinfoTextContainer}>
          <Text style={styles.resetinfoTextS}>
            영문,숫자,특수문자를 포함한 8자리 이상을 입력해 주세요
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="현재 비밀번호"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangePassword}
            value={password}
            autoComplete="password"
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            // ref={passwordRef}
            onSubmitEditing={onSubmit}
            underlineColorAndroid="transparent"
          />
          <Icon
            style={[styles.icon, styles.inputIcon]}
            name="eye"
            color="black"
            size={20}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="새 비밀번호"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangeConrirmPassword1}
            value={confirmpassword1}
            // autoComplete="password"
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            // ref={passwordRef}
            onSubmitEditing={onSubmit}
          />
          <Icon
            style={[styles.icon, styles.inputIcon]}
            name="eye"
            color="black"
            size={20}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="새 비밀번호 확인"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangeConrirmPassword2}
            value={confirmpassword2}
            // autoComplete="password"
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            // ref={passwordRef}
            onSubmitEditing={onSubmit}
          />
          <Icon
            style={[styles.icon, styles.inputIcon]}
            name="eye"
            color="black"
            size={20}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.confirmButton]}
          onPress={onSubmit}>
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboardView>
  );
}
export default ResetPassword;

//
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#FFD740',

    // marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD740',

    // marginTop: StatusBar.currentHeight,
  },
  subcontainer: {
    // flexDirection: 'row',
    marginTop: 60,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    fontSize: 12,
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  confirmButton: {
    backgroundColor: '#000000',
  },

  confirmText: {
    color: 'white',
    fontWeight: '300',
  },

  resetinfoTextContainer: {
    marginTop: '20%',
    color: '#FFFFFF',
    alignItems: 'center',
  },
  resetinfoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 29.3,
  },
  resetinfoTextS: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 30,
  },
});
