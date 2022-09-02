import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
// 반복되는 것은 별도 컴퍼넌트로 분리
import EachOrder from 'src/components/EachOrder';

const RecommendShip = () => {
  const orders = useSelector((state) => state.order.orders);
  const renderItem = useCallback(({item}) => {
    return <EachOrder item={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
}

export default RecommendShip;
