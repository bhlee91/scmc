import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleSheet, 
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { login } from '../api/auth';
import store, { useAppDispatch } from '../store';
import { persistor } from '../../App';
import userSlice from '../slices/user';

function LogIn({navigation}) {
  const [carno, setCarno] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const carnoRef = useRef();
  const passwordRef = useRef();
  const dispatch = useAppDispatch();

  useEffect(() => {
    persistor.purge();
    AsyncStorage.removeItem('userData');
  })

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

  const onLoginClick = () => {
    const info = {
      carNumber: carno,
      password: password
    }
    if (!carno || !carno.trim()) {
      return Alert.alert('알림', '차량번호를 입력해주세요.');
    }
    else if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    } else {
      setLoading(true)
      login(info)
      .then(res => {
        console.log(res.data)
        if(res.data !== null ){ 
         dispatch(
          userSlice.actions.SET_LOGIN({
            truckownerUid: res.data.truckownerUid,
            truckownerName: res.data.truckownerName,
            phoneNumber: res.data.phoneNumber,
            carNumber: res.data.carNumber,
            isLoggedIn : true,
            accessToken : res.data.token.accessToken,
            refreshToken: res.data.token.refreshToken
          })
        ) 
         AsyncStorage.setItem('userData', JSON.stringify({
          isLoggedIn: true,
          accessToken: res.data.token.accessToken,
          refreshToken: res.data.token.refreshToken
         }))
         navigation.navigate("Main")
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

  }

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
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={onLoginClick}>
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
