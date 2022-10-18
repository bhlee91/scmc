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
  Pressable,
  Image,
  ActivityIndicator,
  Platform,
  Linking,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

import {Appbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import store from '../store';

function MyInfo({navigation, props}) {
  const toResetPasswd = useCallback(() => {
    navigation.navigate('ResetPassword');
  }, [navigation]);

  const toConfirmPassword = useCallback(() => {
    navigation.navigate('ConfirmPwd');
  }, [navigation]);

  const toPaymentMgt = useCallback(() => {
    navigation.navigate('PaymentMgt');
  }, [navigation]);

  const toDeliveryHistory = useCallback(() => {
    navigation.navigate('DeliveryHistory');
  }, [navigation]);

  const toCertification = useCallback(() => {
    navigation.navigate('Certification');
  }, [navigation]);

  const toCustomCenter = useCallback(() => {
    navigation.navigate('CustomCenter');
  }, [navigation]);

  return (
    <View style={styles.mainView}>
      <View style={styles.buttonGroup}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.button}>
            <Pressable onPress={toConfirmPassword}>
              <Icon2 name="account" size={60} style={styles.icon}></Icon2>
              <Text style={styles.text}>나의 등록정보</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable onPress={toResetPasswd}>
              <Icon2
                name="form-textbox-password"
                size={60}
                style={styles.icon}></Icon2>
              <Text style={styles.text}>비밀번호변경</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable onPress={toPaymentMgt}>
              <Icon name="payment" size={60} style={styles.icon} />
              <Text style={styles.text}>결제관리</Text>
            </Pressable>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.button}>
            <Pressable onPress={toDeliveryHistory}>
              <Icon2 name="history" size={60} style={styles.icon}></Icon2>
              <Text style={styles.text}>나의운송이력</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable onPress={toCertification}>
              <Icon2 name="certificate" size={60} style={styles.icon}></Icon2>
              <Text style={styles.text}>증빙발급</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable onPress={toCustomCenter}>
              <Icon3
                name="customerservice"
                size={60}
                style={styles.icon}></Icon3>
              <Text style={styles.text}>고객센터</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
export default MyInfo;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonGroup: {
    height: 200,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flex: 1,
    height: 100,
    borderWidth: 0.5,
    borderColor: '#B0BEC5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    // color: '#536DFE',
    fontSize: 13,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#4527A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
