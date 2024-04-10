import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();
  return (
    <View className="bg-white flex-1 ">
      <TouchableOpacity
                onPress={() => navigation.goBack()} 
                className="pt-20 pl-5"
            >
                <Ionicons name="arrow-back" size={30} className="text-black" />
            </TouchableOpacity>
      <View className="items-center pt-1 pb-8 ">
        <Image
          source={require('../assets/image/on-comp-moon.png')} 
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-semibold mt-4">Musse</Text>
      </View>
      <View className="px-6">
      <TouchableOpacity 
          className="flex-row items-center py-3 border-b border-gray-300"
          onPress={() => navigation.navigate('PersonalDetails')}
        >
          <Ionicons name="person-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3 text-lg">Personal data</Text>
          <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="lock-closed-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3 text-lg">Loggin and security</Text>
          <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="lock-closed-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3 text-lg">Home adress</Text>
          <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="lock-closed-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3 text-lg">Work adress</Text>
          <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="lock-closed-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3 text-lg">insert</Text>
          <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="lock-closed-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3 text-lg">inset</Text>
          <Ionicons name="chevron-forward" size={24} className="text-gray-600" />
        </TouchableOpacity>
        {/* Repetera strukturen ovan */}
      </View>
    </View>
  );
}