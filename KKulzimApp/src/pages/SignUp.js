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
import { getAuth, getAuthNumber, registTruckOwner } from '../api/truckowner';

function SignUp({navigation}) {
  const [truckownerName, setTruckownerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessNo, setBusinessNo] = useState('');
  const [truckTons, setTruckTons] = useState('');
  const [cardiv, setDiv] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [authno, setAuthno] = useState('');
  //const [longyn, setLongyn] = useState('');
  const [loArr, setLoArr] = useState([]);
  const [lfArr, setLfArr] = useState([]);
  const [rfArr, setRfArr] = useState([]);
  const [stArr, setStArr] = useState([]);

  const [visible, setVisible] = useState(false);
  const [modalvisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  //????????????
  const [allCheck, setAllCheck] = React.useState(false);
  const [trCheck, setTrCheck] = useState(false);
  const [usCheck, setUsCheck] = useState(false);
  const [prCheck, setPrCheck] = useState(false);

  //?????????
  const remainTime = Mtimer(); // ?????????

  //sms ????????????
  const [smsYn, setSmsYn] = useState(false);
  
  // //???????????? ????????? ??????
  // const [valPasswd, setValPassword] = useState(false);

  // //???????????? ?????? ????????? ??????
  // const [confPasswd, setConfPasswd] = useState(false);

  const allState = () => {
    if(allCheck === false)  {
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
    setTrCheck(!trCheck)
  };

  const usState = () => {
    setUsCheck(!usCheck);
  };

  const prState = () => {
    setPrCheck(!prCheck);
  };

  useEffect(() => {
    if (trCheck === true && usCheck === true && prCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  },[allCheck, trCheck, usCheck, prCheck]);

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
    setCarNumber(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);

  const onChangeConfirmpassword = useCallback(text => {
    setConfirmpassword(text.trim());
  }, []);

  const onChangeName = useCallback(text => {
    setTruckownerName(text.trim());
  }, []);
  const onChangeHpnumber = useCallback(text => {
    setPhoneNumber(text.trim());
  }, []);

  const onChangeAuthNo = useCallback(text => {
    setAuthno(text.trim());
  }, []);

  const onChangeBusinessno = useCallback(text => {
    setBusinessNo(text.trim());
    
  }, []);

  const hasNameErrors = () => {
    return !truckownerName || !truckownerName.trim() ? true : false;
  };

  const hasHpnumberErrors = () => {
    return !phoneNumber || !phoneNumber.trim() ? true : false;
  };

  const hasAuthErrors = () => {
    return !authno || !authno.trim() ? true : false;
  };
  const hasBusinessNoErrors = () => {
    return !businessNo || !businessNo.trim() ? true : false;
  };

  const hasPasswordErrors = () => {
    const regPression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if(!regPression.test(password)){
      return true;
    }
    return false;
  };

  const hasPasswordConfirmErrors = () => {
    if(password !== '' && confirmpassword !== password){
      return true;
    }
    return false;
  };

  const hasCarNoErrors = () => {
    return !carNumber || !carNumber.trim() ? true : false;
  };

  const authSms = () => {
    if(phoneNumber === '' || phoneNumber === undefined || phoneNumber === null){
      Alert.alert('????????? ????????? ????????? ?????????.')
    } else if(phoneNumber.length !== 11 ) {
      Alert.alert('???????????? ????????? ????????? ????????? ?????????.')  
    } else {
      setVisible(true);
      getAuthNumber(phoneNumber)
      if(remainTime === null){
        setVisible(false)
      }
    }
  };
  const confirmAuthSms = () => {
    getAuth(phoneNumber, authno)
    .then(res => {
      console.log(res)
      if(res.data !== "" ){
        Alert.alert('?????????????????????.')
        setSmsYn(true);
        setVisible(false);
      } else {
        Alert.alert('??????????????? ?????? ????????? ?????????.')
      }
    })
    .catch(err => {
      console.log(err)
      Alert.alert('?????? ?????? ???????????? ????????????. ?????? ??????????????????.')
    }) 
  };

  const onChangeTons = useCallback(text => {
    setTruckTons(text)
  }, []);

  // ???????????? ??????????????? ?????????
  const radioButtonsLOData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '?????????',
      value: 'LOY',
      labelStyle: {
        fontSize: 13,
      }, 

      size: 16,
    },
    {
      id: '2',
      label: '????????????',
      value: 'ONA',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
  ];

  const [radioButtonsLO, setRadioButtonsLO] = useState(radioButtonsLOData);

  function onPressRadioButtonLO(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setLoArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsLO(radioButtonsArray);
  }
 
  // ???????????? ????????? ???
  // ???????????? ?????????????????? ?????????
  const radioButtonsRFData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '??????',
      value: 'RRF',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '2',
      label: '??????',
      value: 'FFZ',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '3',
      label: '????????????',
      value: 'RNA',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
  ];

  const [radioButtonsRF, setRadioButtonsRF] = useState(radioButtonsRFData);

  function onPressRadioButtonRF(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setRfArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsRF(radioButtonsArray);
  }
  // ???????????? ?????????????????? ????????? ???
 
  // ???????????? ??????????????? ?????????
  const radioButtonsSTData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '??????',
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
      label: '?????????',
      value: 'SWB',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
    },
    {
      id: '3',
      label: '??????',
      value: 'STC',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
    },
    {
      id: '4',
      label: '??????',
      value: 'STT',
      labelStyle: {
        fontSize: 12,
      },
      size: 15,
    },
  ];

  const [radioButtonsST, setRadioButtonsST] = useState(radioButtonsSTData);

  function onPressRadioButtonST(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setStArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsST(radioButtonsArray);
  }
  // ???????????? ??????????????? ????????? ???

  // ???????????? ??????????????? ?????????
  const radioButtonsLFData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '?????????',
      value: 'LLF',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
    {
      id: '2',
      label: '????????????',
      value: 'LNA',
      labelStyle: {
        fontSize: 13,
      },
      size: 16,
    },
  ];

  const [radioButtonsLF, setRadioButtonsLF] = useState(radioButtonsLFData);

  function onPressRadioButtonLF(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setLfArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsLF(radioButtonsArray)
  }

  const onSubmit = useCallback(async () => {
    // try {
    //   setLoading(true);
    //   const response = await axios.post(`${Config.API_URL}/login`, {
    //     carno,
    //     password,
    //   });
    //   console.log(response.data);
    //   Alert.alert('??????', '????????? ???????????????.');
    //   dispatch(
    //     userSlice.actions.setUser({
    //       name: response.data.data.name,
    //       carno: response.data.data.carno,
    //       accessToken: response.data.data.accessToken, //??????????????? ?????? ?????? 10, 5??? ???, ?????? ?????? ?????????......??????, Redux?????? ??????
    //       refreshToken: response.data.data.refreshToken, //???????????? 1??? 30??? 1??? ==> accessToken?????? ?????? EncryptedStorage??? ??????
    //     }),
    //   );
    //   await EncryptedStorage.setItem(
    //     'refreshToken',
    //     response.data.data.refreshToken,
    //   );
    // } catch (error) {
    //   const errorResponse = error.response;
    //   if (errorResponse) {
    //     Alert.alert('??????', errorResponse.data.message);
    //   }
    // } finally {
    //   setLoading(false);
    // }
  }, []);
// ??? ?????? ?????? ????????? ??? loading, carno, password


  const checkValidation = () => {
    if(hasNameErrors()) {
      Alert.alert('????????? ??????????????????.');
      return false;
    } else if (hasHpnumberErrors()) {
      Alert.alert('????????? ????????? ??????????????????.');
      return false;
    } else if(smsYn === false) {
      Alert.alert('????????? ????????? ????????????.');
      return false;
    } else if (hasBusinessNoErrors()) {
      Alert.alert('????????? ??????????????? ????????? ?????????.');
      return false;
    } else if(hasPasswordErrors()) {
      Alert.alert('??????????????? ??????????????????.');
      return false;
    } else if(hasPasswordConfirmErrors()) {
      Alert.alert('??????????????? ??????????????????.');
      return false;
    } else if(truckTons === '' || truckTons === null || truckTons === undefined) {
      Alert.alert('?????? ????????? ??????????????????.');
      return false
    } else if(loArr.length === 0) {
      Alert.alert('????????? ????????? ??????????????????.');
      return false;
    } else if(rfArr.length === 0) {
      Alert.alert('???????????? ????????? ??????????????????.');
      return false;
    } else if(stArr.length === 0) {
      Alert.alert('????????? ????????? ??????????????????.');
      return false;
    } else if(lfArr.length === 0) {
      Alert.alert('????????? ????????? ??????????????????.');
      return false;
    } else if(hasCarNoErrors()) {
      Alert.alert('??????????????? ??????????????????.');
      return false;
    } else if(trCheck === false) {
      Alert.alert('??????????????? ??????????????????.');
      return false;
    } else if(usCheck === false) {
      Alert.alert('??????????????? ??????????????????.');
      return false;
    } else if(prCheck === false) {
      Alert.alert('??????????????????????????? ??????????????????.');
      return false;
    } else {
      return true;
    }
  }

  const handleSignUp = () => {
    const user = {
      truckownerName: truckownerName,
      phoneNumber: phoneNumber,
      businessNo: businessNo,
      password: password,
      truckTons: truckTons,
      longyn: loArr[0]?.value,
      refrigeratedFrozen: rfArr[0]?.value,
      stowageType: stArr[0]?.value,
      liftType: lfArr[0]?.value,
      carNumber: carNumber,
    }
    if(checkValidation()) {
    registTruckOwner(user)
    .then(res => {
        console.log(res)
        navigation.navigate('LogIn')
        Alert.alert(`${res.data}`)
      })
      .catch(err => {
        console.log(err)
      }) 
    }
  }
  return (
    <View style={styles.mainView}>
      <DismissKeyboardView behavior>
        <Card style={styles.card}>
          <Title style={styles.cardtext}>????????????</Title>
          <Card.Content>
            <View>
              <View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeName}
                  Outlined
                  placeholder="??????"
                  // label="??????"
                  placeholderTextColor="#666"
                  value={truckownerName}
                  returnKeyType="next"
                />
                <HelperText type="error" visible={hasNameErrors()}>
                  ????????? ???????????? ?????????.
                </HelperText>
              </View>
              <Divider />
              <View>
                <View style={styles.box2}>
                  <TextInput
                    style={styles.hptextInput}
                    onChangeText={onChangeHpnumber}
                    Outlined
                    placeholder="???????????????"
                    placeholderTextColor="#666"
                    value={phoneNumber}
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                  <Pressable style={styles.hpButton} onPress={authSms}>
                    <Text style={styles.ButtonText}>????????????</Text>
                  </Pressable>
                </View>
                <View>
                  <HelperText type="error" visible={hasHpnumberErrors()}>
                    ?????????????????? - ?????? ???????????? ?????????.
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
                      placeholder="???????????? "
                      value={authno}
                      keyboardType="numeric"
                    />
                    <Pressable style={styles.hpButton} onPress={confirmAuthSms}>
                      <Text style={styles.ButtonText}>??????</Text>
                    </Pressable>
                  </View>
                  <View>
                    <HelperText type="error" visible={hasAuthErrors()}>
                      ??????????????? ???????????? ?????????. {remainTime} 
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
                  // label="?????????????????????"
                  placeholder="?????????????????????"
                  value={businessNo}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  blurOnSubmit={false}
                />
                <HelperText type="error" visible={hasBusinessNoErrors()}>
                  ???????????????????????? ???????????????.
                </HelperText>
              </View>
            </View>
            <Divider />
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="????????????"
                onChangeText={onChangePassword}
                value={password}
                textContentType="password"
                keyboardType={
                  Platform.OS === 'android' ? 'default' : 'ascii-capable'
                }
                secureTextEntry
                returnKeyType="send"
                clearButtonMode="while-editing"
                onSubmitEditing={onSubmit}
                right={<TextInput.Icon icon="eye" />}
              />
              <HelperText type="error" visible={hasPasswordErrors()}>
                ??????,??????,??????????????? ????????? 8?????? ????????? ????????? ?????????
              </HelperText>
            </View>
            <Divider />
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="??????????????????"
                onChangeText={onChangeConfirmpassword}
                value={confirmpassword}
                textContentType="password"
                secureTextEntry
                returnKeyType="send"
                keyboardType={
                  Platform.OS === 'android' ? 'default' : 'ascii-capable'
                }
                clearButtonMode="while-editing"
                onSubmitEditing={onSubmit}
              />
              <HelperText type="error" visible={hasPasswordConfirmErrors()}>
                ??????????????? ?????? ??????????????????.
              </HelperText>
            </View>
          </Card.Content>
        </Card>
        <Divider />

        <Card style={styles.card}>
          <Title style={styles.cardtext}>????????????</Title>
          <Card.Content>
            <View style={styles.box}>
              <RNPickerSelect
                style={styles.inputAndroid}
                placeholder={{
                  label: '????????????',
                }}
                value={truckTons}
                onValueChange={value => onChangeTons(value)}
                items={[
                  {label: '1???', value: '1000T', key: '1'},
                  {label: '1.4???', value: '1P04T', key: '2'},
                  {label: '2.5???', value: '2P05T', key: '3'},
                  {label: '3.5???', value: '3P05T', key: '4'},
                  {label: '5???', value: '5000T', key: '5'},
                  {label: '5??? ?????????', value: '500PT', key: '6'},
                  {label: '5??? ???', value: '500XT', key: '7'},
                  {label: '11???', value: '1100T', key: '8'},
                  {label: '18???', value: '1800T', key: '9'},
                ]}
              />
            </View>
            <Divider />
            <View>
              <View>
                <Card style={styles.radiocardivbox}>
                  <Title style={styles.radiocardtext}>????????????</Title>
                  <Card.Content>
                    <Card>
                      <Title style={styles.radiocardtext2}>???????????????</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtonsLO}
                          onPress={onPressRadioButtonLO}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>

                    <Card>
                      <Title style={styles.radiocardtext2}>??????????????????</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtonsRF}
                          onPress={onPressRadioButtonRF}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>
                    <Card>
                      <Title style={styles.radiocardtext2}>???????????????</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtonsST}
                          onPress={onPressRadioButtonST}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>

                    <Card>
                      <Title style={styles.radiocardtext2}>???????????????</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtonsLF}
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
                placeholder="????????????"
                value={carNumber}
                returnKeyType="next"
                clearButtonMode="while-editing"
                blurOnSubmit={false}
              />
            </View>
            <Divider />
            <HelperText type="error" visible={hasCarNoErrors()}>
              ??????????????? ????????? ?????????
            </HelperText>
          </Card.Content>
        </Card>

        {/* ?????? ?????? */}
        <Card style={styles.card}>
          <Card.Content>
            <View>
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  style={styles.checkbox}
                  size={18}
                  disableText
                  fillColor="black"
                  unfillColor="#FFFFFF"
                  text="??????????????????"
                  isChecked = {allCheck}
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  onPress={allState}
                  disableBuiltInState
                />
                <Text style={styles.chkboxlabel}>??????????????????</Text>
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
                  text="????????????"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  onPress={trState}
                  disableBuiltInState
                />
                <Text style={styles.chkboxlabel}>????????????</Text>
                <Pressable style={styles.tremButton} onPress={toTrTerms}>
                  <Text style={styles.termButtonText}>??????</Text>
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
                  text="????????????"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  onPress={usState}
                  disableBuiltInState
                />
                <Text style={styles.chkboxlabel}>????????????</Text>
                <Pressable style={styles.tremButton} onPress={toUsTerms}>
                  <Text style={styles.termButtonText}>??????</Text>
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
                  text="????????????????????????"
                  innerIconStyle={{borderRadius: 0}}
                  iconStyle={{borderColor: 'red', borderRadius: 0}}
                  onPress={prState}
                  disableBuiltInState
                />
                <Text style={styles.chkboxlabel}>????????????????????????</Text>
                <Pressable style={styles.tremButton} onPress={toPrTerms}>
                  <Text style={styles.termButtonText}>??????</Text>
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
            onPress={handleSignUp}>
            <Text style={styles.ButtonText}>????????????</Text>
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
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
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
