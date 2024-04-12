import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeColors } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationArrowPressed, setIsLocationArrowPressed] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      getCurrentLocation();
    })();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      postLocation(latitude, longitude);  // Call the post function after location is updated
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const postLocation = async (latitude, longitude) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'Authentication token not found.');
        return;
      }

      const response = await axios.post('http://localhost:3000/user/update-location', {
        latitude,
        longitude
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Location posted successfully.');
      } else {
        Alert.alert('Error', 'Failed to post location');
      }
    } catch (error) {
      console.error('Error posting location:', error);
      Alert.alert('Error', 'Failed to post location');
    }
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
        region={userLocation}
      >
        {userLocation && <Marker coordinate={userLocation} />}
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
