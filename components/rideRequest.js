// rideRequest.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestRide = async (pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL; 

  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.log('No token found');
      return null;
    }

    const rideData = {
      pickup_latitude: pickupLatitude,
      pickup_longitude: pickupLongitude,
      dropoff_latitude: dropoffLatitude,
      dropoff_longitude: dropoffLongitude,
    };

    const response = await axios.post(apiUrl + '/user/request-ride', rideData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      console.log('Ride requested successfully', response.data);
      return response.data;
    } else {
      console.log('Failed to request ride');
      return null;
    }
  } catch (error) {
    console.error('There was an error requesting the ride:', error);
    return null;
  }
};
