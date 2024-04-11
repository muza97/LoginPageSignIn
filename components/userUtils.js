import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No token found');
      return null;
    }

    const response = await axios.get('http://localhost:3000/user/details', {
      headers: {
        'Authorization': `Bearer ${token}`,
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
