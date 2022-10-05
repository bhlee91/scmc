import React from 'react';
import { View, Text, StyleSheet, BackHandler } from "react-native";
import DaumPostcode from "react-native-daum-postcode";

function Address({ navigation, route }) {

  const onSelected = (data) => {
    console.log(data.roadAddress)
    console.log(data.jibunAddress)

    navigation.navigate({
      name: "CargoReg", 
      params: { 
        addr: { 
          road: data.roadAddress,
          jibun: data.jibunAddress,
        }, 
        d: route.params.d 
      },
      merge: true
    })
  }

  const handleBackPress = () => {
    navigation.navigate({
      name: "CargoReg",
      merge: true
    })

    return true
  }

  this.BackHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)

  return (
    <View style={styles.mainView}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>자택주소 수정하기</Text>
        <DaumPostcode
          style={{ width: 400, height: 200 }}
          jsOptions={{ animated: true }}
          onSelected={onSelected}
        />
      </View>
    </View>
  )
}

export default Address;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});