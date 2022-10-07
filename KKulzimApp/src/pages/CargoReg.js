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
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {
  Card,
  Paragraph,
} from 'react-native-paper';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Slider from '@react-native-community/slider';
import RNPickerSelect from "react-native-picker-select";

import { formatStringToDateTime, convertDateTime } from "utils/DateUtil";
import { convertWeightAndDiv, isEmpty } from "utils/CommonUtil";
import {
  setCargoInfo
} from "api/truck/index";

Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' ';

  var weekName = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear();
      case 'yy':
        return (d.getFullYear() % 1000).zf(2);
      case 'MM':
        return (d.getMonth() + 1).zf(2);
      case 'dd':
        return d.getDate().zf(2);
      case 'E':
        return weekName[d.getDay()];
      case 'HH':
        return d.getHours().zf(2);
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case 'mm':
        return d.getMinutes().zf(2);
      case 'ss':
        return d.getSeconds().zf(2);
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후';
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

function CargoReg({ navigation, route }) {
  const [cargoUid, setCargoUid] = useState(0)
  const [loadDateTime, setLoadDateTime] = useState("")
  const [unloadDateTime, setUnloadDateTime] = useState("")
  const [loadAddr, setLoadAddr] = useState({
    addr: "",
    buildingName: "",
  })
  const [unloadAddr, setUnloadAddr] = useState({
    addr: "",
    buildingName: "",
  })
  const [rate, setRate] = useState(0)
  const [weight, setWeight] = useState("0")
  const [weightDiv, setWeightDiv] = useState("")

  const [isLoadDatePickerVisible, setLoadDatePickerVisible] = useState(false)
  const [isUnloadDatePickerVisible, setUnloadDatePickerVisible] = useState(false)

  const handleLoadConfirm = date => {
    setLoadDatePickerVisible(false)
    setLoadDateTime(date.format('yyyy년MM월dd일 HH시mm분'))
  }

  const handleUnloadConfirm = date => {
    setUnloadDatePickerVisible(false)
    setUnloadDateTime(date.format('yyyy년MM월dd일 HH시mm분'))
  }

  const onChangeLoadSearch = searchLoad => setLoadAddr(searchLoad)
  const onChangeUnloadSearch = searchUnload => setUnloadAddr(searchUnload)

  useEffect(() => {
    if (route.params?.addr) {
      const addr = route.params.addr
      
      if (route.params.d === "load")
        setLoadAddr({ 
          ...loadAddr,
          addr: addr.jibun || addr.road,
          buildingName: addr.buildingName,
        })
      if (route.params.d === "unload")
        setUnloadAddr({
          ...unloadAddr,
          addr: addr.jibun || addr.road,
          buildingName: addr.buildingName,
        })
    }
  }, [route.params.addr])

  useEffect(() => {
    if (route.params?.info) {
      const wad = convertWeightAndDiv(route.params.info?.cargoWeight)

      setCargoUid(route.params.info.cargoUid)
      setLoadDateTime(convertDateTime(route.params.info.loadDt))
      setUnloadDateTime(convertDateTime(route.params.info.unloadDt))
      setLoadAddr({ 
        ...loadAddr,
        addr: route.params.info.departAddrSt,
        buildingName: route.params.info.departAddrSt2,
      })
      setUnloadAddr({ 
        ...unloadAddr,
        addr: route.params.info.arrivalAddrSt,
        buildingName: route.params.info.arrivalAddrSt2,
      })
      setRate(route.params.info.spaceRate)
      setWeight(wad.weight)
      setWeightDiv(wad.div)
    }
  }, [cargoUid])

  const onChangeTons = useCallback(text => {
    setWeight(text)
  }, [])

  const handleCargoSave = async () => {

    const obj = {
      cargoUid: cargoUid,
      truckownerUid: 4,
      loadDt: formatStringToDateTime(loadDateTime),
      unloadDt: formatStringToDateTime(unloadDateTime),
      departAddrSt: loadAddr.addr,
      departAddrSt2: loadAddr.buildingName,
      arrivalAddrSt: unloadAddr.addr,
      arrivalAddrSt2: unloadAddr.buildingName,
      spaceRate: rate,
      cargoWeight: `${weight}${weightDiv}`
    }
    
    try {
      await setCargoInfo(obj)
      .then(() => {
        navigation.navigate("Home")
      })
      .catch(error => {
        console.log("error => " + error)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleCancelClick = () => {
    setLoadDateTime("")
    setUnloadDateTime("")
    setLoadAddr({
      road: "",
      jibun: "",
    })
    setUnloadAddr({
      road: "",
      jibun: "",
    })
    setRate(0)
    setWeight("0")
    setWeightDiv("")

    navigation.navigate('Home')
  }
  
  return (
    <ScrollView style={styles.mainView}>
      {/* 상하차 시간 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>상하차시간 입력</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card>
            <Card.Content
              style={{justifyContent: 'center', alignSelf: 'center'}}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={() => setLoadDatePickerVisible(true)}>
                <TextInput
                  pointerEvents="none"
                  style={styles.textInput}
                  placeholder="상차일시"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  editable={false}
                  value={loadDateTime}
                />
                <DateTimePickerModal
                  headerTextIOS="상차일시"
                  isVisible={isLoadDatePickerVisible}
                  mode="datetime"
                  locale="ko"
                  onConfirm={handleLoadConfirm}
                  onCancel={() => setLoadDatePickerVisible(false)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={() => setUnloadDatePickerVisible(true)}>
                <TextInput
                  pointerEvents="none"
                  style={styles.textInput}
                  placeholder="하차일시"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  editable={false}
                  value={unloadDateTime}
                />
                <DateTimePickerModal
                  headerTextIOS="하차일시"
                  isVisible={isUnloadDatePickerVisible}
                  mode="datetime"
                  locale="ko"
                  onConfirm={handleUnloadConfirm}
                  onCancel={() => setUnloadDatePickerVisible(false)}
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* 상하차 시간 */}
      {/* 상하차지 시작 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>상차지/하차지입력</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card>
            <Card.Content
              style={{justifyContent: 'center', alignSelf: 'center'}}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={() => navigation.navigate('Address', { d: "load" })}>
                <TextInput
                  style={styles.textInput}
                  placeholder="상차지"
                  onChangeText={onChangeLoadSearch}
                  onFocus={() => navigation.navigate('Address', { d: "load" })}
                  editable={false}
                >
                  {loadAddr.addr} {isEmpty(loadAddr.buildingName) ? "" : `(${loadAddr.buildingName})`}
                </TextInput>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={() => navigation.navigate('Address', { d: "unload" })}>
                <TextInput
                  style={styles.textInput}
                  placeholder="하차지"
                  onChangeText={onChangeUnloadSearch}
                  onFocus={() => navigation.navigate('Address', { d: "unload" })}
                  editable={false}
                >
                  {unloadAddr.addr} {isEmpty(unloadAddr.buildingName) ? "" : `(${unloadAddr.buildingName})`}
                </TextInput>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* 상하차지 끝 */}

      {/* 화물사이즈 시작 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>화물사이즈</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card>
            <Card.Content
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <View style={{flex: 1, flexDirection: 'row', width: 300}}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>적재함</Text>
                </View>

                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Slider
                    style={{ height: 20, color: 'rgba(51, 65, 159, 0.8)' }}
                    maximumValue={100}
                    minimumValue={0}
                    value={rate}
                    onSlidingComplete={(value) => setRate(value)}
                    step={1}
                  />
                </View>
                <View
                  style={{
                    width: '10%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text>{rate}%</Text>
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    padding: 5,
                  }}>
                  <Pressable
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#4527A0',
                    }}
                    onPress={() => setRate(0)}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 12,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      초기화
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* 적재중량 */}

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                  width: 300,
                }}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>적재중량</Text>
                </View>

                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={{
                      color: '#000000',
                      height: 40,
                      width: 150,
                      borderColor: '#000000',
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 5,
                    }}
                    onChangeText={onChangeTons}
                    placeholder="중량"
                    value={weight}
                    returnKeyType="send"
                    clearButtonMode="while-editing"
                    // ref={carnoRef}
                    // onSubmitEditing={() => passwordRef.current?.focus()}
                    blurOnSubmit={false}
                  />
                </View>
                <View
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <RNPickerSelect
                    style={{ width: 70 }}
                    value={weightDiv}
                    onValueChange={(value) => setWeightDiv(value)}
                    items={[
                      { label: "단위", value: "" },
                      { label: "kg", value: "kg" },
                      { label: "톤", value: "t" },
                    ]}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* 상하차지 끝 */}

      <View>
        <View style={styles.menuView}>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.buttonZone}
              onPress={() =>
                Alert.alert('꿀짐', `입력한 정보로 화물정보를 ${cargoUid === 0 ? "등록" : "수정"}합니다`, [
                  { text: `${cargoUid === 0 ? "등록" : "수정"}`, onPress: () => handleCargoSave() },
                  { text: '취소', onPress: () => { return }, },
                ])
              }
            >
              <Text style={styles.ButtonText}>{cargoUid === 0 ? "등록" : "수정"}</Text>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.buttonZone}
              onPress={handleCancelClick}>
              <Text style={styles.ButtonText}>취소</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default CargoReg;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },

  menuView: {
    flex: 1,
    flexDirection: 'row',
    // height: 100,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    // backgroundColor: '#B3E5FC',
  },

  view: {
    flexDirection: 'row',
    // marginTop: 5,
    // marginBottom: 5,
    // marginLeft: 5,
    // marginRight: 5,
    // borderWidth: 1,
    // backgroundColor: '#BF360C',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
  },

  cardcontents: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    // height: 220,
  },

  text: {
    // color: '#536DFE',
    fontSize: 13,
    fontWeight: '500',
  },

  cardmaintext: {
    color: '#536DFE',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardTitle: {
    color: '#303F9F',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '300',
  },
  buttonZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD740',
    height: 50,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 14,
    color: '#000000',
    height: 50,
    width: 290,
    borderColor: '#000000',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 5,
  },
});
