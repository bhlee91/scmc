import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
} from 'react-native';

const ScrollLoadingIndicatorView = ({ children, loading }) => {
  return (
    <ScrollView style={styles.mainView}>
      <ActivityIndicator 
        style={{ 
          flex: 1,
          display: 'flex',
          position: 'absolute',
          zIndex: 1000, 
          flexDirection: 'row',
          marginTop: '50%',
          justifyContent: 'center',
          alignSelf: 'center' 
        }} 
        size='large' 
        animating={!loading}
      />
      <View style={{ flex: 1, zIndex: 5, opacity: loading ? 1 : 0.5 }}>
        {children}
      </View>
    </ScrollView>
  );
}

export default ScrollLoadingIndicatorView;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },
})