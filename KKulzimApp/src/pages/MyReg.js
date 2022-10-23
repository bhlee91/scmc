import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
} from 'react-native';

import {
  Card,
  Title,
  Divider,
  HelperText,
  TextInput,
} from 'react-native-paper';
import DismissKeyboardView from '../components/DismissKeyboardView';
import RNPickerSelect from 'react-native-picker-select';
import RadioGroup from 'react-native-radio-buttons-group';
import store from '../store';

import { getTruckowner, updateTruckowner } from '../api/truckowner';

function MyReg({navigation}) {
  const [tons, setTons] = useState('');
  const [carno, setCarno] = useState('');
  const [info, setInfo] = useState('')

  const [loArr, setLoArr] = useState([]);
  const [lfArr, setLfArr] = useState([]);
  const [rfArr, setRfArr] = useState([]);
  const [stArr, setStArr] = useState([]);

  const truckownerUid = store.getState().user.truckownerUid;
  const carNumber = store.getState().user.carNumber;

  useEffect(() => {
    getInfo();
    console.log(info)
  }, []);


  const getInfo = () =>{
    getTruckowner(carNumber)
    .then(res => {
      setInfo(res.data)
      setCarno(res.data.carNumber)
    })
    .then(() =>{
      setDefaultRadio()
    })
  }

  // const onUpdateClick = () => {
  //   const data = {
      
  //   }
  //   updateTruckowner(data, truckownerUid)
  //   .then(res => {
  //     console.log(res)
  //     //Alert.alert(`${res.data}`)
  //   })
  // }

  const onChangeCarno = useCallback(text => {
    setCarno(text.trim());
  }, []);

  const onChangeTons = useCallback(text => {
    console.log(text);
  }, []);

  // 차량정보 초장축여부 데이타
  const radioButtonsLOData = [
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

  const [radioButtonsLO, setRadioButtonsLO] = useState(radioButtonsLOData);

  const setDefaultRadio = () => {
    radioButtonsLOData.map(key => {
      if(key.value === info.longyn) {
        key.selected = true;
      }
    })
    setRadioButtonsLO(radioButtonsLOData)

    radioButtonsRFData.map(key => {
      if(key.value === info.refrigeratedFrozen) {
        key.selected = true;
      }
    })
    setRadioButtonsRF(radioButtonsRFData)

    radioButtonsSTData.map(key => {
      if(key.value === info.stowageType) {
        key.selected = true;
      }
    })
    setRadioButtonsST(radioButtonsSTData)

    radioButtonsLFData.map(key => {
      if(key.value === info.liftType) {
        key.selected = true;
        setLfArr(radioButtonsLFData.filter(key => key.selected === true))
        console.log(lfArr)
      }
    })
    setRadioButtonsLF(radioButtonsLFData)
  }

  function onPressRadioButtonLO(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setLoArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsLO(radioButtonsArray);
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

  const [radioButtonsRF, setRadioButtonsRF] = useState(radioButtonsRFData);

  function onPressRadioButtonRF(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setRfArr(radioButtonsArray.filter(key => key.selected === true))
    })
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

  const [radioButtonsST, setRadioButtonsST] = useState(radioButtonsSTData);

  function onPressRadioButtonST(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setStArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsST(radioButtonsArray);
  }

  // 차량정보 적재함형태 데이타 끝

  // 차량정보 리프트여부 데이타
  const radioButtonsLFData = [
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

  const [radioButtonsLF, setRadioButtonsLF] = useState(radioButtonsLFData);

  function onPressRadioButtonLF(radioButtonsArray) {
    radioButtonsArray.map((key) => {
      setLfArr(radioButtonsArray.filter(key => key.selected === true))
    })
    setRadioButtonsLF(radioButtonsArray)
  }

  const onSubmit = useCallback(async () => {
  }, []);

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
                  Outlined
                  placeholder="성명"
                  placeholderTextColor="#666"
                  value={info.truckownerName}
                  returnKeyType="next"
                  editable={false}
                />
              </View>
              <Divider />

              <Divider />
              <View>
                <TextInput
                  style={styles.textInput}
                  // label="사업자등록번호"
                  placeholder="사업자등록번호"
                  value={info.businessNo}
                  returnKeyType="next"
                  clearButtonMode="while-editing"
                  editable={false}
                  blurOnSubmit={false}
                />
              </View>
            </View>
            <Divider />
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
                value={info.truckTons}
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
                          radioButtons={radioButtonsLO}
                          onPress={onPressRadioButtonLO}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>

                    <Card>
                      <Title style={styles.radiocardtext2}>냉장냉동여부</Title>
                      <Card.Content>
                        <RadioGroup row defaultValue={info.refrigeratedFrozen}
                          radioButtons={radioButtonsRF}
                          onPress={onPressRadioButtonRF}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>
                    <Card>
                      <Title style={styles.radiocardtext2}>적재함형태</Title>
                      <Card.Content>
                        <RadioGroup
                          radioButtons={radioButtonsST}
                          onPress={onPressRadioButtonST}
                          layout="row"
                        />
                      </Card.Content>
                    </Card>

                    <Card>
                      <Title style={styles.radiocardtext2}>리프트여부</Title>
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
                placeholder="차량번호"
                value={carno}
                returnKeyType="next"
                clearButtonMode="while-editing"
                defaultValue={carno}
                blurOnSubmit={false}
              />
            </View>
            <Divider />
          </Card.Content>
        </Card>

        <View style={styles.buttonZone}>
          <Pressable
            style={styles.Button}
            //onPress={onUpdateClick}
            >
            <Text style={styles.ButtonText}>수정</Text>
          </Pressable>
        </View>
      </DismissKeyboardView>
    </View>
  );
}
export default MyReg;

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
