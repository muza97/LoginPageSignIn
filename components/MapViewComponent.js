import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';

const MapViewComponent = ({
  userLocation,
  startCoordinates,
  destinationCoordinates,
  route,
  mapRef,
  navigation,
  isLocationArrowPressed,
  getCurrentLocation,
  setIsLocationArrowPressed,
  handleFocus
}) => {
  useEffect(() => {
    // Fetch current location when component mounts
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // Whenever the route is updated, fit the map to the polyline
    if (route && mapRef.current) {
      mapRef.current.fitToCoordinates(route, {
        edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [route]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      className="absolute top-0 left-0 right-0 bottom-0"
      initialRegion={userLocation || {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={userLocation}
    >
      {/* Show user location marker */}
      {userLocation && (
        <Marker
          coordinate={userLocation}
          title="Your Location"
        />
      )}

      {/* Show pickup location marker */}
      {startCoordinates && (
        <Marker
          coordinate={startCoordinates}
          title="Pick Up"
          pinColor="green"
        />
      )}

      {/* Show dropoff location marker */}
      {destinationCoordinates && (
        <Marker
          coordinate={destinationCoordinates}
          title="Drop Off"
          pinColor="blue"
        />
      )}

      {/* Polyline between pickup and dropoff */}
      {startCoordinates && destinationCoordinates && (
        <Polyline
          coordinates={route}
          strokeColor="#000" // black or any color you prefer
          strokeWidth={6}
        />
      )}
    </MapView>
  );
}

export default MapViewComponent;
