// rideRequest.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestRide = async (pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude) => {
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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock response based on some condition, for example, random success/failure
    if (Math.random() > 0.5) { // 50% chance of success
      console.log('Ride requested successfully', rideData);
      // Simulate successful response data
      return {
        status: 201,
        data: {
          message: 'Ride has been arranged',
          rideDetails: rideData,
        },
      };
    } else {
      console.log('Failed to request ride');
      // Simulate failure scenario
      return {
        status: 400,
        error: 'Failed to request ride due to server error',
      };
    }
  } catch (error) {
    console.error('There was an error requesting the ride:', error);
    return {
      status: 500,
      error: 'Internal error occurred',
    };
  }
};
