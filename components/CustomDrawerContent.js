import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LogoutButton from '../buttons/LogoutButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState('../assets/image/signup.png'); // Default path to your local image

  const fetchProfileImage = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch('http://localhost:3000/user/profile-image2', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Add any other headers as needed
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUri = URL.createObjectURL(blob);
        setProfileImageUrl(imageUri);
      } else {
        console.log('Failed to fetch profile image. Status:', response.status);
        // Handle HTTP errors here
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <DrawerContentScrollView {...props} className="flex-1 bg-white">
      <View className="items-center p-5">
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require('../assets/image/signup.png')}
          className="w-20 h-20 rounded-full mb-4"
        />
        <TouchableOpacity onPress={navigateToProfile} className="mb-5">
          <Text className="text-base font-medium">My Profile</Text>
        </TouchableOpacity>
        <View className="w-full border-b border-gray-200 mb-5" />
      </View>
      <DrawerItemList {...props} />
      <View className="mt-10">
        <LogoutButton />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
