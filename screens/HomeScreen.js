//screens/HomeScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { requestRide } from '../components/rideRequest';
import * as Location from 'expo-location';
import BottomSheetComponent from '../components/BottomSheetComponent';
import RideSummaryBox from '../components/RideSummaryBox'; 
import useGeocoding from '../hooks/useGeocoding';
import { GEOCODING_API_KEY } from '@env';
import polyline from '@mapbox/polyline'; 
import LoadingBar from '../components/LoadingBar';
import BottomSheetRideOptions from '../components/BottomSheetRideOptions';
import MapViewComponent from '../components/MapViewComponent';
export default function HomeScreen() {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationArrowPressed, setIsLocationArrowPressed] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true); 
  const [rideRequested, setRideRequested] = useState(false); 
  const bottomSheetRef = useRef(null);
  const [showSummaryBox, setShowSummaryBox] = useState(false);
  const [pickupAddress, setPickupAddress] = useState(''); 
  const [dropoffAddress, setDropoffAddress] = useState(''); 
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const { geocodeAddress, startCoordinates, destinationCoordinates, error } = useGeocoding();
  const [route, setRoute] = useState(null);
  const mapRef = useRef(null);
  const [showRideOptions, setShowRideOptions] = useState(false);
  const rideOptionsRef = useRef(null);
  const rideOptions = [
    { carModel: 'Tesla Model 3', arrivalTime: '5 mins', price: '50 kr' },
    { carModel: 'Volvo XC90', arrivalTime: '8 mins', price: '45 kr' }
  ];

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=${GEOCODING_API_KEY}`
      );
      const json = await response.json();
      if (json.routes.length > 0) {
        const route = json.routes[0];
        const leg = route.legs[0];
        const points = polyline.decode(route.overview_polyline.points);
        const coordinates = points.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));
  
        setRoute(coordinates);
        setDistance(leg.distance.value); 
        setDuration(leg.duration.value);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const calculateFare = (distance, duration) => {
    const baseFare = 2.50; // Base fare in dollars
    const perKm = 10; // Cost per kilometer
    const perMinute = 0.20; // Cost per minute
  
    const distanceInKm = distance / 1000; // Convert meters to kilometers
    const durationInMinutes = duration / 60; // Convert seconds to minutes
  
    const fare = baseFare + (distanceInKm * perKm) + (durationInMinutes * perMinute);
    return fare.toFixed(2); // Format to 2 decimal places
  };
  
  const handleFocus = useCallback(() => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
    bottomSheetRef.current?.snapToIndex(isBottomSheetOpen ? 0 : 1); // Toggle between 10% and 70%
  }, [isBottomSheetOpen]);

  const handleRequestRide = useCallback(async () => {
    if (!startCoordinates || !destinationCoordinates) {
      console.error("Coordinates not set");
      return;
    }
  
    // Close the bottom sheet and start the loading process
    setIsBottomSheetOpen(false);
    setRideRequested(true);

    const { latitude: pickupLatitude, longitude: pickupLongitude } = startCoordinates;
    const { latitude: dropoffLatitude, longitude: dropoffLongitude } = destinationCoordinates;
  
    try {
      const rideResponse = await requestRide(pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude);
      if (rideResponse) {
        console.log("Ride request successful:", rideResponse);
        setTimeout(() => {
          setShowSummaryBox(true);
          setRideRequested(false); 
        }, 10000); 
      } else {
        console.error("No ride response received.");
        setRideRequested(false); 
      }
    } catch (error) {
      console.error("Failed to request ride:", error);
      setRideRequested(false); 
    }
  }, [startCoordinates, destinationCoordinates]);

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
    if (startCoordinates && destinationCoordinates) {
      getDirections(startCoordinates, destinationCoordinates);
    }
  }, [startCoordinates, destinationCoordinates]);

  useEffect(() => {
    if (route && mapRef.current) {
      mapRef.current.fitToCoordinates(route, {
        edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [route]);

  const handleRideConfirm = () => {
    setShowRideOptions(true);
    rideOptionsRef.current?.snapToIndex(0);
  };


  return (
    <View className="flex-1 justify-center items-center bg-[color:themeColors.bgColor(1)]">



<MapViewComponent
        userLocation={userLocation}
        startCoordinates={startCoordinates}
        destinationCoordinates={destinationCoordinates}
        route={route}
        mapRef={mapRef}
        navigation={navigation}
        isLocationArrowPressed={isLocationArrowPressed}
        getCurrentLocation={getCurrentLocation}
        setIsLocationArrowPressed={setIsLocationArrowPressed}
        handleFocus={handleFocus}
      /> 
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
  
      {isBottomSheetOpen && (
        <BottomSheetComponent
          ref={bottomSheetRef}
          onAddressChange={onAddressChange}
          onRequestRide={handleRequestRide}
        />
      )}
  
      {/* Animated loading bar that appears when requesting a ride */}
      {rideRequested && !showSummaryBox && (
        <LoadingBar
          onRequestCancel={() => {
            console.log("Canceling request, reopening bottom sheet.");
            setRideRequested(false);
            setIsBottomSheetOpen(true);
          }}
        />
      )}
  
      {/* Ride summary box that appears after loading is complete */}
      {showSummaryBox && (
        <RideSummaryBox
          pickupAddress={pickupAddress}
          dropoffAddress={dropoffAddress}
          distance={`${(distance / 1000).toFixed(2)} km`}
          duration={`${(duration / 60).toFixed(2)} minutes`}
          rate={`${calculateFare(distance, duration)}`}
          onRequestConfirm={() => {
            console.log('Ride confirmed');
            setShowSummaryBox(false);
            setIsBottomSheetOpen(false);
            setShowRideOptions(true);
          }}
        />
      )}
  
      {/* Ride options bottom sheet */}
      {showRideOptions && (
        <BottomSheetRideOptions
          ref={rideOptionsRef}
          rideOptions={rideOptions}
          onRideSelect={(selectedRide) => {
            console.log('Selected ride:', selectedRide);
            setShowRideOptions(false); // Close the bottom sheet after selection
          }}
        />
      )}
    </View>
  );
}