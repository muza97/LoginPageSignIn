import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const patchUserDetails = async (name, email, phoneNumber) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No token found');
      return null;
    }

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (phoneNumber) dataToUpdate.phoneNumber = phoneNumber;

    const response = await axios.patch('http://localhost:3000/user/patch', dataToUpdate, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        name: response.data.username, // Adjust if the response structure is different
        email: response.data.email,
        phoneNumber: response.data.phoneNumber,
      };
    } else {
      console.log('Failed to update user details');
      return null;
    }
  } catch (error) {
    console.error('There was an error fetching the user details:', error);
    return null;
  }
};
