import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';

import { useSelector } from 'react-redux';
import NaverMapView, { Path, Align, Circle, Marker } from "react-native-nmap";
import Geolocation from '@react-native-community/geolocation';

import { driving } from 'api/openapi/index'

function NMap({ navigation, route }) {
  const user = useSelector((state) => state.user)
  const mapView = useRef(null)
  
  // 오산시청
  const P0 = {
    latitude: 37.1498870,
    longitude: 127.0774620,
  }

  const departMarkerClick = () => {
    console.log('depart Marker')
    console.log(route.params.depart)
  }

  const arrivalMarkerClick = () => {
    console.log('arrival Marker')
    console.log(route.params.arrival)
  }

  useEffect(() => {
    if (route.params?.depart !== undefined && route.params?.arrival !== undefined) {
      const start = `${route.params.depart.longitude},${route.params.depart.latitude}`
      const goal = `${route.params.arrival.longitude},${route.params.arrival.latitude}`

      driving(start, goal)
      .then(res => {
        console.log(res)
      })
    }
  }, [])

  const onTouch = (event) => {
    console.log('onTouch', JSON.stringify(event.nativeEvent))
  }

  const onCameraChange = (event) => {
    console.log('onCameraChange', JSON.stringify(event))
  }

  const onMapClick = (event) => {
    console.log('onMapClick', JSON.stringify(event))
  }

  return (
    <View>
      <NaverMapView 
        ref={mapView}
        style={{ width: '100%', height: '100%' }}
        showsMyLocationButton={true}
        center={{
          ...P0,
          zoom: 9,
        }}
        // onTouch={e => onTouch(e)}
        // onCameraChange={e => onCameraChange(e)}
        // onMapClick={e => onMapClick(e)}
        useTextureView>
        <Circle coordinate={P0} color={"rgba(255, 172, 64, 0.3)"} radius={30000} />
        <Marker style={{ width: 30, height: 30 }} coordinate={P0} image={require("assets/images/bee.png")} zIndex={1000} caption={{ text: "현위치", textSize: 17 }}/>
        {
          route.params?.depart !== undefined && route.params?.arrival !== undefined ?
          (
            <>
              {/* 상차지 */}
              <Marker 
                style={{ width: 30, height: 30 }} 
                coordinate={route.params.depart} 
                image={require("assets/images/bee.png")} 
                zIndex={1000}
                caption={{
                  text: "상차지",
                  align: Align.Top,
                  color: "#EF6C00",
                }}
                onClick={() => departMarkerClick()}
              />
              {/* 하차지 */}
              <Marker 
                style={{ width: 30, height: 30 }} 
                coordinate={route.params.arrival} 
                image={require("assets/images/bee.png")} 
                zIndex={1000}
                caption={{
                  text: "하차지",
                  align: Align.Top,
                  color: "#EF6C00",
                }}
                onClick={() => arrivalMarkerClick()}
              />
            </>
          )
          :
          null
        }
      </NaverMapView>
    </View>
  )
}

export default NMap;