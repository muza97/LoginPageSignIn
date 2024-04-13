// button.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WhereToButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="absolute left-24.5 bottom-10 bg-white p-3 rounded-full shadow">
      <Ionicons name="search" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default WhereToButton;
