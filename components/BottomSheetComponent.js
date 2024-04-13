import React, { forwardRef, useMemo, useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GEOCODING_API_KEY } from '@env'; // Ensure this is set up in your .env file

const BottomSheetComponent = forwardRef(({ onAddressChange, onRequestRide }, ref) => {
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const [pickupPredictions, setPickupPredictions] = useState([]);
  const [dropoffPredictions, setDropoffPredictions] = useState([]);
  const [pickUpValue, setPickUpValue] = useState('');
  const [dropOffValue, setDropOffValue] = useState('');

  // Function to handle search queries for both pick up and drop off locations
  const fetchPlaces = async (text, setLocationPredictions) => {
    if (text.length > 0) {
      try {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GEOCODING_API_KEY}&input=${text}&language=en`;
        const result = await fetch(apiUrl);
        const json = await result.json();
        setLocationPredictions(json.predictions);
      } catch (err) {
        console.error(err);
      }
    } else {
      setLocationPredictions([]);
    }
  };

  return (
    <BottomSheet ref={ref} index={0} snapPoints={snapPoints} enablePanDownToClose={true}>
      <View className="flex-1 items-center p-4 bg-white rounded-t-xl">
        <TextInput
          placeholder="Pick up"
          className="h-12 w-full mb-4 bg-white border border-gray-300 px-4"
          value={pickUpValue}
          onChangeText={(text) => {
            setPickUpValue(text);
            fetchPlaces(text, setPickupPredictions);
          }}
          underlineColorAndroid='transparent' 
        />
        <FlatList
          data={pickupPredictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onAddressChange('pickUp', item.description);
                setPickupPredictions([]);
                setPickUpValue(item.description); // Ensure the input is updated with the selected address
              }}
              className="bg-white p-2"
            >
              <Text className="text-lg">{item.description}</Text>
            </TouchableOpacity>
          )}
          className="absolute top-14 left-0 right-0 bg-white max-h-40 border border-gray-300 z-10"
        />
        <TextInput
          placeholder="Drop off"
          className="h-12 w-full mb-4 bg-white border border-gray-300 px-4"
          value={dropOffValue}
          onChangeText={(text) => {
            setDropOffValue(text);
            fetchPlaces(text, setDropoffPredictions);
          }}
          underlineColorAndroid='transparent' 

        />
        <FlatList
          data={dropoffPredictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onAddressChange('dropOff', item.description);
                setDropoffPredictions([]);
                setDropOffValue(item.description); // Ensure the input is updated with the selected address
              }}
              className="bg-white p-2"
            >
              <Text className="text-lg">{item.description}</Text>
            </TouchableOpacity>
          )}
          className="absolute top-28 left-0 right-0 bg-white max-h-40 border border-gray-300 z-10"
        />
        <Button title="Request Ride" onPress={onRequestRide} className="w-full bg-blue-500 text-white p-4 rounded-md" />
      </View>
    </BottomSheet>
  );
});

export default BottomSheetComponent;