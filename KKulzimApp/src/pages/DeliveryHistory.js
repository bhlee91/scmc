import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  ActivityIndicator,
  Platform,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import store from '../../src/store';
import {Card, Title, Divider, Paragraph, Badge} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMyTransit } from '../api/cargo';

function DeliveryHistoy({navigation}) {
  const toGoDetail = useCallback(() => {
    navigation.navigate('CargoDetail');
  }, [navigation]);

  const truckownerUid = store.getState().user.truckownerUid;

  useEffect(() =>{
    getMyTransit(truckownerUid)
    .then(res => {
      console.log(res)
    })
  },[])

  return (
    <ScrollView style={styles.mainView}>
      {/* 추천 화물정보 랭킹 탑 2 까지 보여지기 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.recommendcard}>
            <Card.Content>
              {/* 히스토리 Looping */}

              <Card style={styles.recommendcardcontents} onPress={toGoDetail}>
                <Card.Content>
                  <Paragraph style={styles.recommendtext}>
                    2022년 10월 01일 00시 00분
                  </Paragraph>
                  <View style={styles.recommendView}>
                    <View style={{flex: 1, width: '45%'}}>
                      <Card>
                        <Card.Content>
                          <Paragraph style={styles.recommendtext}>
                            서울 성동구 천호동
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
                            운송완료
                          </Paragraph>
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
                          <Paragraph style={styles.recommendtext}>
                            120,000원
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                  </View>
                </Card.Content>
              </Card>

              <Card
                style={styles.recommendcardcontents}
                onPress={() => Alert.alert('상세정보로 이동')}>
                <Card.Content>
                  <Paragraph style={styles.recommendtext}>
                    2022년 10월 01일 00시 00분
                  </Paragraph>
                  <View style={styles.recommendView}>
                    <View style={{flex: 1, width: '45%'}}>
                      <Card>
                        <Card.Content>
                          <Paragraph style={styles.recommendtext}>
                            서울 성동구 천호동??
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
                            운송완료
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
                          <Paragraph style={styles.recommendtext}>
                            120,000원
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </View>
                  </View>
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
export default DeliveryHistoy;

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

  recommendView: {
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
    // borderBottomLeftRadius: 10,
    // borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 5,
    height: 120,
  },

  recommendcard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginTop: 0,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },

  recommendcardcontents: {
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

  recommendtext: {
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
    height: 50,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
});
