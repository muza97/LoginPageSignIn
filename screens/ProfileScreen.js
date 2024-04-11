import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Ensure axios is installed and imported
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUsername = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                console.log('No token found');
                setLoading(false);
                return;
            }
            const response = await axios.get('http://localhost:3000/user/details', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUsername(response.data.username);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the user details:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsername();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View className="bg-white flex-1">
            <TouchableOpacity onPress={() => navigation.goBack()} className="pt-20 pl-5">
                <Ionicons name="arrow-back" size={30} className="text-black" />
            </TouchableOpacity>
            <View className="items-center pt-1 pb-8">
                <Image
                    source={require('../assets/image/on-comp-moon.png')}
                    className="w-24 h-24 rounded-full"
                />
                <Text className="text-xl font-semibold mt-4">{username || 'User'}</Text>
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