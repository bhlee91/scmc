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
import RadioGroup from 'react-native-radio-buttons-group';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {Card, Title, Divider, Paragraph, Badge} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

function PaymentMgt({navigation}) {
  const [isFree, SetIsFree] = useState(false);

  // const radioButtonsData = [
  //   {
  //     id: '1',
  //     label: '1개월',
  //     value: '1mon',
  //     labelStyle: {
  //       fontSize: 13,
  //     },
  //     size: 16,
  //   },
  //   {
  //     id: '2',
  //     label: '2개월',
  //     value: '2mon',
  //     labelStyle: {
  //       fontSize: 13,
  //     },
  //     size: 16,
  //   },
  //   {
  //     id: '3',
  //     label: '3개월',
  //     value: '3mon',
  //     labelStyle: {
  //       fontSize: 13,
  //     },
  //     size: 16,
  //   },
  //   {
  //     id: '4',
  //     label: '6개월',
  //     value: '6mon',
  //     labelStyle: {
  //       fontSize: 13,
  //     },
  //     size: 16,
  //   },
  // ];

  return (
    <ScrollView style={styles.mainView}>
      {/* 추천 화물정보 랭킹 탑 2 까지 보여지기 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Content>
              {/* 유료무료 영억 */}
              <Card style={styles.cardcontents}>
                <Card.Content>
                  <View style={styles.view}>
                    <View style={{flex: 1}}>
                      <Card
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Card.Content>
                          <Paragraph style={styles.text}>
                            {isFree
                              ? '현재 차주님은 무료회원이십니다.'
                              : '현재 차주님은 유료회원이십니다.'}
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                  </View>

                  {/* 유료전환 버튼 */}
                  <Divider />
                  <View>
                    <View style={styles.menuView}>
                      <View style={{flex: 1}}></View>
                      <View style={{flex: 1}}>
                        {isFree ? (
                          <Pressable
                            style={styles.buttonZone}
                            onPress={() => Alert.alert('유료회원전환')}>
                            <Text style={styles.ButtonText}>유료회원전환</Text>
                          </Pressable>
                        ) : (
                          <Pressable
                            style={styles.buttonZone}
                            onPress={() => Alert.alert('기간연장')}>
                            <Text style={styles.ButtonText}>기간연장</Text>
                          </Pressable>
                        )}
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                  </View>
                  {/* 유료전환 버튼 */}
                </Card.Content>
              </Card>
              {/* 단건 추천 영역 */}

              {/* 단건 2번째 추천 영역 */}
              <Card style={styles.cardcontents}>
                <Card.Content>
                  <View style={styles.view}>
                    <View style={{flex: 1}}>
                      <Card
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Card.Content>
                          <View
                            style={{
                              // backgroundColor: '#E8EAF6',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* 상품 Looping */}
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '30%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 0.5,
                                  padding: 5,
                                  borderColor: '#B0BEC5',
                                }}>
                                <Text style={styles.text}>1개월</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '70%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 0.5,
                                  padding: 5,
                                  borderColor: '#B0BEC5',
                                }}>
                                <Text style={styles.text}>
                                  9,000원(10% 할인)
                                </Text>
                              </View>
                            </View>
                            {/* 2번째 상품 */}
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '30%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 0.5,
                                  padding: 5,
                                  borderColor: '#B0BEC5',
                                }}>
                                <Text style={styles.text}>2개월</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '70%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 0.5,
                                  padding: 5,
                                  borderColor: '#B0BEC5',
                                }}>
                                <Text style={styles.text}>
                                  17,000원(15% 할인)
                                </Text>
                              </View>
                            </View>

                            {/* 3번째 상품 */}
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '30%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 0.5,
                                  padding: 5,
                                  borderColor: '#B0BEC5',
                                }}>
                                <Text style={styles.text}>3개월</Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '70%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 0.5,
                                  padding: 5,
                                  borderColor: '#B0BEC5',
                                }}>
                                <Text style={styles.text}>
                                  26,000원(20% 할인)
                                </Text>
                              </View>
                            </View>

                            {/* 상품 Looping  끝*/}
                          </View>
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
                          onPress={() => Alert.alert('결제하기 버튼.')}>
                          <Text style={styles.ButtonText}>결제하기</Text>
                        </Pressable>
                      </View>

                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={() => navigation.pop()}>
                          <Text style={styles.ButtonText}>취소</Text>
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
    </ScrollView>
  );
}
export default PaymentMgt;

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
    height: 50,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
});
