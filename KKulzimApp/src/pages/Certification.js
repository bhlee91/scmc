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
} from 'react-native';

import {Card, Divider, HelperText, TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

function Certification({navigation}) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(false);

  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);

  const emailVisible = () => {
    setVisible(true);
  };

  const hasErrors = () => {
    return !email || !email.trim() ? true : false;
  };

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }

    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
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
  }, [email]);
  return (
    <ScrollView style={styles.mainView}>
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Content>
              <Card style={styles.cardcontents}>
                <Card.Content>
                  <View>
                    <View style={styles.menuView}>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={emailVisible}>
                          <Text style={styles.ButtonText}>이메일주소입력</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  {visible ? (
                    <View
                      style={{
                        // backgroundColor: '#E8EAF6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 5,
                            borderColor: '#B0BEC5',
                          }}>
                          {/* <Text style={styles.text}>1개월</Text> */}
                          <TextInput
                            style={{
                              backgroundColor: '#FFFFFF',
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 5,
                              height: 45,
                              fontSize: 12,
                            }}
                            onChangeText={onChangeEmail}
                            Outlined
                            // label="인증번호"
                            placeholder="이메일 "
                            value={email}
                            // ref={carnoRef}
                            // onSubmitEditing={() => passwordRef.current?.focus()}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 5,
                            borderColor: '#B0BEC5',
                          }}>
                          <Pressable
                            style={{
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#4527A0',
                              height: 45,
                            }}
                            onPress={onSubmit}>
                            <Text style={styles.ButtonText}>저장</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  ) : (
                    // <View style={{flex: 1}}>
                    //   <View>
                    //     <TextInput
                    //       style={styles.TextInput}
                    //       onChangeText={onChangeEmail}
                    //       Outlined
                    //       // label="인증번호"
                    //       placeholder="이메일 "
                    //       value={email}
                    //       // ref={carnoRef}
                    //       // onSubmitEditing={() => passwordRef.current?.focus()}
                    //     />
                    //     <Pressable style={{width: '30%'}} onPress={onSubmit}>
                    //       <Text style={styles.ButtonText}>저장</Text>
                    //     </Pressable>
                    //   </View>
                    //   <View>
                    //     <HelperText type="error" visible={hasErrors()}>
                    //       이메일주소를 입력하여 주세요.
                    //     </HelperText>
                    //   </View>
                    // </View>
                    <Divider />
                  )}
                </Card.Content>
              </Card>

              <Card style={styles.cardcontents}>
                <Card.Content>
                  <View>
                    <View style={styles.menuView}>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={() => Alert.alert('부가정보입력')}>
                          <Text style={styles.ButtonText}>부가정보 입력</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
export default Certification;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },

  menuView: {
    flex: 1,
    flexDirection: 'row',
    // height: 100,
    marginTop: 10,
  },

  view: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    // borderWidth: 1,
    // backgroundColor: '#BF360C',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 0,
  },

  cardcontents: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    // height: 220,
  },

  text: {
    // color: '#536DFE',
    fontSize: 15,
    fontWeight: '500',
  },

  ButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '300',
  },
  buttonZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4527A0',
    height: 50,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
});
