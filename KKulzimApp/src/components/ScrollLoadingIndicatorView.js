import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
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
      {children}
    </ScrollView>
  );
}

export default ScrollLoadingIndicatorView;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#EEEEEE',
  },
})