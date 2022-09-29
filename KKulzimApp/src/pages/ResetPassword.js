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

function ResetPassword({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onChangeConrirmPassword = useCallback(text => {
    setconfirmpassword(text.trim());
  }, []);

  const canGoNext = confirmpassword && password;

  const toLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    if (!password || !password.trim()) {
      return Alert.alert('알림', '새비밀번호를 입력해주세요.');
    }

    if (!confirmpassword || !confirmpassword.trim()) {
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
  }, [loading, confirmpassword, password]);

  return (
    <View style={styles.mainView}>
      <View style={styles.confirmTextContainer}>
        <Text style={styles.confirmText}>비벌번호 재설정</Text>
        {/* <Text style={styles.confirmTextS}>
          문자 인증을 통한 본인 인증 과정입니다.
        </Text>
        <Text style={styles.confirmTextS}>
          문자로 전달 받은 인증번호를 입력하여 주세요
        </Text> */}
      </View>
      <DismissKeyboardView behavior>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.box2}>
              <TextInput
                style={styles.textInput}
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
              />
            </View>
            <View style={styles.box2}>
              <TextInput
                style={styles.textInput}
                placeholder="새 비밀번호 (영문,숫자,특수문자)"
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
              />
            </View>
            <View style={styles.box2}>
              <TextInput
                style={styles.textInput}
                placeholder="새 비밀번호 확인(영문,숫자,특수문자)"
                placeholderTextColor="#666"
                importantForAutofill="yes"
                onChangeText={onChangeConrirmPassword}
                value={confirmpassword}
                autoComplete="password"
                textContentType="password"
                secureTextEntry
                returnKeyType="send"
                clearButtonMode="while-editing"
                // ref={passwordRef}
                onSubmitEditing={onSubmit}
              />
            </View>

            <View style={styles.buttonZone}>
              <Pressable style={styles.ButtonActive} onPress={onSubmit}>
                <Text style={styles.ButtonText}>확인</Text>
              </Pressable>
            </View>
          </Card.Content>
        </Card>
      </DismissKeyboardView>
    </View>
  );
}
export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  confirmTextContainer: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 29.3,
    marginBottom: 16,
  },

  textInput: {
    backgroundColor: '#FFFFFF',
    height: 45,
    width: '85%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
    marginLeft: 5,
    fontSize: 11,
  },

  Button: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455A64',
  },

  box2: {
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonZone: {
    height: 45,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  ButtonActive: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4527A0',
    width: '40%',
    borderRadius: 5,
  },
});
