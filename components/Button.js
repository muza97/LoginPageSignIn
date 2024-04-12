import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WhereToButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-md m-2 shadow">
      <Text className="text-lg font-semibold text-gray-800">Where to?</Text>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </TouchableOpacity>
  );
};

export default WhereToButton;
