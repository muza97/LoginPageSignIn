import React, { useState } from 'react';
import { TextInput, SafeAreaView, TouchableOpacity, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

export default function RideRequestScreen() {
  const navigation = useNavigation(); // Initialize navigation

  const [whereFrom, setWhereFrom] = useState('');
  const [whereTo, setWhereTo] = useState('');

  // Function to handle ride request
  const handleRequestRide = () => {
    if (whereFrom && whereTo) {
      // Possibly add logic here to handle the ride request
      navigation.goBack();
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4">
          <TextInput
            className="text-lg py-2 px-4 border border-gray-300 rounded-lg"
            placeholder="Where from?"
            onChangeText={setWhereFrom}
            value={whereFrom}
          />
          <TextInput
            className="text-lg py-2 px-4 border border-gray-300 rounded-lg mt-4"
            placeholder="Where to?"
            onChangeText={setWhereTo}
            value={whereTo}
          />
          <TouchableOpacity className="bg-blue-500 mt-4 py-3 rounded-lg items-center" onPress={handleRequestRide}>
            <Text className="text-white text-lg font-bold">Request Ride</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
