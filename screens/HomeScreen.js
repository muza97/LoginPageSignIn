import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bgColor(1)}}>
      <SafeAreaView className="flex">
        <Text className="text-base">HomeScreen</Text>
    </SafeAreaView>
    </View>
  );
}
