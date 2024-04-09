// useGeocoding.js
import { useState } from 'react';
import { GEOCODING_API_KEY } from '@env';
import Geocoder from 'react-native-geocoding';

Geocoder.init(GEOCODING_API_KEY);
const useGeocoding = () => {
    const [startCoordinates, setStartCoordinates] = useState(null);
    const [destinationCoordinates, setDestinationCoordinates] = useState(null);
    const [error, setError] = useState(null);
  
    const geocodeAddress = async (address, type) => {
      try {
        const response = await Geocoder.from(address);
        const { lat, lng } = response.results[0].geometry.location;
        const coordinates = { latitude: lat, longitude: lng };
  
        if (type === 'start') {
          setStartCoordinates(coordinates);
        } else if (type === 'destination') {
          setDestinationCoordinates(coordinates);
        }
      } catch (error) {
        setError(error);
      }
    };
  
    return {
      startCoordinates,
      destinationCoordinates,
      geocodeAddress,
      error,
    };
  };
  
  export default useGeocoding;