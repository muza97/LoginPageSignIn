//screens/HomeScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Platform, PermissionsAndroid, Text, Button} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import useGeocoding from '../hooks/useGeocoding';
import { themeColors } from '../theme';
import * as Location from 'expo-location';
import BottomSheetComponent from '../components/BottomSheetComponent'; 
import { MaterialIcons } from '@expo/vector-icons';


export default function HomeScreen() {
  const navigation = useNavigation(); 
  const { geocodeAddress } = useGeocoding();
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationArrowPressed, setIsLocationArrowPressed] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const bottomSheetRef = useRef(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleFocus = useCallback(() => {
    const targetIndex = isBottomSheetOpen ? 0 : 1;  // Use isBottomSheetOpen to toggle
    bottomSheetRef.current?.snapToIndex(targetIndex);
    setIsBottomSheetOpen(!isBottomSheetOpen);  // Toggle the state
  }, [isBottomSheetOpen]);


  const handleRequestRide = useCallback(() => {
    console.log('Ride requested');
    // Implement ride request logic here
  }, []);

  // const toggleBottomSheet = () => {
  //   if (isBottomSheetOpen) {
  //     bottomSheetRef.current?.close(0);  // Close to minimum snap point instead of completely closing
  //   } else {
  //     bottomSheetRef.current?.expand(2);  // Expand to the next snap point or fully open
  //   }
  //   setIsBottomSheetOpen(!isBottomSheetOpen);
  // };

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
      <TouchableOpacity 
        onPress={() => navigation.toggleDrawer()} 
        className="absolute top-10 left-4" // Tailwind CSS classes for positioning
      >
        <FontAwesome name="bars" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsLocationArrowPressed(!isLocationArrowPressed);
          getCurrentLocation(); 
        }}
        className="absolute top-10 right-4" 
      >
        <FontAwesome name="location-arrow" size={30} color={isLocationArrowPressed ? "red" : "black"} />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={handleFocus} 
        className="absolute top-12 self-center"
      >
        <MaterialIcons name="travel-explore" size={30} color="black" />
      </TouchableOpacity>
      <BottomSheetComponent
        ref={bottomSheetRef}
        onFocus={handleFocus}
      />
      {/* <BottomSheetComponent
        ref={bottomSheetRef}
        onFocus={handleFocus}
        onRequestRide={handleRequestRide}
      />
      <TouchableOpacity 
        onPress={() => handleFocus('pickUp')}  
        className="absolute top-12 self-center"
      >
        <MaterialIcons name="travel-explore" size={30} color="black" />
      </TouchableOpacity>
      <BottomSheetComponent ref={bottomSheetRef} />
      {isBottomSheetOpen ? <Text>Bottom Sheet is Open</Text> : <Text>Bottom Sheet is Closed to 10%</Text>} */}
    </View>
  );}