// components/BottomSheetRideOptions.js
import React, { forwardRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetRideOptions = forwardRef(({ rideOptions, onRideSelect }, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="p-4 border-b border-gray-300"
      onPress={() => onRideSelect(item)}
    >
      <Text className="text-lg">{item.carModel} - Arrives in: {item.arrivalTime}</Text>
      <Text className="text-lg">Price: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheet ref={ref} index={0} snapPoints={snapPoints} enablePanDownToClose={true}>
      <View className="flex-1 p-4 bg-white">
        <FlatList
          data={rideOptions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </BottomSheet>
  );
});

export default BottomSheetRideOptions;