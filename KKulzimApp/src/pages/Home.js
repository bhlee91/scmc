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
  BackHandler,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {
  Card,
  Title,
  Divider,
  Paragraph,
  Badge,
  Appbar,
  Button,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from '@react-native-community/geolocation';

import { isEmpty } from "utils/CommonUtil";
import { formatMonthAndDay, formatDateTimeToString } from "utils/DateUtil";
import {
  getMainInfo,
  getRequestListInRadius
} from "api/truck/index";

function Home({ navigation, props }) {
  const [user, setUser] = useState({})
  const [cargoInfo, setCargoInfo] = useState({})
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [requestList, setRequestList] = useState([])

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      error => {
        console.log(error)
      },
      { 
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      },
    )
  }

  // truckownerUid = 4

  useEffect(() => {
    getCurrentLocation()

    const truckownerUid = 4

    getMainInfo(truckownerUid)
    .then(res => {
      setUser(res.data.owner)
      setCargoInfo(res.data.info)
    })

    /* 현위치(신영시그마2, 탄천상로 164)
    x: 위도
    y: 경도
    rad: 반경(기본값: 10, 단위: km)
    */
    const currentLocation = {
      lat: "37.3443860150331",
      lon: "127.105427987959",
      rad: "30"
    }
    
    getRequestListInRadius(currentLocation)
    .then(res => {
      setRequestList([...res.data])
    })
    .catch(err => {
      console.log(err)
    })

    const backAction = () => {
      Alert.alert('꿀짐', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
        },
        {text: '확인', onPress: () => BackHandler.exitApp()},
      ])
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  const toCargoDetail = useCallback(() => {
    navigation.navigate('CargoDetail')
  }, [navigation])

  const toRecomDetail = useCallback((param) => {
    console.log(param)
    navigation.navigate('RecomDetail')
  }, [navigation])

  return (
    <ScrollView style={styles.mainView}>
      <View style={{flex: 1, marginTop: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>
                {user?.carNumber} 차주님 안녕하세요?
              </Paragraph>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    height: 30,
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Button icon="refresh"></Button>
                </View>
                <View
                  style={{
                    height: 30,
                    width: '80%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>서울특별시 강남구 테헤란로 100(임시)</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 차주정보 끝 */}
      {/* 화물정보 */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.cargocard}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>화물정보</Paragraph>
              <Card style={styles.cargocardcontents}>
                <Card.Content>
                  <Paragraph style={styles.cargotitletext}>
                    상차 :{' '}
                    <Paragraph style={styles.recommendtext}>
                      {formatMonthAndDay(cargoInfo?.loadDt)} {cargoInfo?.departAddrSt} {isEmpty(cargoInfo?.departAddrSt2) ? "" : `(${cargoInfo?.departAddrSt2})`} 
                    </Paragraph>
                  </Paragraph>
                  <Paragraph style={styles.cargotitletext}>
                    하차 :{' '}
                    <Paragraph style={styles.recommendtext}>
                      {formatMonthAndDay(cargoInfo?.unloadDt)} {cargoInfo?.arrivalAddrSt} {isEmpty(cargoInfo?.arrivalAddrSt2) ? "" : `(${cargoInfo?.arrivalAddrSt2})`}
                    </Paragraph>
                  </Paragraph>
                  <Paragraph style={styles.cargotitletext}>
                    적재함 :
                    <Paragraph style={styles.recommendtext}>
                      {' '}
                      {cargoInfo?.spaceRate}% / 중량 : {cargoInfo?.cargoWeight}{' '}
                    </Paragraph>
                  </Paragraph>
                  <View style={styles.menuView}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1}}>
                      <Pressable
                        style={styles.buttonZone}
                        onPress={() => {
                          cargoInfo?.cargoUid ? 
                          navigation.reset({
                            index: 0, 
                            routes: [{ 
                              name: 'CargoReg', 
                              params: {
                                info: cargoInfo 
                              }
                            }]
                          }) 
                          : 
                          navigation.reset({ 
                            index: 0, 
                            routes: [{ 
                              name: 'CargoReg'
                            }]
                          })
                        }}>
                        <Text style={styles.ButtonText}>화물{cargoInfo?.cargoUid ? "수정" : "등록"}</Text>
                      </Pressable>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 화물정보끝 */}

      {/* 운송정보 */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.recommendcard}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>운송정보</Paragraph>
              <Card
                style={styles.recommendcardcontents}
                onPress={toCargoDetail}>
                <Card.Content>
                  <View style={styles.recommendView}>
                    <View style={{flex: 1, width: '45%'}}>
                      <Card>
                        <Card.Content>
                          <Paragraph style={styles.recommendtext}>
                            서울 성동구 천호동
                          </Paragraph>
                          <Paragraph style={styles.datetext}>
                            2022년 10월 05일
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                    <View style={{justifyContent: 'center', padding: 10}}>
                      <Icon
                        name="angle-double-right"
                        size={20}
                        color="#3F51B5"
                      />
                    </View>
                    <View style={{flex: 1, width: '45%'}}>
                      <Card>
                        <Card.Content>
                          <Paragraph style={styles.recommendtext}>
                            서울 성동구 천호동
                          </Paragraph>
                          <Paragraph style={styles.datetext}>
                            2022년 10월 05일
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                  </View>
                  <View style={styles.recommendView}>
                    <View style={{flex: 1, width: '50%'}}>
                      <Card
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Card.Content>
                          <Paragraph style={styles.recommendtext}>
                            운송중
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                    <View style={{flex: 1, width: '50%'}}>
                      <Card
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Card.Content>
                          <Paragraph style={styles.text}>120,000원</Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                  </View>

                  {/* 버튼 영역 수학 했을 경우에만 Display */}
                  <Divider />
                  <View>
                    <View style={styles.menuView}>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={toCargoDetail}>
                          <Text style={styles.ButtonText}>상하차 정보등록</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                  {/* 버튼 영역 수학 했을 경우에만 Display */}
                </Card.Content>
              </Card>
              {/* 단건 2번째 추천 영역 끝 */}
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 추천 화물정보끝 */}

      {/* 추천 화물정보 랭킹 탑 2 까지 보여지기 */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.recommendcard}>
            <Card.Content>
              <Paragraph style={styles.cardTitle}>추천화물정보</Paragraph>
              {/* 단건 추천 영역 */}
              {requestList?.map(req => {
                return (
                  <Card
                    key={req.reqid}
                    style={styles.recommendcardcontents}
                    onPress={() => toRecomDetail(req.reqid)}>
                    <Card.Content>
                      {/* 이미지 화물사이즈 */}
                      <View
                        style={{
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderRadius: 4,
                          marginBottom: 5,
                          borderColor: '#E0E0E0',
                          backgroundColor: '#FFFFFF',
                        }}>
                        <Image
                          source={require('/assets/images/logo11.png')}
                          style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'cover',
                            marginLeft: 2,
                            marginRight: 8,
                          }}></Image>
                        <View style={{flexDirection: 'column'}}>
                          <Text></Text>
                          <Text style={styles.recommendtitletext}>
                            크기 :{' '}
                            <Text style={styles.recommendtext}>{req.cwidth}m x {req.cverticalreal}m x {req.cheight}</Text>
                          </Text>
                          <Text style={styles.recommendtitletext}>
                            중량 : <Text style={styles.recommendtext}>{req.cweight}㎏</Text>
                          </Text>
                          <Text style={styles.recommendtitletext}>
                            체적 : <Text style={styles.recommendtext}>{(req.cwidth * req.cverticalreal * req.cheight).toFixed(1)}㎥</Text>
                          </Text>
                        </View>
                      </View>

                      {/* 이미지 화물사이즈 */}
                      <View style={styles.recommendView}>
                        <View style={{flex: 1, width: '45%'}}>
                          <Card>
                            <Card.Content>
                              <Paragraph style={styles.recommendtext}>
                                {req.depart_addr_st}
                              </Paragraph>
                              <Paragraph style={styles.datetext}>
                                {formatDateTimeToString(req.depart_datetimes)}
                              </Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                        <View style={{justifyContent: 'center', padding: 10}}>
                          <Icon
                            name="angle-double-right"
                            size={20}
                            color="#3F51B5"
                          />
                        </View>
                        <View style={{flex: 1, width: '45%'}}>
                          <Card>
                            <Card.Content>
                              <Paragraph style={styles.recommendtext}>
                                {req.arrival_addr_st}
                              </Paragraph>
                              <Paragraph style={styles.datetext}>
                                {formatDateTimeToString(req.arrival_datetimes)}
                              </Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                      </View>
                      <View style={styles.recommendView}>
                        <View style={{flex: 1, width: '50%'}}>
                          <Card
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Card.Content>
                              <Paragraph style={styles.text}>운송금액</Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                        <View style={{flex: 1, width: '50%'}}>
                          <Card
                            style={{
                              flex: 1,
                              height: 50,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Card.Content>
                              <Paragraph style={styles.text}>{req.transit_fare}원</Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                )
              })}
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 추천 화물정보끝 */}
    </ScrollView>
  );
}
export default Home;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },

  menuView: {
    flex: 1,
    flexDirection: 'row',
    // height: 100,
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    // backgroundColor: '#B3E5FC',
  },

  recommendView: {
    flexDirection: 'row',
    marginTop: 3,
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
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 3,
    // height: 140,
  },

  cargocard: {
    backgroundColor: '#FFF8E1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    // height: 550,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 5,
  },

  cargocardcontents: {
    backgroundColor: '#FFECB3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 3,
    marginBottom: 3,
    // height: 170,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  recommendcard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    // height: 550,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 5,
  },

  recommendcardcontents: {
    backgroundColor: '#FFECB3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    // height: 220,
  },

  recommendtext: {
    // color: '#536DFE',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    color: 'black',
  },
  recommendtitletext: {
    // color: '#536DFE',
    fontSize: 14,
    fontWeight: '500',
    color: '#43A047',
    marginLeft: 40,
  },

  cargotitletext: {
    // color: '#536DFE',
    fontSize: 14,
    fontWeight: '500',
    color: '#43A047',
  },
  datetext: {
    // color: '#536DFE',
    fontSize: 10,
    color: '#43A047',
    fontWeight: '500',
  },

  text: {
    // color: '#536DFE',
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },

  cardTitle: {
    color: '#43A047',
    fontSize: 16,
    fontWeight: '500',
  },

  ButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },
  buttonZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD740',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    borderRadius: 30,
  },
});
