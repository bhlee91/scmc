import React, { useCallback, useState, useEffect } from 'react';
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
import {Card, Title, Divider, Paragraph, Badge, Chip} from 'react-native-paper';

import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer'; //사이즈가 커 리사이징 필요
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isEmpty, formatFare } from "utils/CommonUtil";
import { formatDateTimeToKorea } from "utils/DateUtil";
import {
  getCargoRequestDetail
} from "api/cargo/index";
import {
  setRequestTransportConfirm
} from "api/truck/index";

function RecomDetail({ navigation, route }) {
  const [detail, setDetail] = useState({
    images: []
  })

  useEffect(() => {
    if (!isEmpty(route.params.reqId)) {
      getCargoRequestDetail(route.params.reqId)
      .then(res => {
        setDetail(() => res.data)
        console.log(detail)
      })
    }
  }, [route.params?.reqId])

  const handleRequestConfirm = () => {
    const obj = {
      reqId: route.params.reqId,
      truckownerUid: route.params.truckownerUid,
    }

    setRequestTransportConfirm(obj)
    .then(res => {
      if (res.data) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }]
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getExRoute = async () => {
    console.log('getExRoute')
    // const depart = [detail.departLongitude, detail.departLatitude]
    // const arrival = [detail.arrivalLongitude, detail.arrivalLatitude]
    await axios.get(`https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${detail.departLongitude},${detail.departLatitude}&goal=${detail.arrivalLongitude},${detail.arrivalLatitude}`,
    {
      headers: {
        Accept:'application/json',
        'X-NCP-APIGW-API-KEY-ID': '205xj64cr0', 
        'X-NCP-APIGW-API-KEY': 'fKCrRKmTNrI3JWOYjzOITzkWpqb97mO3XutBDa9n',
        'Content-Type':'application/json'
        },

      // params: {
      //   start: `${detail.departLongitude},${detail.departLatitude}`,//depart,
      //   goal: `${detail.arrivalLongitude},${detail.arrivalLatitude}`,//arrival,
      //   option: 'trafast'
      // }
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err.response)
    })
  }
  
  return (
    <ScrollView style={styles.mainView}>
      {/* 화물정보 */}
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, height: '16%' }}>
        <View style={{ flex: 1 }}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Title style={styles.title}>화물정보</Title>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderRadius: 4,
                  marginBottom: 5,
                  borderColor: '#E0E0E0',
                }}>
                <Image
                  source={detail?.images.length === 0 ? require('/assets/images/logo11.png') : (detail?.images[0].contents === null ? require('/assets/images/logo11.png') : { uri: detail?.images[0].contents })}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'cover',
                    marginRight: 8,
                  }}></Image>
                <View style={{flexDirection: 'column'}}>
                  <Text></Text>
                  <Text style={styles.recommendtitletext}>
                    크기 :{' '}
                    <Text style={styles.recommendtext}>{detail?.cwidth}m x {detail?.cverticalreal}m x {detail?.cheight}</Text>
                  </Text>
                  <Text style={styles.recommendtitletext}>
                    중량 : <Text style={styles.recommendtext}>{detail?.cweight}㎏</Text>
                  </Text>
                  <Text style={styles.recommendtitletext}>
                    체적 : <Text style={styles.recommendtext}>{(detail?.cwidth * detail?.cverticalreal * detail?.cheight).toFixed(1)}㎥</Text>
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 화물정보 끝 */}
      {/* 상하차지 정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Paragraph style={styles.title}>상하차정보</Paragraph>
              <View style={styles.elem}>
                <Card style={styles.detailcardcontents}>
                  <Card.Content>
                    <Paragraph style={styles.title}>상차지</Paragraph>
                    <Paragraph
                      style={{
                        padding: 5,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {detail?.departAddrSt} {isEmpty(detail?.departAddrSt2) ? "" : `(${detail?.departAddrSt2})`} 
                    </Paragraph>
                    <Paragraph
                      style={{
                        padding: 5,
                        fontSize: 14,
                        color: '#43A047',
                      }}>
                      {formatDateTimeToKorea(detail?.departDatetimes)}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
              <Divider />
              <View style={styles.elem}>
                <Card style={styles.detailcardcontents}>
                  <Card.Content>
                    <Paragraph style={styles.title}>하차지</Paragraph>
                    <Paragraph
                      style={{
                        padding: 5,
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {detail?.arrivalAddrSt} {isEmpty(detail?.arrivalAddrSt2) ? "" : `(${detail?.arrivalAddrSt2})`} 
                    </Paragraph>
                    <Paragraph
                      style={{
                        padding: 5,
                        fontSize: 14,
                        color: '#43A047',
                      }}>
                      {formatDateTimeToKorea(detail?.arrivalDatetimes)}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
              <Divider />
              <View>
                <View style={styles.menuView}>
                  <View style={{flex: 1}}>
                    <Pressable
                      style={styles.buttonZone}
                      onPress={getExRoute}>
                        {/* () => Alert.alert('T-map 로직') */}
                      <Text style={styles.buttonText}>예상경로</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 상하차지 정보 끝 */}

      {/* 운송비용 및 화주 정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#43A047',
                }}>
                운송비용 : {formatFare(detail?.transitFare)}원
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#43A047'
                }}>
                화주정보
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                상차지연락처 :{' '}
                <Paragraph
                  style={{
                    padding: 5,
                    fontSize: 14,
                  }}>
                  {detail?.receiverPhone}
                </Paragraph>
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                하차지연락처 :{' '}
                <Paragraph
                  style={{
                    padding: 5,
                    fontSize: 14,
                  }}>
                  {''}
                </Paragraph>
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* 기타 정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#43A047',
                }}>
                기타정보
              </Paragraph>
              <Divider />

              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                상차방법 :{' '}
                <Paragraph
                  style={{
                    padding: 5,
                    fontSize: 14,
                  }}>
                  {detail?.loadMethodName}
                </Paragraph>
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                하차방법 :{' '}
                <Paragraph
                  style={{
                    padding: 5,
                    fontSize: 14,
                  }}>
                  {detail?.unloadMethodName}
                </Paragraph>
              </Paragraph>

              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                각종증명서 발급여부 :{' '}
                <Paragraph
                  style={{
                    padding: 5,
                    fontSize: 14,
                  }}>
                  해당없음
                </Paragraph>
              </Paragraph>
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
              style={styles.bottomButtonZone}
              onPress={() => 
                Alert.alert('꿀짐', '진행하시겠습니까?', [
                  { text: '확인', onPress: () => handleRequestConfirm() },
                  { text: '취소', onPress: () => { return }, },
                ])
              }
            >
              <Text style={styles.buttonText}>운송하기</Text>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.bottomButtonZone}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>이전</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* 버튼 영역 수학 했을 경우에만 Display */}
      {/* 하차지 정보 끝 */}
    </ScrollView>
  );
}

export default RecomDetail;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },

  menuView: {
    flex: 1,
    flexDirection: 'row',
    // height: 100,
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    // backgroundColor: '#B3E5FC',
  },

  detailcard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 0,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  detailcardcontents: {
    backgroundColor: '#E8EAF6',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    width: '100%',
    height: 120,
  },

  text: {
    fontSize: 13,
    fontWeight: '500',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '300',
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

  bottomButtonZone: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD740',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  elem: {
    marginTop: 5,
    width: '100%',
    height: 120,
    flexDirection: 'row',
  },
  
  title: {
    fontSize: 15,
    color: '#43A047',
  },

  recommendtext: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
    color: 'black',
  },

  recommendtitletext: {
    fontSize: 14,
    marginLeft: 40,
    fontWeight: '500',
    color: '#43A047',
  },
})
