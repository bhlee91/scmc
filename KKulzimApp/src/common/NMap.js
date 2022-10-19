import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  ImageBackground, 
  View,
  Text, 
  TouchableOpacity, 
} from 'react-native';

import NaverMapView, { Circle, Marker, Path, Polygon, Polyline } from "react-native-nmap";
import Geolocation from '@react-native-community/geolocation';

function NMap({ navigation, route }) {
  const mapView = useRef(null)

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  const P0 = {
    latitude: 37.1498870,
    longitude: 127.0774620,
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: true,
        })
      },
      error => {
        console.log(error)
      },
      { 
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      },
    )
  }

  useEffect(() => {
    getCurrentLocation()
  })

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{backgroundColor: 'gray', padding: 4}}>
          <Text style={{color: 'white'}}>goBack</Text>
        </View>
      </TouchableOpacity>
      <NaverMapView 
        ref={mapView}
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{
          ...P0,
          zoom: 11,
        }}
        onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
        useTextureView>
        <Circle coordinate={P0} color={"rgba(255, 172, 64, 0.3)"} radius={7000} />
        <Marker style={{ width: 30, height: 30 }} coordinate={P0} image={require("assets/images/bee.png")} zIndex={1000} />
      </NaverMapView>
    </>
  )
}

export default NMap;