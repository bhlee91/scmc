import React, { useState, useRef } from 'react';
import {
  ScrollView, 
  View,
  Text,
  TouchableOpacity, 
} from 'react-native';

import NaverMapView, { Marker } from "react-native-nmap";

function MapViewScreen2({navigation}) {
  const P0 = {latitude: 37.564362, longitude: 126.977011}

  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack}>
        <View style={{backgroundColor: 'gray', padding: 4}}>
          <Text style={{color: 'white'}}>goBack</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <Text>scrollGesturesEnabled: default</Text>
        <NaverMapView 
          style={{width: '100%', height: 200}}
          center={{...P0, zoom: 15}}
          useTextureView
          liteModeEnabled>
          <Marker coordinate={P0}/>
        </NaverMapView>
        {Array.from({length: 10}, (_, i) => i).map(i => <Text key={i}></Text>)}
        <Text>scrollGesturesEnabled</Text>
        <NaverMapView 
          style={{width: '100%', height: 200}}
          center={{...P0, zoom: 15}}
          scrollGesturesEnabled
          useTextureView
          liteModeEnabled>
          <Marker coordinate={P0}/>
        </NaverMapView>
        {Array.from({length: 10}, (_, i) => i).map(i => <Text key={i}></Text>)}
        <Text>scrollGesturesEnabled: false</Text>
        <NaverMapView 
          style={{width: '100%', height: 200}}
          center={{...P0, zoom: 15}}
          scrollGesturesEnabled={false}
          useTextureView
          liteModeEnabled>
          <Marker coordinate={P0}/>
        </NaverMapView>
        {Array.from({length: 10}, (_, i) => i).map(i => <Text key={i}></Text>)}
      </ScrollView>
    </View>
  )
}

export default MapViewScreen2;