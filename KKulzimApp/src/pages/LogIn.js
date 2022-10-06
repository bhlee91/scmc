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
import {Button, Card, Title, Divider, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function LogIn({navigation}) {
  const [carno, setCarno] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const carnoRef = useRef();
  const passwordRef = useRef();

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onChangeCarno = useCallback(text => {
    setCarno(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const canGoNext = carno && password;

  const toForgotPassword = useCallback(() => {
    navigation.navigate('ConfirmSms');
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    if (!carno || !carno.trim()) {
      return Alert.alert('알림', '차량번호를 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
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
  }, [loading, carno, password]);

  return (
    <View style={styles.container}>
      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>안녕하세요? 꿀짐 입니다.</Text>

        <Text style={styles.signInTextS}>
          서비스 이용을 위해 로그인 해주세요.
        </Text>
      </View>
      <DismissKeyboardView behavior>
        <View style={styles.inputContainer}>
          <Icon
            style={[styles.icon, styles.inputIcon]}
            name="truck"
            color="black"
            size={20}
          />

          <TextInput
            style={styles.textInput}
            onChangeText={onChangeCarno}
            placeholder="차량번호"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            // autoComplete="carno"
            value={carno}
            returnKeyType="next"
            nderlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            ref={carnoRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            style={[styles.icon, styles.inputIcon]}
            name="form-textbox-password"
            color="black"
            size={20}
          />

          <TextInput
            style={styles.inputs}
            placeholder="비밀번호"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangePassword}
            value={password}
            autoComplete="password"
            textContentType="password"
            secureTextEntry={true}
            returnKeyType="send"
            clearButtonMode="while-editing"
            underlineColorAndroid="transparent"
            ref={passwordRef}
            onSubmitEditing={onSubmit}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={onSubmit}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        <View style={styles.otherButtonContainer}>
          <Pressable onPress={toForgotPassword}>
            <Text style={styles.otherButtonText}>비밀번호 재설정 </Text>
          </Pressable>
          <Text style={styles.otherButtonText}>|</Text>

          <Pressable onPress={toSignUp}>
            <Text style={styles.otherButtonText}> 회원가입하기</Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </View>
  );
}
export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD740',
    // marginTop: StatusBar.currentHeight,
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
    // marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
  },
  inputIcon: {
    marginLeft: 15,
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
  loginButton: {
    backgroundColor: '#000000',
  },

  loginText: {
    color: 'white',
    fontWeight: '300',
  },

  otherButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  otherButtonText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#FFFFFF',
  },

  signInTextContainer: {
    marginTop: '30%',
    color: '#FFFFFF',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 29.3,
  },
  signInTextS: {
    fontSize: 12,
    fontWeight: '300',
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 50,
  },
});
