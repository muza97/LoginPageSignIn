// components/CustomDrawerContent.js
import React, { useState, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LogoutButton from '../buttons/LogoutButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserDetails } from './userUtils';

// Define fetchProfileImage function
export const fetchProfileImage = async () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No token found');
      return null; 
    }

    const response = await fetch(apiUrl+ '/user/profile-image2', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob); 
    } else {
      console.log('Failed to fetch profile image. Status:', response.status);
      return null; 
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    return null; // Return null on error
  }
};

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState('../assets/image/signup.png'); 
  const [userName, setUserName] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function initialize() {
        const userDetails = await fetchUserDetails();  
        if (userDetails && userDetails.name) {
          setUserName(userDetails.name);  
        }
        const imageUrl = await fetchProfileImage();  
        if (imageUrl) {
          setProfileImageUrl(imageUrl);
        }
      }

      initialize();

      return () => {

      };
    }, [])
  );

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
          <Text className="text-base font-medium">{userName ? `${userName}'s profil` : 'My Profile'}</Text>
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