import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import {StyleSheet, View, Text, Animated} from 'react-native';

function ProgressBar({totalStep, nowStep}) {
  const loaderValue = useRef(new Animated.Value(0)).current;

  //   const load = count => {
  //     Animated.timing(loaderValue, {
  //       toValue: (count / totalStep) * 100,
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start();
  //   };

  const load = count => {
    Animated.timing(loaderValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
    }).start();
  };

  const width = loaderValue.interpolate({
    imputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    load(nowStep);
  }, [nowStep]);

  return (
    <View>
      <View styles={styles.bar}>
        <Animated.View
          styles={{
            backgroundColor: '##AAC9CE',
            width,
            height: 10,
            borderTopRightRidus: 2,
            borderBottomRightRadus: 2,
            borderWidth: 1,
          }}
        />
      </View>
      <Text sytles={styles.step}>
        {nowStep}/{totalStep}
      </Text>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: 50,
    backgroundColor: '#F57F17',
  },
  step: {
    color: '#AAC9CE',
    fontWeight: '400',
    fontSize: 22,
    padding: 22,
    lineHeight: 22 * 1.3,
    textAlign: 'center',
  },
});
