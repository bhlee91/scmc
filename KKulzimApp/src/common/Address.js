import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from "react-native";
import DaumPostcode from "react-native-daum-postcode";

function Address({ navigation, route }) {

  useEffect(() => {
    const handleBackPress = () => {
      navigation.navigate({
        name: "CargoReg",
        merge: true
      })
  
      return true
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress)

    return () => backHandler.remove();
  }, []);

  const onSelected = (data) => {
    navigation.navigate({
      name: "CargoReg", 
      params: { 
        addr: { 
          road: data.roadAddress,
          jibun: data.jibunAddress,
          buildingName: data.buildingName
        }, 
        d: route.params.d 
      },
      merge: true
    })
  }

  return (
    <View style={styles.mainView}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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