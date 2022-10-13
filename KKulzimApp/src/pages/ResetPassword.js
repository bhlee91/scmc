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
import store from '../../src/store';
import { changePassword } from '../api/truckowner';

function ResetPassword({navigation}) {
  const phoneNumber = store.getState().user.phoneNumber
  const [newPassword, setnewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeNewPassword = useCallback(text => {
    setnewPassword(text.trim());
  }, []);
  const onChangeConrirmNewPassword = useCallback(text => {
    setconfirmNewPassword(text.trim());
  }, []);

  // const canGoNext = confirmpassword1 && password;

  const onClickChpwd = () =>{
    const info = {
      phoneNumber : phoneNumber,
      password : newPassword
    }
    const regPression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    if(!regPression.test(newPassword)) {
      Alert.alert('영문,숫자,특수문자를 포함한 8자리 이상을 입력해 주세요')
    } else if (confirmNewPassword !== newPassword){
      Alert.alert('비밀번호를 다시 확인해주세요.')
    } else {
      changePassword(info)
      .then(res => {
        if(res.data !== null || res.data !== ""){
          Alert.alert(`${res.data}`)
          navigation.navigate('LogIn');
        } else {
          Alert.alert('알수 없는 오류중에 있습니다. 다시 시도해 주세요.')
        }
      })
      .catch(err =>{
        console.log(err)
      })
    }
  }

  const toLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

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
            placeholder="새 비밀번호"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangeNewPassword}
            value={newPassword}
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
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
            placeholder="새 비밀번호 확인"
            placeholderTextColor="#666"
            importantForAutofill="yes"
            onChangeText={onChangeConrirmNewPassword}
            value={confirmNewPassword}
            // autoComplete="password"
            textContentType="password"
            secureTextEntry
            returnKeyType="send"
            clearButtonMode="while-editing"
            // ref={passwordRef}
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
          onPress={onClickChpwd}>
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
