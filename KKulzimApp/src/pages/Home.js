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

function Home({navigation, props}) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('꿀짐', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
        },
        {text: '확인', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView style={styles.mainView}>
      {/* <Appbar.Header style={{height: 50}}>
        <Appbar.Content
          style={{
            fontSize: 20,
            color: '#FFFFFF',
            fontWeight: 600,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title="꿀짐"
        />
        <Appbar.Action icon="logout" onPress={() => {}} />
      </Appbar.Header> */}
      <View style={{flex: 1, marginTop: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Title title=" XX가0000 차주님 안녕하세요?" />
            <Card.Content>
              <View style={{flex: 1, flexDirection: 'row', width: 300}}>
                <View
                  style={{
                    height: 40,
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Button icon="refresh"></Button>
                </View>
                <View
                  style={{
                    height: 40,
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>서울특별시 강남구 테헤란로 100</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 차주정보 */}
      {/* <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.card}>
            <Card.Title title="차주정보" />
            <Card.Content>
              <Paragraph style={styles.text}>
                XX가0000 차주님 안녕하세요?
              </Paragraph>
              <Divider />
              <View style={styles.menuView}>
                <View style={{flex: 1, height: 50}}>
                  <Pressable
                    style={styles.buttonZone}
                    // onPress={() => Alert.alert('마이페이지로 이동합니다.')}>
                    onPress={() => {
                      navigation.navigate('마이페이지');
                    }}>
                    <Text style={styles.ButtonText}>마이페이지</Text>
                  </Pressable>
                </View>
                <View style={{flex: 1, height: 50}}>
                  <Pressable style={styles.buttonZone}>
                    <Text style={styles.ButtonText}>로그아웃</Text>
                  </Pressable>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View> */}
      {/* 차주정보 끝 */}
      {/* 화물정보 */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.cargocard}>
            <Card.Title title="화물정보" />
            <Card.Content>
              <Paragraph style={styles.text}>
                상차 : 00월 00일 서울특별시 성동구 용납동
              </Paragraph>
              <Paragraph style={styles.text}>
                하차 : 00월 00일 경기도 성남시 구미동
              </Paragraph>
              <Paragraph style={styles.text}>
                적재함: 00% / 중량 : 1톤{' '}
              </Paragraph>
              <Divider />
              <View style={styles.menuView}>
                <View style={{flex: 1}}></View>
                <View style={{flex: 1}}>
                  <Pressable
                    style={styles.buttonZone}
                    onPress={() => {
                      navigation.navigate('화물등록');
                    }}>
                    <Text style={styles.ButtonText}>화물등록</Text>
                  </Pressable>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
      {/* 화물정보끝 */}

      {/* 추천 화물정보 랭킹 탑 2 까지 보여지기 */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Card style={styles.recommendcard}>
            <Card.Title title="추천화물정보" />
            <Card.Content>
              {/* 단건 추천 영역 */}
              <Card
                style={styles.recommendcardcontents}
                onPress={() => Alert.alert('상세정보로 이동')}>
                <Card.Content>
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

                  {/* 버튼 영역 수학 했을 경우에만 Display */}
                  <Divider />
                  {/* <View>
                    <View style={styles.menuView}>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={() => Alert.alert('상차 버튼.')}>
                          <Text style={styles.ButtonText}>상차</Text>
                        </Pressable>
                      </View>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={() => Alert.alert('하차 버튼.')}>
                          <Text style={styles.ButtonText}>하차</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View> */}
                  {/* 버튼 영역 수학 했을 경우에만 Display */}
                </Card.Content>
              </Card>
              {/* 단건 추천 영역 */}

              {/* 단건 2번째 추천 영역 */}
              <Card
                style={styles.recommendcardcontents}
                onPress={() => Alert.alert('상세정보로 이동')}>
                <Card.Content>
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

                  {/* 버튼 영역 수학 했을 경우에만 Display */}
                  <Divider />
                  <View>
                    <View style={styles.menuView}>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={() => Alert.alert('상차 버튼.')}>
                          <Text style={styles.ButtonText}>상차</Text>
                        </Pressable>
                      </View>
                      <View style={{flex: 1}}>
                        <Pressable
                          style={styles.buttonZone}
                          onPress={() => Alert.alert('하차 버튼.')}>
                          <Text style={styles.ButtonText}>하차</Text>
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
export default Home;

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
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 5,
    // height: 140,
  },

  cargocard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    // height: 170,
    borderWidth: 0.5,
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
    fontWeight: '500',
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
