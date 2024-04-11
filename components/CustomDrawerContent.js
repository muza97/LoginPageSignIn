import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LogoutButton from '../buttons/LogoutButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserDetails } from './userUtils';

// Define fetchProfileImage function
export const fetchProfileImage = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No token found');
      return null; // Return null if there is no token
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
      return URL.createObjectURL(blob); // Return the image URL
    } else {
      console.log('Failed to fetch profile image. Status:', response.status);
      return null; // Return null on failure
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    return null; // Return null on error
  }
};

// Define CustomDrawerContent component
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [profileImageUrl, setProfileImageUrl] = useState('../assets/image/signup.png'); 
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const initialize = async () => {
      const userDetails = await fetchUserDetails();  // Fetch user details
      if (userDetails && userDetails.name) {
        setUserName(userDetails.name);  // Set user name if available
      }
      const imageUrl = await fetchProfileImage();  // Fetch profile image
      if (imageUrl) {
        setProfileImageUrl(imageUrl);
      }
    };
    initialize();
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
