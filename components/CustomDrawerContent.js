// components/CustomDrawerContent.js
import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LogoutButton from '../buttons/LogoutButton'; // Adjust the import path as needed
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile'); // Make sure 'Profile' is the name of your profile screen route
  };

  return (
    <DrawerContentScrollView {...props} className="flex-1 bg-white">
      <View className="items-center p-5">
        <Image
          source={require('../assets/image/signup.png')} // Replace with your image URI
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
