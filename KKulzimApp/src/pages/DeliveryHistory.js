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

import { formatFare } from '../utils/CommonUtil';
import store from '../../src/store';
import {Card, Title, Divider, Paragraph, Badge} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { getMyTransit } from '../api/cargo';
import { formatDateTimeToKorea, formatStringToDateTime } from '../utils/DateUtil';

function DeliveryHistoy({navigation}) {
  const [info, setInfo] = useState([]);
  const truckownerUid = store.getState().user.truckownerUid;
  
  useEffect(() =>{
    getMyTransit(truckownerUid)
    .then(res => {
      res.data.map(obj => {
        getColValue(obj.hist)
        setInfo(obj.hist)
      })
    })
  },[])

  const toGoDetail = useCallback((param) => {
    navigation.navigate('CargoDetail', {reqId: param});
  }, [navigation]);

  // const toGoDetail = (param) =>{
  //   navigation.navigate('CargoDetail', {reqId: param});
  // }

  const getColValue = (data) => {
    data.map((obj) => {
      switch(obj.status) {
        case 'RO' :
          return obj.status = '준비/등록중'
        case 'MO' :
          return obj.status = '최적차량검색'
        case 'MF' :
          return obj.status = '매칭완료'
        case 'LC' :
          return obj.status = '상차완료'
        case 'TO' :
          return obj.status = '운송중'
        case 'UC' :
          return obj.status = '하차완료'          
        case 'TF' :
          return obj.status = '운송완료'
        case 'TN' :
          return obj.status = '운송취소'
      }
    });

    data.map((obj) =>{
      obj.reqId = obj.request.reqId
    })
  }

  return (
    <ScrollView style={styles.mainView}>
      {/* 추천 화물정보 랭킹 탑 2 까지 보여지기 */}
      <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
        <View style={{flex: 1}}>
          <Card style={styles.recommendcard}>
            <Card.Content>
              {/* 히스토리 Looping */}
              {info.map(item => {
                const reqId = item.reqId
                return(
                  <Card style={styles.recommendcardcontents} onPress={() => toGoDetail(reqId)} key={item.histUid}>
                    <Card.Content>
                      <Paragraph style={styles.recommendtext}>
                        {formatDateTimeToKorea(item.request.arrivalDatetimes)}
                      </Paragraph>
                      <View style={styles.recommendView}>
                        <View style={{flex: 1, width: '45%'}}>
                          <Card>
                            <Card.Content>
                              <Paragraph style={styles.recommendtext}>
                                {item.request.departAddrSt}
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
                                {item.request.arrivalAddrSt}
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
                                {item.status}
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
                                {formatFare(item.request.transitFare)} 원
                              </Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                );
              })}
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
