// LoadingBar.js
import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';

const LoadingBar = ({ onRequestCancel }) => {
  const loadingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(loadingAnimation, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true, 
    }).start();
  }, []);

  
  const loadingBarScaleX = loadingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View className="absolute inset-x-0 bottom-0 p-4 bg-white rounded-t-xl">
      <Text className="text-xl font-semibold text-center">Requesting Ride</Text>
      <View className="h-1 bg-gray-300 my-2 overflow-hidden">
        <Animated.View
          className="h-1 bg-red-500"
          style={{ transform: [{ scaleX: loadingBarScaleX }], width: '100%' }}
        />
      </View>
      <TouchableOpacity
        onPress={onRequestCancel}
        className="mt-4 bg-black py-3 rounded-md"
      >
        <Text className="text-center text-white font-semibold">CANCEL REQUEST</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoadingBar;