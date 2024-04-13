//userutils.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserDetails = async () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No token found');
      return null;
    }

    const response = await axios.get(apiUrl + '/user/details', {
      headers: {
        'Authorization': `Bearer ${token}`, // Corrected template literal syntax
      },
    });

    return {
      name: response.data.username, // Adjust if the response structure is different
      email: response.data.email,
      phoneNumber: response.data.phoneNumber,
    };
  } catch (error) {
    console.error('There was an error fetching the user details:', error);
    return null;
  }
};
