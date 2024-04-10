import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useGeocoding from '../hooks/useGeocoding';
import { themeColors } from '../theme';
import * as Location from 'expo-location';

export default function HomeScreen() {
  const navigation = useNavigation(); 
  const { geocodeAddress } = useGeocoding();
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationArrowPressed, setIsLocationArrowPressed] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      getCurrentLocation();
    })();
  }, []);

const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setUserLocation({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeColors.bgColor(1) }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        initialRegion={userLocation || {
          latitude: 37.78825, 
          longitude: -122.4324, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={userLocation} // re-center the map to userLocation 
      >
        {/* Marker and Polyline as before */}
      </MapView>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ position: 'absolute', top: 40, left: 16 }}>
        <FontAwesome name="bars" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsLocationArrowPressed(!isLocationArrowPressed);
          getCurrentLocation(); 
        }}
        style={{ position: 'absolute', top: 40, right: 16 }}>
        <FontAwesome name="location-arrow" size={30} color={isLocationArrowPressed ? "red" : "black"} />
      </TouchableOpacity>
    </View>
  );
}