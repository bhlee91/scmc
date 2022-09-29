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
  TextInput,
  Divider,
} from 'react-native';

import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Badge,
  Searchbar,
  Appbar,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ko} from 'date-fns/esm/locale';
import DismissKeyboardView from '../components/DismissKeyboardView';
// import ProgressBar from './../common/ProgressBar';
import * as Progress from 'react-native-progress';

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

function CargoReg({navigation}) {
  //   Date Picker 영역

  //상차일시 //
  const placeholder = '상차일시';
  const [text, onChangeText] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('dateFormat: ', date.format('yyyy/MM/dd'));
    hideDatePicker();
    onChangeText(date.format('yyyy-MM-dd hh시mm분'));
  };
  //상차일시 끝 //

  //하차칠시 관련 //
  const placeholder1 = '하차일시';
  const [untext, onChangeUnText] = useState('');

  const [isUnDatePickerVisible, setUnDatePickerVisibility] = useState(false);

  const showUnDatePicker = () => {
    setUnDatePickerVisibility(true);
  };

  const hideUnDatePicker = () => {
    setUnDatePickerVisibility(false);
  };

  const handleUnConfirm = date => {
    console.log('dateFormat: ', date.format('yyyy/MM/dd'));
    hideDatePicker();
    onChangeUnText(date.format('yyyy-MM-dd hh시mm분'));
  };
  //하차칠시 관련 끝//
  //   Date Picker 영역

  // 상하차지 관련
  const [searchLoad, setSearchLoad] = React.useState('');

  const onChangeLoadSearch = searchLoad => setSearchLoadQuery(searchLoad);

  const [searchUnload, setSearchUbload] = React.useState('');

  const onChangeUnloadSearch = searchUnload =>
    setSearchUnloadQuery(searchUnload);

  const showAddress = () => {};

  const clearCount = () => {
    setCount(0);
    console.log(count);
  };

  // 상하차지 끝

  //   적재함 시작

  const completed = 100;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count);
  }, [count]);

  const onChangeTons = useCallback(text => {
    setTons(text);
    console.log(text);
  }, []);

  const [tons, setTons] = useState('');

  // https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/App.js 참고
  // https://openbase.com/js/react-native-progress-bar-animated/documentation
  //   적자햄 끝

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
                onPress={showDatePicker}>
                <TextInput
                  pointerEvents="none"
                  style={styles.textInput}
                  placeholder={placeholder}
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  editable={false}
                  value={text}
                />
                <DateTimePickerModal
                  headerTextIOS={placeholder}
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  locale="ko"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={showUnDatePicker}>
                <TextInput
                  pointerEvents="none"
                  style={styles.textInput}
                  placeholder={placeholder1}
                  placeholderTextColor="#000000"
                  underlineColorAndroid="transparent"
                  editable={false}
                  value={untext}
                />
                <DateTimePickerModal
                  headerTextIOS={placeholder1}
                  isVisible={isUnDatePickerVisible}
                  mode="datetime"
                  locale="ko"
                  onConfirm={handleUnConfirm}
                  onCancel={hideUnDatePicker}
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
                onPress={showAddress}>
                <Searchbar
                  style={styles.textInput}
                  placeholder="상차지"
                  onChangeText={onChangeLoadSearch}
                  value={searchLoad}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: 5,
                }}
                onPress={showAddress}>
                <Searchbar
                  style={styles.textInput}
                  placeholder="하차지"
                  onChangeText={onChangeUnloadSearch}
                  value={searchUnload}
                />
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
                  {count < 100 ? (
                    <TouchableOpacity
                      onPress={() => setCount(count => count + 5)}>
                      <Progress.Bar
                        progress={count / completed}
                        width={null}
                        height={20}
                        color={'rgba(51, 65, 159, 0.8)'}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert('적재함 용량이 100%를 초과 했습니다.')
                      }></TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    width: '10%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text>{count}%</Text>
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
                    onPress={clearCount}>
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
                    width: '60%',
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
                    value={tons}
                    returnKeyType="send"
                    clearButtonMode="while-editing"
                    // ref={carnoRef}
                    // onSubmitEditing={() => passwordRef.current?.focus()}
                    blurOnSubmit={false}
                  />
                </View>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>톤</Text>
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
              onPress={() => Alert.alert('등록.')}>
              <Text style={styles.ButtonText}>등록</Text>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.buttonZone}
              onPress={() => navigation.navigate('Home')}>
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
