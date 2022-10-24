import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import {
  SafeAreaView,
  FlatList,
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

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RNPickerSelect from "react-native-picker-select";

import {
  Card,
  Title,
  Divider,
  Paragraph,
  Badge,
  Appbar,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { isEmpty, formatFare } from "utils/CommonUtil";
import {
  getRequestListInRadius
} from "api/truck/index";

const divList = [
  {
    label: "거리순",
    value: "dist",
  },
  {
    label: "시간순",
    value: "reg",
  },
]

function RecomShipInfo({ navigation, route }) {
  const [div, setDiv] = useState("reg")
  const [list, setList] = useState([])

  // 오산시청 좌표
  const P0 = {
    latitude: 37.1498870,
    longitude: 127.0774620,
  }

  useEffect(() => {
    const currentLocation = {
      lat: P0.latitude,
      lon: P0.longitude,
      rad: 30,
      div: div,
      page: null,
      size: null,
    }

    getRequestListInRadius(currentLocation)
    .then(res => {
      console.log(res)
      setList([...res.data])
    })
  }, [div])

  const renderItem = ({ item }) => {
    return (
      <Card
        style={styles.recommendcardcontents}
        onPress={() => Alert.alert('상세정보로 이동')}>
        <Card.Content>
          <View style={styles.recommendView}>
            <View style={{flex: 1, width: '45%', justifyContent: 'center' }}>
              <Card>
                <Card.Content>
                  <Paragraph style={styles.recommendtext}>
                    {isEmpty(item.departAddrOld) ? item.departAddrSt : item.departAddrOld} {isEmpty(item.departAddrSt2) ? "" : `(${item.departAddrSt2})`}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Icon
                name="angle-double-right"
                size={20}
                color="#3F51B5"
              />
            </View>
            <View style={{ flex: 1, width: '45%', justifyContent: 'center' }}>
              <Card>
                <Card.Content>
                  <Paragraph style={styles.recommendtext}>
                  {item.arrivalAddrSt} {isEmpty(item.arrivalAddrSt2) ? "" : `(${item.arrivalAddrSt2})`}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </View>
          <View style={styles.recommendView}>
            <View style={{ flex: 1, width: '50%' }}>
              <Card
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Card.Content>
                  <Paragraph style={styles.recommendtext}>
                    {item.statusName}
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
            <View style={{ flex: 1, width: '50%' }}>
              <Card
                style={{
                  flex: 1,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Card.Content>
                  <Paragraph style={styles.recommendtext}>
                    {formatFare(item.transitFare)}원
                  </Paragraph>
                </Card.Content>
              </Card>
            </View>
          </View>
          <Divider />
          <View>
            <View style={styles.menuView}>
              <View style={{flex: 1}}>
                <Pressable
                  style={styles.buttonZone}
                  onPress={() => Alert.alert('운송하기')}>
                  <Text style={styles.ButtonText}>운송하기</Text>
                </Pressable>
              </View>
              <Text>{" "}</Text>
              <View style={{flex: 1}}>
                <Pressable
                  style={styles.buttonZone}
                  onPress={() => Alert.alert('지도 보기')}>
                  <Text style={styles.ButtonText}>지도보기</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    )
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <Card style={styles.recommendcard}>
        <Card.Content>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%", justifyContent: "center" }}>
              <Text 
                style={{ 
                  color: '#43A047',
                  fontSize: 16,
                  fontWeight: '500',
                }}
              >
                추천화물정보
                <Text style={{ fontSize: 14, color: "black" }}>(반경 30km)</Text>
              </Text>
            </View>
            <View style={{ display: "flex", width: "40%" }}>
              <RNPickerSelect
                value={div}
                onValueChange={(value) => setDiv(value)}
                onOpen={() => Keyboard.dismiss()}
                items={divList}
              />
            </View>
          </View>
          <View style={{ height: "91%" }}>
            <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={(item) => item.reqId}
            />
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  )
}

export default RecomShipInfo;

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
  },

  recommendView: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },

  recommendcard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottompRightRadius: 10,
    marginTop: 5,
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
  },

  recommendtext: {
    fontSize: 13,
    fontWeight: '500',
  },

  ButtonText: {
    color: '#FFFFFF',
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
})
