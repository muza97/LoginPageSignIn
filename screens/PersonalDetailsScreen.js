import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  return (
       <View className="bg-white flex-1">
            {/* Header */}
            <View className="flex-row items-center p-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="pl-5 pt-6">
                    <Ionicons name="arrow-back" size={30} className="text-black" />
                </TouchableOpacity>
                <Text className="text-xl font-semibold flex-1 pl-2 pt-6">Personuppgifter</Text>
      </View>
      <View className="items-center p-6">
        <Image
          source={require('../assets/image/on-comp-moon.png')} 
          className="w-24 h-24 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-sm p-2">Add a Profile picture so a driver can recognize you
</Text>
      </View>

      <View className="px-4">
        <View className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="person-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3">Musse</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="call-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3">+46 76 *** ****</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
        </View>

      
        <View className="flex-row items-center py-3">
          <Ionicons name="mail-outline" size={24} className="text-gray-600" />
          <Text className="flex-1 ml-3">användare@exempel.com</Text>
          <TouchableOpacity>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}