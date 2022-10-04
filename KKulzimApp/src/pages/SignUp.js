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
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  Button,
  Card,
  Title,
  Divider,
  Paragraph,
  HelperText,
  TextInput,
  Portal,
  Modal,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DismissKeyboardView from 'components/DismissKeyboardView';
import RNPickerSelect from 'react-native-picker-select';
import RadioGroup from 'react-native-radio-buttons-group';
import Mtimer from 'common/Mtimer';

function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [hpnumber, setHpnumber] = useState('');
  const [businessno, setBusinessno] = useState('');
  const [tons, setTons] = useState('');
  const [cardiv, setDiv] = useState('');
  const [carno, setCarno] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [authno, setAuthno] = useState('');
  const [longyn, setLongyn] = useState('');

  const [visible, setVisible] = useState(false);
  const [modalvisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  //약관정보
  const [allCheck, setAllCheck] = React.useState(false);
  const [trCheck, setTrCheck] = useState(false);
  const [usCheck, setUsCheck] = useState(false);
  const [prCheck, setPrCheck] = useState(false);

  const allState = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setTrCheck(true);
      setUsCheck(true);
      setPrCheck(true);
    } else {
      setAllCheck(false);
      setTrCheck(false);
      setUsCheck(false);
      setPrCheck(false);
    }
  };

  const trState = () => {
    if (trCheck === false) {
      setTrCheck(true);
    } else {
      setTrCheck(false);
      console.log(trCheck);
    }
  };

  const usState = () => {
    if (usCheck === false) {
      setUsCheck(true);
    } else {
      setUsCheck(false);
    }
    console.log(usCheck);
  };

  const prState = () => {
    if (prCheck === false) {
      setPrCheck(true);
    } else {
      setPrCheck(false);
    }
    console.log(prCheck);
  };

  useEffect(() => {
    if (trCheck === true && usCheck === true && prCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
    console.log(trCheck + 'aaa' + usCheck + 'bb' + prCheck);
  }, [trCheck, usCheck, prCheck]);

  const toTrTerms = useCallback(() => {
    navigation.navigate('TrTerms');
  }, [navigation]);

  const toPrTerms = useCallback(() => {
    navigation.navigate('PrTerms');
  }, [navigation]);

  const toUsTerms = useCallback(() => {
    navigation.navigate('UsTerms');
  }, [navigation]);

  const onChangeCarno = useCallback(text => {
    setCarno(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onChangeConfirmpassword = useCallback(text => {
    setConfirmpassword(text.trim());
  }, []);

  const onChangeName = useCallback(text => {
    setName(text.trim());
  }, []);
  const onChangeHpnumber = useCallback(text => {
    setHpnumber(text.trim());
  }, []);

  const onChangeAuthNo = useCallback(text => {
    setAuthno(text.trim());
  }, []);

  const onChangeBusinessno = useCallback(text => {
    setBusinessno(text.trim());
  }, []);

  const hasNameErrors = () => {
    return !name || !name.trim() ? true : false;
  };

  const hasHpnumberErrors = () => {
    return !hpnumber || !hpnumber.trim() ? true : false;
  };

  const hasAuthErrors = () => {
    return !authno || !authno.trim() ? true : false;
  };
  const hasBusinessNoErrors = () => {
    return !businessno || !businessno.trim() ? true : false;
  };

  const hasPasswordErrors = () => {
    return !password || !password.trim() ? true : false;
  };

  const hasPasswordConfimErrors = () => {
    return !confirmpassword || !confirmpassword.trim() ? true : false;
  };

  const hasCasrNoErrors = () => {
    return !carno || !carno.trim() ? true : false;
  };

  const authSms = () => {
    setVisible(true);
  };
  const confirmAuthSms = () => {
    setVisible(false);
  };

  const saveCardiv = () => {
    setModalVisible(false);
  };

  const onChangeTons = useCallback(text => {
    console.log(text);
  }, []);

  const toCardiv = useCallback(() => {
    navigation.navigate('Cardiv');
  }, [navigation]);

  // 차량정보 초장축여부 데이타
  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '초장축',
      value: 'LOY',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '2',
      label: '해당없음',
      value: 'ONA',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  // 차량정보 데이타 끝
  // 차량정보 냉장냉동여부 데이타
  const radioButtonsRFData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '냉장',
      value: 'RRF',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '2',
      label: '냉동',
      value: 'FFZ',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '3',
      label: '해당없음',
      value: 'RNA',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
  ];

  const [RadioButtonsrf, setRadioButtonsRF] = useState(radioButtonsRFData);

  function onPressRadioButtonRF(radioButtonsArray) {
    setRadioButtonsRF(radioButtonsArray);
  }

  // 차량정보 냉장냉동여부 데이타 끝
  // 차량정보 적재함형태 데이타
  const radioButtonsSTData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '카고',
      value: 'SCG',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
      containerStyle: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
    {
      id: '2',
      label: '윙바디',
      value: 'SWB',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
    },
    {
      id: '3',
      label: '탑차',
      value: 'STC',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
    },
    {
      id: '4',
      label: '호루',
      value: 'STT',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
    },
  ];

  const [RadioButtonsst, setRadioButtonsST] = useState(radioButtonsSTData);

  function onPressRadioButtonST(radioButtonsArray) {
    setRadioButtonsST(radioButtonsArray);
  }

  // 차량정보 적재함형태 데이타 끝

  // 차량정보 리프트여부 데이타
  const radioButtonsDataLF = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '리프트',
      value: 'LLF',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '2',
      label: '해당없음',
      value: 'LNA',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
  ];

  const [radioButtonslf, setRadioButtonsLF] = useState(radioButtonsDataLF);

  function onPressRadioButtonLF(radioButtonsArray) {
    setRadioButtonsLF(radioButtonsArray);
  }

  // 차량정보 리프트여부 데이타 끝

  // 약관정보 데이타
  // const chkdata = [
  //   {id: 0, title: '운송약관'},
  //   {id: 1, title: '이용약관'},
  //   {id: 2, title: '개인정보보호방침'},
  // ];
  // const [checkItems, setCheckItems] = useState([]);

  // // 체크박스 단일 선택
  // const handleSingleCheck = (isChecked, id) => {
  //   if (isChecked) {
  //     // 단일 선택 시 체크된 아이템을 배열에 추가
  //     setCheckItems(prev => [...prev, id]);
  //   } else {
  //     // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
  //     setCheckItems(checkItems.filter(el => el !== id));
  //   }
  // };

  // // 체크박스 전체 선택
  // const handleAllCheck = isChecked => {
  //   if (isChecked) {
  //     // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
  //     const idArray = [];
  //     chkdata.forEach(el => idArray.push(el.id));
  //     setCheckItems(idArray);
  //   } else {
  //     // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
  //     setCheckItems([]);
  //   }
  // };

  // /약관정보 데이타 끝

  let reaminTime = Mtimer(); // 타이머
  const onSubmit = useCallback(async () => {
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
    <View style={styles.mainView}>
      <DismissKeyboardView behavior>
        <Card style={styles.card}>
          <Title style={styles.cardtext}>차주정보</Title>
          <Card.Content>
            <View>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeName}
                  Outlined
                  placeholder="성명"
                  // label="성명"
                  placeholderTextColor="#666"
                  value={name}
                  returnKeyType="next"
                  // ref={carnoRef}
                  // onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <HelperText type="error" visible={hasNameErrors()}>
                  성명을 입력하여 주세요.
                </HelperText>
              </View>
              <Divider />
              <View>
                <View style={styles.box2}>
                  <TextInput
                    style={styles.hptextInput}
                    onChangeText={onChangeHpnumber}
                    Outlined
                    // label="휴대폰번호"
                    placeholder="휴대폰번호"
                    placeholderTextColor="#666"
                    value={hpnumber}
                    keyboardType="numeric"
                    returnKeyType="next"
                    // ref={carnoRef}
                    // onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                  <Pressable style={styles.hpButton} onPress={authSms}>
                    <Text style={styles.ButtonText}>인증하기</Text>
                  </Pressable>
                </View>
                <View>
                  <HelperText type="error" visible={hasHpnumberErrors()}>
                    휴대폰번호를 - 없이 입력하여 주세요.
                  </HelperText>
                </View>
              </View>
              <Divider />
              {visible ? (
                <View>
                  <View style={styles.box2}>
                    <TextInput
                      style={styles.hptextInput}
                      onChangeText={onChangeAuthNo}
                      Outlined
                      // label="인증번호"
                      placeholder="인증번호 "
                      value={authno}
                      keyboardType="numeric"
                      // ref={carnoRef}
                      // onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                    <Pressable style={styles.hpButton} onPress={confirmAuthSms}>
                      <Text style={styles.ButtonText}>확인</Text>
                    </Pressable>
                  </View>
                  <View>
                    <HelperText type="error" visible={hasAuthErrors()}>
                      인증번호를 입력하여 주세요. {reaminTime}
                    </HelperText>
                  </View>
                </View>
              ) : (
                <Divider />
              )}
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeBusinessno}
                  // label="사업자등록번호"
                  placeholder="사업자등록번호"
                  value={businessno}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  // ref={carnoRef}
                  // onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <HelperText type="error" visible={hasBusinessNoErrors()}>
                  사업자등록번호를 입력하세요.
                </HelperText>
              </View>
            </View>
            <Divider />
            <View>
              <TextInput
                style={styles.textInput}
                // label="비밀번호"
                placeholder="비밀번호"
                onChangeText={onChangePassword}
                value={password}
                textContentType="password"
                keyboardType={
                  Platform.OS === 'android' ? 'default' : 'ascii-capable'
                }
                secureTextEntry
                returnKeyType="send"
                clearButtonMode="while-editing"
                // ref={passwordRef}
                onSubmitEditing={onSubmit}
                right={<TextInput.Icon icon="eye" />}
              />
              <HelperText type="error" visible={hasPasswordErrors()}>
                영문,숫자,특수문자를 포함한 8자리 이상을 입력해 주세요
              </HelperText>
            </View>
            <Divider />
            <View>
              <TextInput
                style={styles.textInput}
                // label="비밀번호확인"
                placeholder="비밀번호확인"
                onChangeText={onChangeConfirmpassword}
                value={confirmpassword}
                textContentType="password"
                secureTextEntry
                returnKeyType="send"
                keyboardType={
                  Platform.OS === 'android' ? 'default' : 'ascii-capable'
                }
                clearButtonMode="while-editing"
                // ref={passwordRef}
                onSubmitEditing={onSubmit}
              />
              <HelperText type="error" visible={hasPasswordConfimErrors()}>
                영문,숫자,특수문자를 포함한 8자리 이상을 입력해 주세요
              </HelperText>
            </View>
          </Card.Content>
        </Card>
        <Divider />

        <Card style={styles.card}>
          <Title style={styles.cardtext}>차량정보</Title>
          <Card.Content>
            <View style={styles.box}>
              <RNPickerSelect
                // textInputProps={{underlineColorAndroid: 'transparent'}}
                // useNativeAndroidPickerStyle={false}
                style={styles.inputAndroid}
                placeholder={{
                  label: '차량톤수',
                }}
                // fixAndroidTouchableBug={true}
                value={tons}
                onValueChange={value => onChangeTons(value)}
                items={[
                  {label: '1톤', value: '1000T', key: '1'},
                  {label: '1.4톤', value: '1P04T', key: '2'},
                  {label: '2.5톤', value: '2P05T', key: '3'},
                  {label: '3.5톤', value: '3P05T', key: '4'},
                  {label: '5톤', value: '5000T', key: '5'},
                  {label: '5톤 를러스', value: '500PT', key: '6'},
                  {label: '5톤 축', value: '500XT', key: '7'},
                  {label: '11톤', value: '1100T', key: '8'},
                  {label: '18톤', value: '1800T', key: '9'},
                ]}
              />
            </View>
            <Divider />
            <View>
              <View>
                {/* <Pressable
                  style={styles.Button}
                  onPress={() => Alert.alert('회원가입이 완료되었습니다.')}>
                  <Text style={styles.ButtonText}>차량구분선택</Text>
                </Pressable> */}
                <Card style={styles.radiocardivbox}>
                  <Title style={styles.radiocardtext}>차량종류</Title>
                  <Card.Content>
                    <Card>
                      <Title style={styles.radiocardtext2}>초장축여부</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtons}
                          onPress={onPressRadioButton}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>

                    <Card>
                      <Title style={styles.radiocardtext2}>냉장냉동여부</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={RadioButtonsrf}
                          onPress={onPressRadioButtonRF}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>
                    <Card>
                      <Title style={styles.radiocardtext2}>적재함형태</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={RadioButtonsst}
                          onPress={onPressRadioButtonST}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>

                    <Card>
                      <Title style={styles.radiocardtext2}>리프트여부</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtonslf}
                          onPress={onPressRadioButtonLF}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>
                  </Card.Content>
                </Card>
              </View>
            </View>
            <Divider />
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeCarno}
                placeholder="차량번호"
                value={carno}
                returnKeyType="next"
                clearButtonMode="while-editing"
                // ref={carnoRef}
                // onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
              />
            </View>
            <Divider />
            <HelperText type="error" visible={hasCasrNoErrors()}>
              차량번호를 입력해 주세요
            </HelperText>
          </Card.Content>
        </Card>

        {/* 약관 넣기 */}
        <Card style={styles.card}>
          <Card.Content>
            <View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  style={styles.checkbox}
                  size={18}
                  // isChecked={checkboxState}
                  disableText
                  fillColor="black"
                  unfillColor="#FFFFFF"
                  text="약관전체동의"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  // onPress={handleAllCheck(isChecked)}
                  onPress={allState}
                />
                <Text style={styles.chkboxlabel}>약관전체동의</Text>
              </View>
              <Divider />
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  style={styles.checkbox}
                  size={18}
                  isChecked={trCheck}
                  disableText
                  fillColor="black"
                  unfillColor="#FFFFFF"
                  text="운송약관"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  onPress={trState}
                />
                <Text style={styles.chkboxlabel}>운송약관</Text>
                <Pressable style={styles.tremButton} onPress={toTrTerms}>
                  <Text style={styles.termButtonText}>보기</Text>
                </Pressable>
              </View>
              <Divider />
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  style={styles.checkbox}
                  isChecked={usCheck}
                  size={18}
                  disableText
                  fillColor="black"
                  unfillColor="#FFFFFF"
                  text="운송약관"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  onPress={usState}
                />
                <Text style={styles.chkboxlabel}>이용약관</Text>
                <Pressable style={styles.tremButton} onPress={toUsTerms}>
                  <Text style={styles.termButtonText}>보기</Text>
                </Pressable>
              </View>
              <Divider />
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  style={styles.checkbox}
                  size={18}
                  isChecked={prCheck}
                  disableText
                  fillColor="black"
                  unfillColor="#FFFFFF"
                  text="운송약관"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  // textStyle={{fontFamily: 'JosefinSans-Regular'}}
                  onPress={prState}
                />
                <Text style={styles.chkboxlabel}>개인정보보호방침</Text>
                <Pressable style={styles.tremButton} onPress={toPrTerms}>
                  <Text style={styles.termButtonText}>보기</Text>
                </Pressable>
              </View>
              <Divider />
            </View>
            <Divider />
          </Card.Content>
        </Card>

        <View style={styles.buttonZone}>
          <Pressable
            style={styles.Button}
            onPress={() => Alert.alert('회원가입이 완료되었습니다.')}>
            <Text style={styles.ButtonText}>가입하기</Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </View>
  );
}
export default SignUp;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    //marginTop: StatusBar.currentHeight,
  },
  titlecard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },

  cardtext: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 20,
  },

  radiocardtext: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 5,
  },

  radiocardtext2: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 12,
    color: '#304FFE',
    marginLeft: 5,
  },

  textInput: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    fontSize: 11,
    borderWidth: 1,
    height: 50,
  },

  buttonZone: {
    marginTop: 5,
    alignItems: 'center',
  },

  Button: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283593',
  },

  ButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  tremButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  termButtonText: {
    color: '##0000ff',
    fontSize: 12,
  },

  box2: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hptextInput: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    margin: 12,
    borderWidth: 1,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 0,
    fontSize: 11,
    height: 45,
  },

  hpButton: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#283593',
  },

  ButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonZone: {
    marginTop: 15,
    alignItems: 'center',
  },

  inputAndroid: {
    fontSize: 16,
    height: 50,
    width: 300,
    color: '#000000',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },

  cardivButton: {
    fontSize: 16,
    marginTop: 5,
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    fontSize: 11,
    borderWidth: 1,
    justifyContent: 'flex-start',
  },
  box: {
    marginTop: 5,
    borderWidth: 1,
    height: 47,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  cardivbox: {
    marginTop: 15,
    height: 50,
  },

  radiocardivbox: {
    marginTop: 5,
    marginBottom: 5,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  chkboxlabel: {
    margin: 8,
  },
  chkboxlabel2: {
    margin: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
