import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getTerms } from '../api/customer';

function TrTems() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    getTerms('T01', 'ALLE', 'Y')
    .then(res => {
      res.data.map(obj => {
        setInfo(obj)
      })
      console.log(info.contents)
    })
  }, [])
  return (
    <View>
      <ScrollView>
        <Text>
          운송약관{/* {info.contents} */}
        </Text>
      </ScrollView>
    </View>
  );
}
export default TrTems;
