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

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

function CustomCenter({navigation, props}) {
  const toTrTems = useCallback(() => {
    navigation.navigate('TrTerms');
  }, [navigation]);

  const toPrTerms = useCallback(() => {
    navigation.navigate('PrTerms');
  }, [navigation]);

  const toUsTerms = useCallback(() => {
    navigation.navigate('UsTerms');
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
            <Pressable onPress={() => Linking.openURL(`tel:01012341234`)}>
              <Icon2 name="phone-classic" size={60} style={styles.icon}></Icon2>
              <Text style={styles.text}> 전화하기</Text>
              <Text style={styles.text}>010-1234-1234</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable onPress={toTrTems}>
              <Icon2 name="truck-outline" size={60} style={styles.icon}></Icon2>
              <Text style={styles.text}>운송약관</Text>
            </Pressable>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.button}>
            <Pressable onPress={toUsTerms}>
              <Icon3 name="file-signature" size={60} style={styles.icon} />
              <Text style={styles.text}>이용약관</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable onPress={toPrTerms}>
              <Icon3 name="user-shield" size={60} style={styles.icon} />
              <Text style={styles.text}>개인정보호보방침</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
export default CustomCenter;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonGroup: {
    height: 200,
    backgroundColor: '#E8EAF6',
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
