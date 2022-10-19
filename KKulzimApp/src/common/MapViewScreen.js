import React, { useRef } from 'react';
import {
  Image,
  ImageBackground, 
  View,
  Text, 
  TouchableOpacity, 
} from 'react-native';

import NaverMapView, { Circle, Marker, Path, Polygon, Polyline } from "react-native-nmap";

function MapViewScreen({ navigation }) {
  const mapView = useRef(null);

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};
  const P4 = {latitude: 37.564834, longitude: 126.977218};
  const P5 = {latitude: 37.562834, longitude: 126.976218};

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
        center={{...P0, zoom: 12}}
        onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
        useTextureView>
        <Marker coordinate={P1} pinColor="blue" zIndex={1000} onClick={() => console.log('onClick! p1')}/>
        <Marker coordinate={P2} pinColor="red" zIndex={100} alpha={0.5} onClick={() => console.log('onClick! p2')}/>
        <Marker coordinate={P4} onClick={() => console.log('onClick! p4')} image={require("assets/images/bee.png")} width={48} height={48}/>
        <Path coordinates={[P0, P1]} onClick={() => console.log('onClick! path')} width={10}/>
        <Polyline coordinates={[P1, P2]} onClick={() => console.log('onClick! polyline')}/>
        <Circle coordinate={P0} color={"rgba(255, 172, 64, 0.3)"} radius={5000} onClick={() => console.log('onClick! circle')}/>
        <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.log('onClick! polygon')}/>
        <Marker coordinate={P5} onClick={() => console.log('onClick! p0')} width={96} height={96}>
          <View style={{backgroundColor: 'rgba(255,0,0,0.2)', borderRadius: 80}}>
            <View style={{backgroundColor: 'rgba(0,0,255,0.3)', borderWidth: 2, borderColor: 'black', flexDirection: 'row'}}>
              <Image source={require("assets/images//bee.png")} style={{
                width: 32, height: 32,
                backgroundColor: 'rgba(0,0,0,0.2)', resizeMode: 'stretch',
                borderWidth: 2, borderColor: 'black'
              }} fadeDuration={0}/>
              <Text>Image</Text>
            </View>
            <ImageBackground source={require("assets/images//bee.png")} style={{width: 64, height: 64}}>
              <Text>image background</Text>
            </ImageBackground>
          </View>
        </Marker>
      </NaverMapView>
      <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
        <View style={{backgroundColor: 'gray', padding: 4}}>
          <Text style={{color: 'white'}}>open stack</Text>
        </View>
      </TouchableOpacity>
      <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text>
    </>
  )
}

export default MapViewScreen;