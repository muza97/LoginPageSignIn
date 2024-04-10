import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure this package is installed
import { useNavigation } from '@react-navigation/native';
import useGeocoding from '../hooks/useGeocoding';
import { themeColors } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation(); // Hook to get navigation prop
  const { geocodeAddress } = useGeocoding();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  useEffect(() => {
    // Example: Geocode an initial address or set initial map region
  }, []);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: themeColors.bgColor(1) }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        className="w-full h-full"
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
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} className="absolute top-10 left-4 z-10">
        <Icon name="menu" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}
