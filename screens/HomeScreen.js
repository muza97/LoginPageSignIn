///Users/mz/Desktop/react/React-Native-user-app/React-native-taxi-app-user/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import useGeocoding from '../hooks/useGeocoding'; // Make sure this path is correct
import { themeColors } from '../theme'; // Adjust the import path as needed

export default function HomeScreen() {
  const { geocodeAddress } = useGeocoding();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  // Assume fetchDirections is a function similar to your DirectionService.js logic
  // Adjust fetchDirections import path based on your project structure
  // import { fetchDirections } from '../services/DirectionService';

  const handleGetDirections = async () => {
    // Logic to fetch directions and set route coordinates
  };

  useEffect(() => {
    // Example: Geocode an initial address or set initial map region
  }, []);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: themeColors.bgColor(1) }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, 
          longitude: -122.4324, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {startCoordinates && (
          <Marker coordinate={startCoordinates} title="Start" />
        )}
        {destinationCoordinates && (
          <Marker coordinate={destinationCoordinates} title="Destination" />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#000" 
            strokeWidth={6}
          />
        )}
      </MapView>
      {/* Additional UI components here */}
    </View>
  );
}

const styles = {
  map: {
    width: Dimensions.get('window').width,
    height: '70%', // Adjust the map height as needed
  },
};
