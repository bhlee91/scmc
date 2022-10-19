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
  Button,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';

function CustomCenter({navigation, props}) {
  const toTrTems = useCallback(() => {
    navigation.navigate('TrTerms');
  }, [navigation]);

  const toPrTerms = useCallback(() => {
    navigation.navigate('PrTerms');
  }, [navigation]);

  const toUsTerms = useCallback(() => {
    navigation.navigate('UsTerms');
  }, [navigation]);

  const data = [
    {
      id: 1,
      title: '상담원 연결',
      titleImg: (
        <Icon2 name="phone-classic" size={24} style={styles.icon}></Icon2>
      ),
      onpress: () => Linking.openURL(`tel:0424888741`),
    },
    {
      id: 2,
      title: '운송약관',
      titleImg: (
        <Icon2 name="truck-outline" size={24} style={styles.icon}></Icon2>
      ),
      onpress: toTrTems,
    },
    {
      id: 3,
      title: '이용약관',
      titleImg: <Icon3 name="file-signature" size={24} style={styles.icon} />,
      onpress: toUsTerms,
    },
    {
      id: 4,
      title: '개인정보보호방침',
      titleImg: <Icon3 name="user-shield" size={24} style={styles.icon} />,
      onpress: toPrTerms,
    },
  ];

  return (
    // <View style={styles.mainView}>
    //   <View style={styles.buttonGroup}>
    //     <View
    //       style={{
    //         flex: 1,
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}>
    //       <View style={styles.button}>
    //         <Pressable onPress={() => Linking.openURL(`tel:01012341234`)}>
    //           <Icon2 name="phone-classic" size={60} style={styles.icon}></Icon2>
    //           <Text style={styles.text}> 전화하기</Text>
    //           <Text style={styles.text}>010-1234-1234</Text>
    //         </Pressable>
    //       </View>
    //       <View style={styles.button}>
    //         <Pressable onPress={toTrTems}>
    //           <Icon2 name="truck-outline" size={60} style={styles.icon}></Icon2>
    //           <Text style={styles.text}>운송약관</Text>
    //         </Pressable>
    //       </View>
    //     </View>
    //     <View style={{flex: 1, flexDirection: 'row'}}>
    //       <View style={styles.button}>
    //         <Pressable onPress={toUsTerms}>
    //           <Icon3 name="file-signature" size={60} style={styles.icon} />
    //           <Text style={styles.text}>이용약관</Text>
    //         </Pressable>
    //       </View>
    //       <View style={styles.button}>
    //         <Pressable onPress={toPrTerms}>
    //           <Icon3 name="user-shield" size={60} style={styles.icon} />
    //           <Text style={styles.text}>개인정보호보방침</Text>
    //         </Pressable>
    //       </View>
    //     </View>
    //   </View>
    // </View>

    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon3
            name="customerservice"
            size={60}
            style={styles.imageIcon}></Icon3>
        </View>
      </View> */}

      <View style={styles.body}>
        <FlatList
          enableEmptySections={true}
          data={data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={item.onpress}>
                <View style={styles.box}>
                  {item.titleImg}
                  <Text style={styles.title}>{item.title}</Text>
                  <Icon3
                    name="angle-right"
                    color="white"
                    size={20}
                    style={styles.btn}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}
export default CustomCenter;

// const styles = StyleSheet.create({
//   mainView: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   buttonGroup: {
//     height: 200,
//     backgroundColor: '#E8EAF6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   button: {
//     flex: 1,
//     height: 100,
//     borderWidth: 0.5,
//     borderColor: '#B0BEC5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   text: {
//     // color: '#536DFE',
//     fontSize: 13,
//     fontWeight: '500',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   icon: {
//     color: '#4527A0',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFD740',
  },
  header: {
    backgroundColor: '#FFD740',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  // imageIcon: {
  //   width: 130,
  //   height: 130,

  //   borderWidth: 4,
  //   borderColor: '#FF6347',
  //   marginBottom: 10,
  // },

  icon: {
    marginLeft: 5,
    marginTop: 5,
    width: 30,
    height: 30,
    color: '#ffffff',
    alignSelf: 'center',
  },
  title: {
    fontSize: 15,
    color: '#ffffff',
    marginLeft: 4,
    alignSelf: 'center',
  },
  btn: {
    marginLeft: 'auto',
    marginTop: 5,
    width: 30,
    height: 30,
  },
  body: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#FFD740',
  },
  box: {
    padding: 5,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 20,
    backgroundColor: '#000000',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#E0E0E0',

    // shadowColor: 'black',
    // shadowOpacity: 0.2,
    // shadowOffset: {
    //   height: 1,
    //   width: -2,
    // },
    // elevation: 2,
  },
});
