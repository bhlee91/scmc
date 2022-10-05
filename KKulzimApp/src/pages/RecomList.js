import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

function RecomList() {
  const DATA3 = [
    {
      id: 1,
      addr1: '서울특별시 강남구 테레란로 200',
      loaddate: '2022년 10월 11일',
      addr2: '경기도 성남시 탄천상로 11111',
      unloaddate: '2022년 10월 11일',
      price: '100,000',
      img: require('/assets/images/logo11.png'),
    },
    {
      id: 2,
      addr1: '서울특별시 강남구 테레란로 200',
      loaddate: '2022년 10월 11일',
      addr2: '경기도 성남시 탄천상로 11111',
      unloaddate: '2022년 10월 11일',
      price: '100,000',
      img: require('/assets/images/logo11.png'),
    },
    {
      id: 3,
      addr1: '서울특별시 강남구 테레란로 200',
      loaddate: '2022년 10월 11일',
      addr2: '경기도 성남시 탄천상로 11111',
      unloaddate: '2022년 10월 11일',
      price: '100,000',
      img: require('/assets/images/logo11.png'),
    },
    {
      id: 4,
      addr1: '서울특별시 강남구 테레란로 200',
      loaddate: '2022년 10월 11일',
      addr2: '경기도 성남시 탄천상로 11111',
      unloaddate: '2022년 10월 11일',
      price: '100,000',
      img: require('/assets/images/logo11.png'),
    },
    {
      id: 5,
      addr1: '서울특별시 강남구 테레란로 200',
      loaddate: '2022년 10월 11일',
      addr2: '경기도 성남시 탄천상로 11111',
      unloaddate: '2022년 10월 11일',
      price: '100,000',
      img: require('/assets/images/logo11.png'),
    },
    {
      id: 6,
      addr1: '서울특별시 강남구 테레란로 200',
      loaddate: '2022년 10월 11일',
      addr2: '경기도 성남시 탄천상로 11111',
      unloaddate: '2022년 10월 11일',
      price: '100,000',
      img: require('/assets/images/logo11.png'),
    },
  ];

  //멤버 메소드 - FlatList의 renderItem용
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.itemView}
        onPress={() => {
          alert(item.name);
        }}>
        <Image source={item.img} style={style.itemImg}></Image>
        <View style={{flexDirection: 'column'}}>
          <Text style={style.itemaddr}>
            상차지 : <Text style={style.innerText}> {item.addr1}</Text>
          </Text>
          <Text style={style.itemaddr}>상차일시 : {item.loaddate}</Text>
          <Text style={style.itemaddr}>
            하차지 : <Text style={style.innerText}> {item.addr2}</Text>
          </Text>
          <Text style={style.itemaddr}>하차일시 : {item.unloaddate}</Text>
          <Text style={style.itemprice}>운송가격 : {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.root}>
      <FlatList
        data={DATA3}
        renderItem={renderItem}
        // FlatList의 속성: 각 요소에 키를 추출해주는 콜백함수 지정
        keyExtractor={item => item.id}></FlatList>
    </View>
  );
}
export default RecomList;

const style = StyleSheet.create({
  root: {flex: 1, padding: 10},
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 16,
    backgroundColor: '#E0F2F1',
  },
  itemView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    marginBottom: 5,
  },
  itemImg: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 8,
  },
  itemaddr: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemprice: {
    fontSize: 13,
    color: 'red',
    fontWeight: '500',
  },

  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    fontSize: 13,
    color: 'blue',
  },
});
