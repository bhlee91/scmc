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
  Text,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';


import {Card, Title, Divider, Paragraph, Badge} from 'react-native-paper';
import { getProductList } from '../api/product';
import { formatFare } from '../utils/CommonUtil';

function PaymentMgt({navigation}) {
  const [isFree, SetIsFree] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() =>{
    getProductList('Y')
    .then(res => {
      console.log(res.data)
      setProductInfo(res.data)
    })
  },[])

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
                        {/* 상품 Looping */}
                        {productInfo.map(item => {
                          return(
                            <Card.Content key={item.productUid}>
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
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    width:'30%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 0.5,
                                    padding: 5,
                                    borderColor: '#B0BEC5',
                                  }}>
                                  <Text style={styles.text}>{item.productName}</Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexBasis:'auto',
                                    width: '70%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 0.5,
                                    padding: 5,
                                    borderColor: '#B0BEC5',
                                    content: 'auto'
                                  }}>
                                  <Text style={styles.text}>
                                    {formatFare(item.price)}원({item.discountRate}% 할인)
                                  </Text>
                                </View>
                              </View>
                              
                            </View>
                          </Card.Content>
                        )
                        {/* 상품 Looping  끝*/}
                        })}
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
    backgroundColor: '#000000',
    borderRadius:10,
    height: 50,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
});
