import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../theme';
export default function ContactScreen() {
  const [showMap, setShowMap] = useState(false);

  return (
    <View className="flex-1 bg-white px-4 py-32"style={{ backgroundColor: themeColors.bgColor(1) }}>
      <Text className="text-center text-2xl font-bold text-gray-800 mb-8">Let's get in touch.</Text>

      <View className="flex-row justify-center mb-8">
        <TouchableOpacity onPress={() => setShowMap(false)} className="mx-3">
          <Ionicons name="mail-outline" size={30} color={showMap ? "grey" : "blue"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMap(true)} className="mx-2">
          <Ionicons name="map-outline" size={30} color={showMap ? "blue" : "grey"} />
        </TouchableOpacity>
      </View>
    
      {showMap ? (
        <MapView
          className="h-64"
          initialRegion={{
            latitude: 59.41035454920276,
            longitude: 17.92565873812647,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={{ latitude: 59.41035454920276, longitude: 17.92565873812647 }} />
        </MapView>
      ) : (
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-700 mb-4">Send us a message!</Text>
          <TextInput
            className="border-b border-gray-300 py-2 my-2"
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            className="border-b border-gray-300 py-2 my-2"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
          />
          <TextInput
            className="border-b border-gray-300 py-4 my-2 h-40"
            placeholder="Message"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />
        <TouchableOpacity className="mt-4 bg-blue-500 py-3 rounded-md shadow-md">
          <Text className="text-white text-center text-lg font-semibold">Submit</Text>
            </TouchableOpacity>
            <Text className="pt-5">If it's urgent, contact us on this number: 070 000 00 00.</Text>
            <Text className="pt-3 text-gray-600">
              In case of a medical emergency or any situation that requires immediate police attention, please dial <Text className="font-bold">112</Text> directly to get in touch with emergency services.
            </Text>
            

        </View>
      )}
    </View>
  );
}