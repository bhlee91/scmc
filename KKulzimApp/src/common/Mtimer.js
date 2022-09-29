import React, {useCallback, useEffect, useState, useRef} from 'react';
import moment from 'moment';
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
} from 'react-native';

let timer = () => {};

export default function Mtimer() {
  const [timeLeft, setTimeLeft] = useState(120);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });

  //   const start = () => {
  //     setTimeLeft(120);
  //     clearTimeout(timer);
  //     startTimer();
  //   };

  function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + 'd ' : '';
    var hDisplay = h > 0 ? h + 'h ' : '';
    var mDisplay = m > 0 ? m + '분 ' : '';
    var sDisplay = s > 0 ? s + '초 ' : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  return secondsToDhms(timeLeft);
}
