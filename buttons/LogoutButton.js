import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Welcome');
  };

  return (
    <DrawerItem
      label="Logout"
      onPress={handleLogout}
      // Add the same className or style as other DrawerItems, if needed
    />
  );
};

export default LogoutButton;