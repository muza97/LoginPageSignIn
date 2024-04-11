import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
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

      setUserDetails({
        name: response.data.username, // Assuming the response has 'username', adjust if necessary
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
      });
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the user details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpdate = (value, field) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
        <Text className="text-sm p-2">Add a Profile picture so a driver can recognize you</Text>
      </View>

      <View className="px-4">
        {/* Name Input */}
        <View className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="person-outline" size={24} className="text-gray-600" />
          <TextInput
            style={{ flex: 1, marginLeft: 3, height: 40 }}
            onChangeText={(value) => handleUpdate(value, 'name')}
            value={userDetails.name}
            placeholder="Name"
          />
          <TouchableOpacity>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
        </View>

        {/* Phone Number Input */}
        <View className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="call-outline" size={24} className="text-gray-600" />
          <TextInput
            style={{ flex: 1, marginLeft: 3, height: 40 }}
            onChangeText={(value) => handleUpdate(value, 'phoneNumber')}
            value={userDetails.phoneNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          <TouchableOpacity>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <View className="flex-row items-center py-3">
          <Ionicons name="mail-outline" size={24} className="text-gray-600" />
          <TextInput
            style={{ flex: 1, marginLeft: 3, height: 40 }}
            onChangeText={(value) => handleUpdate(value, 'email')}
            value={userDetails.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TouchableOpacity>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}