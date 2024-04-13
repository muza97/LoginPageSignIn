//screens/HomeScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import * as Location from 'expo-location';
import BottomSheetComponent from '../components/BottomSheetComponent';
import RideSummaryBox from '../components/RideSummaryBox'; // Import the component
import useGeocoding from '../hooks/useGeocoding';
import { GEOCODING_API_KEY } from '@env'; // Ensure this is set up in your .env file
import polyline from '@mapbox/polyline'; // Make sure to install the @mapbox/polyline package
 
export default function HomeScreen() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationArrowPressed, setIsLocationArrowPressed] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // State to track bottom sheet open status
  const [rideRequested, setRideRequested] = useState(false); // State to track if ride is requested
  const bottomSheetRef = useRef(null);
  const [showSummaryBox, setShowSummaryBox] = useState(false);
  const [pickupAddress, setPickupAddress] = useState(''); // Add state for pickup address
  const [dropoffAddress, setDropoffAddress] = useState(''); // Add state for dropoff address
  const { geocodeAddress, startCoordinates, destinationCoordinates, error } = useGeocoding();
  const [route, setRoute] = useState(null);
  const mapRef = useRef(null);

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=${GEOCODING_API_KEY}`
      );
      const json = await response.json();
      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const coordinates = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
      setRoute(coordinates);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleFocus = useCallback(() => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
    bottomSheetRef.current?.snapToIndex(isBottomSheetOpen ? 0 : 1); // Toggle between 10% and 70%
  }, [isBottomSheetOpen]);

  const handleRequestRide = useCallback(() => {
    // Update the ride request status and show the summary box
    setRideRequested(true);
    setShowSummaryBox(true);
    // If you need to close the bottom sheet, you can do it here
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

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

  const onAddressChange = (field, value) => {
    if (field === 'pickUp') {
      setPickupAddress(value);
      geocodeAddress(value, 'start');
    } else if (field === 'dropOff') {
      setDropoffAddress(value);
      geocodeAddress(value, 'destination');
    }
  };


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

  useEffect(() => {
    // Whenever both start and destination coordinates are set, adjust the map view
    if (startCoordinates && destinationCoordinates) {
      getDirections(startCoordinates, destinationCoordinates);
    }
  }, [startCoordinates, destinationCoordinates]);

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
    <View className="flex-1 justify-center items-center bg-[color:themeColors.bgColor(1)]">
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
      
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        className="absolute top-10 left-4 z-10"
      >
        <FontAwesome name="bars" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsLocationArrowPressed(!isLocationArrowPressed);
          getCurrentLocation();
        }}
        className="absolute top-10 right-4 z-10"
      >
        <FontAwesome name="location-arrow" size={30} color={isLocationArrowPressed ? "red" : "black"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleFocus}
        className="absolute top-16 self-center z-10"
      >
        <MaterialIcons name="travel-explore" size={30} color="black" />
      </TouchableOpacity>
      <BottomSheetComponent
        ref={bottomSheetRef}
        onAddressChange={onAddressChange}
        onRequestRide={handleRequestRide}
      />
  
      {showSummaryBox && (
        <RideSummaryBox
          pickupAddress={pickupAddress}
          dropoffAddress={dropoffAddress}
          distance="2.5 miles"
          rate="5"
          onRequestConfirm={() => {
            console.log('Ride confirmed');
            setShowSummaryBox(false);
          }}
        />
      )}
    </View>
  );}