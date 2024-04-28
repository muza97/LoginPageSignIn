// RideSummaryBox.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RideSummaryBox = ({ pickupAddress, dropoffAddress, distance, rate, onRequestConfirm }) => {
  return (
    <View className="absolute bottom-5 left-5 right-5 bg-white p-5 rounded-lg shadow-md">
      <Text className="text-xl font-bold mb-2">Pick Up</Text>
      <Text className="text-base mb-4">{pickupAddress}</Text>

      <Text className="text-xl font-bold mb-2">Drop Off</Text>
      <Text className="text-base mb-4">{dropoffAddress}</Text>

      <Text className="text-base mb-2">{distance}</Text>
      <Text className="text-base mb-4">Estimate price: {rate} kr</Text>

      <TouchableOpacity className="bg-orange-500 p-4 rounded-full" onPress={onRequestConfirm}>
        <Text className="text-white text-center text-lg font-bold">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideSummaryBox;
