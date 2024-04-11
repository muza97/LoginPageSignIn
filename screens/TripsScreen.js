import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TripsScreen() {
  const navigation = useNavigation();
  const tripsData = [
    // ex åkturerdata
    { id: '1', address: '348 Fillmore St, San Francisco, CA', time: '6:45 PM, Monday June 19', driver: 'Ying', price: '$20' },
    { id: '1', address: '348 Fillmore St, San Francisco, CA', time: '6:45 PM, Monday June 19', driver: 'Ying', price: '$20' },
    { id: '1', address: '348 Fillmore St, San Francisco, CA', time: '6:45 PM, Monday June 19', driver: 'Ying', price: '$20' },
    { id: '1', address: '348 Fillmore St, San Francisco, CA', time: '6:45 PM, Monday June 19', driver: 'Ying', price: '$20' },
    { id: '1', address: '348 Fillmore St, San Francisco, CA', time: '6:45 PM, Monday June 19', driver: 'Ying', price: '$20' },
    { id: '1', address: '348 Fillmore St, San Francisco, CA', time: '6:45 PM, Monday June 19', driver: 'Ying', price: '$20' },


  ];

  return (
    <View className="flex-1 bg-white pt-10">
      <View className="flex-row items-center p-4 border-b border-gray-300">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-2">
          <Ionicons name="arrow-back" size={30} className="text-black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1">My Trips</Text>
      </View>

      <FlatList
        data={tripsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-300">
            <Ionicons name="location-outline" size={24} className="text-gray-600" />
            <View className="flex-1 ml-2">
              <Text className="text-lg font-semibold">{item.address}</Text>
              <Text className="text-gray-500">{item.time} with {item.driver}</Text>
            </View>
            <Text className="text-gray-900 font-semibold">{item.price}</Text>
            <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
