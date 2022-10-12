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
import { convertDateTime, formatDateTimeToString } from "utils/DateUtil";
import {
  getCargoRequestDetail
} from "api/cargo/index";

function RecomDetail({ navigation, route }) {
  const [detail, setDetail] = useState({})

  useEffect(() => {
    if (!isEmpty(route.params.reqId)) {
      getCargoRequestDetail(route.params.reqId)
      .then(res => {
        setDetail(() => res.data)
      })
    }
  }, [route.params?.reqId])

  return (
    <ScrollView style={styles.mainView}>
      {/* 화물정보 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.detailcard}>
            <Card.Content>
              <Title style={styles.title2}>화물정보</Title>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderRadius: 4,
                  marginBottom: 5,
                  borderColor: '#E0E0E0',
                }}>
                <Image
                  source={detail?.images === undefined ? require('/assets/images/logo11.png') : { uri: detail?.images[0].contents }}
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
              <Paragraph style={styles.title2}>상하자정보</Paragraph>
              <View style={styles.elem}>
                <Card style={styles.detailcardcontents}>
                  <Card.Content>
                    <Paragraph style={styles.title2}>상차지</Paragraph>
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
                        color: 'blue',
                      }}>
                      {convertDateTime(detail?.departDatetimes)}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
              <Divider />
              <View style={styles.elem}>
                <Card style={styles.detailcardcontents}>
                  <Card.Content>
                    <Paragraph style={styles.title2}>하차지</Paragraph>
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
                        color: 'blue',
                      }}>
                      {convertDateTime(detail?.arrivalDatetimes)}
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
                      onPress={() => Alert.alert('T-map 로직')}>
                      <Text style={styles.ButtonText}>예상경로</Text>
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
                  color: 'blue',
                }}>
                운송비용 : {formatFare(detail?.transitFare)}원
              </Paragraph>
              <Divider />
              <Paragraph
                style={{
                  padding: 5,
                  fontSize: 16,
                  fontWeight: 'bold',
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
                  color: 'blue',
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
              style={styles.buttonZone}
              onPress={() => Alert.alert('운송하기 로직')}>
              <Text style={styles.ButtonText}>운송하기</Text>
            </Pressable>
          </View>
          <View style={{flex: 1}}>
            <Pressable
              style={styles.buttonZone}
              onPress={() => navigation.goBack()}>
              <Text style={styles.ButtonText}>이전</Text>
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

  detailview: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    backgroundColor: 'green',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 5,
    height: 120,
  },

  detailcard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginTop: 0,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  detailcardcontents: {
    backgroundColor: '#E8EAF6',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    width: '100%',
    // height: 220,
  },

  detailtext: {
    // color: '#536DFE',
    fontSize: 13,
    fontWeight: '500',
  },

  text: {
    // color: '#536DFE',
    fontSize: 13,
    fontWeight: '500',
  },

  cardTitle: {
    color: '#303F9F',
    fontSize: 20,
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
  info: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infotext: {
    padding: 2,
  },
  title: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
    fontSize: 15,
    color: 'blue',
  },
  title2: {
    fontSize: 15,
    color: 'blue',
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
    marginLeft: 40,
    fontWeight: '500',
    color: '#43A047',
  },
});
