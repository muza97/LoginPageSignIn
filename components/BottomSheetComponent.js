import React, { forwardRef, useMemo, useState } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GEOCODING_API_KEY } from '@env'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomSheetComponent = forwardRef(({ onAddressChange, onRequestRide }, ref) => {
  const snapPoints = useMemo(() => ['25%','40%', '70%'], []);
  const [pickupPredictions, setPickupPredictions] = useState([]);
  const [dropoffPredictions, setDropoffPredictions] = useState([]);
  const [pickUpValue, setPickUpValue] = useState('');
  const [dropOffValue, setDropOffValue] = useState('');
  const [femaleDriverOnly, setFemaleDriverOnly] = useState(false);

  const toggleFemaleDriverFilter = () => {
    setFemaleDriverOnly(!femaleDriverOnly);
  };
  
  const fetchPlaces = async (text, setLocationPredictions) => {
    if (text.length > 0) {
      try {
       
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GEOCODING_API_KEY}&input=${text}&language=en&components=country:SE`;
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
  
  const additionalStyles = StyleSheet.create({
    input: {
      
      underlineColorAndroid: 'transparent',
    },
  });

  
//   return (
//     <BottomSheet ref={ref} index={0} snapPoints={snapPoints} enablePanDownToClose={true}>
//       <View className="flex-1 items-center p-4 bg-white rounded-t-xl">
//         <View className="mb-4 w-full border border-gray-300 rounded-lg shadow">
//           <TextInput
//             placeholder="Pick up"
//             className="h-12 w-full px-4"
//             value={pickUpValue}
//             onChangeText={(text) => {
//               setPickUpValue(text);
//               fetchPlaces(text, setPickupPredictions);
//             }}
//             underlineColorAndroid='transparent'
//           />
//           <FlatList
//             data={pickupPredictions}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => {
//                   onAddressChange('pickUp', item.description);
//                   setPickupPredictions([]);
//                   setPickUpValue(item.description);
//                 }}
//                 className="p-2"
//               >
//                 <Text className="text-lg">{item.description}</Text>
//               </TouchableOpacity>
//             )}
//             className="bg-white max-h-40 border-t border-gray-300 z-10"
//           />
//         </View>
        
//         <View className="mb-4 w-full border border-gray-300 rounded-lg shadow">
//           <TextInput
//             placeholder="Drop off"
//             className="h-12 w-full px-4"
//             value={dropOffValue}
//             onChangeText={(text) => {
//               setDropOffValue(text);
//               fetchPlaces(text, setDropoffPredictions);
//             }}
//             underlineColorAndroid='transparent'
//           />
//           <FlatList
//             data={dropoffPredictions}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => {
//                   onAddressChange('dropOff', item.description);
//                   setDropoffPredictions([]);
//                   setDropOffValue(item.description);
//                 }}
//                 className="p-2"
//               >
//                 <Text className="text-lg">{item.description}</Text>
//               </TouchableOpacity>
//             )}
//             className="bg-white max-h-40 border-t border-gray-300 z-10"
//           />
//         </View>
        
//         <Button title="Request Ride" onPress={onRequestRide} className="w-full bg-blue-500 text-white p-4 rounded-md" />
//       </View>
//     </BottomSheet>
//   );
// });

  return (
    <BottomSheet ref={ref} index={0} snapPoints={snapPoints} enablePanDownToClose={true}>
    <View className="flex-row justify-evenly p-2.5">
         <TouchableOpacity onPress={() => handleQuickAddressSet('home')} className="items-center">
          <Icon name="home" size={24} color="black" />
           <Text className="text-xs mt-1">Home</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => handleQuickAddressSet('work')} className="items-center">
           <Icon name="briefcase" size={20} color="black" />
           <Text className="text-xs mt-1">Work</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={toggleFemaleDriverFilter} className="items-center">
           <Icon name="female" size={20} color={femaleDriverOnly ? "blue" : "black"} />
           <Text className="text-xs mt-1">{femaleDriverOnly ? "Female Only" : "Any Driver"}</Text>
         </TouchableOpacity>
       </View>
      <View className="flex-1 items-center p-4 bg-white rounded-t-xl">
        <View className="mb-4 w-full">
          <TextInput
            placeholder="Pick up"
            className="h-12 w-full px-4 border border-gray-300 rounded-lg"
            value={pickUpValue}
            onChangeText={(text) => {
              setPickUpValue(text);
              fetchPlaces(text, setPickupPredictions);
            }}
            onFocus={() => ref.current?.snapToIndex(1)} // Open to 50% on focus
          />
          <FlatList
            data={pickupPredictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onAddressChange('pickUp', item.description);
                  setPickupPredictions([]);
                  setPickUpValue(item.description);
                  ref.current?.snapToIndex(0); // Close to 25% after selection
                }}
              >
                <Text className="text-lg p-2">{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="mb-4 w-full">
          <TextInput
            placeholder="Drop off"
            className="h-12 w-full px-4 border border-gray-300 rounded-lg"
            value={dropOffValue}
            onChangeText={(text) => {
              setDropOffValue(text);
              fetchPlaces(text, setDropoffPredictions);
            }}
            onFocus={() => ref.current?.snapToIndex(0)} // Retract to 25% on focus if not already
          />
          <FlatList
            data={dropoffPredictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onAddressChange('dropOff', item.description);
                  setDropoffPredictions([]);
                  setDropOffValue(item.description);
                  ref.current?.snapToIndex(0); // Retract to 25%
                }}
              >
                <Text className="text-lg p-2">{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Button title="Request Ride" onPress={onRequestRide} className="w-full bg-blue-500 text-white p-4 rounded-md" />
      </View>
    </BottomSheet>
  );
});

export default BottomSheetComponent;


// import React, { forwardRef, useMemo, useState } from 'react';
// import { View, TextInput, Button, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { GEOCODING_API_KEY } from '@env';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const BottomSheetComponent = forwardRef(({ onAddressChange, onRequestRide }, ref) => {
//   const snapPoints = useMemo(() => ['25%', '40%', '70%'], []);
//   const [pickupPredictions, setPickupPredictions] = useState([]);
//   const [dropoffPredictions, setDropoffPredictions] = useState([]);
//   const [pickUpValue, setPickUpValue] = useState('');
//   const [dropOffValue, setDropOffValue] = useState('');
//   const [femaleDriverOnly, setFemaleDriverOnly] = useState(false);

//   // Using useAddress hook to get homeAddress from context

//   const fetchPlaces = async (text, setLocationPredictions) => {
//     if (text.length > 0) {
//       try {
//         const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GEOCODING_API_KEY}&input=${text}&language=en&components=country:SE`;
//         const result = await fetch(apiUrl);
//         const json = await result.json();
//         setLocationPredictions(json.predictions);
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       setLocationPredictions([]);
//     }
//   };

//   const handleQuickAddressSet = (addressType) => {
//     const address = addressType === 'home' ? homeAddress : userWorkAddress; // Assuming userWorkAddress is defined somewhere or passed as a prop
//     onAddressChange('pickUp', address);
//     setPickUpValue(address);
//     ref.current?.snapToIndex(0); // Close the bottom sheet
//   };

//   const toggleFemaleDriverFilter = () => {
//     setFemaleDriverOnly(!femaleDriverOnly);
//   };

//   return (
//     <BottomSheet ref={ref} index={0} snapPoints={snapPoints} enablePanDownToClose={true}>
//       <View className="flex-row justify-evenly p-2.5">
//         <TouchableOpacity onPress={() => handleQuickAddressSet('home')} className="items-center">
//           <Icon name="home" size={24} color="black" />
//           <Text className="text-xs mt-1">Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleQuickAddressSet('work')} className="items-center">
//           <Icon name="briefcase" size={24} color="black" />
//           <Text className="text-xs mt-1">Work</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={toggleFemaleDriverFilter} className="items-center">
//           <Icon name="female" size={24} color={femaleDriverOnly ? "blue" : "black"} />
//           <Text className="text-xs mt-1">{femaleDriverOnly ? "Female Only" : "Any Driver"}</Text>
//         </TouchableOpacity>
//       </View>
//       <View className="flex-1 items-center p-4 bg-white rounded-t-xl">
//         <TextInput
//           placeholder="Pick up"
//           className="h-12 w-full px-4 border border-gray-300 rounded-lg"
//           value={pickUpValue}
//           onChangeText={(text) => {
//             setPickUpValue(text);
//             fetchPlaces(text, setPickupPredictions);
//           }}
//           onFocus={() => ref.current?.snapToIndex(1)} // Open to 50% on focus
//         />
//           <FlatList
//             data={pickupPredictions}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => {
//                   onAddressChange('pickUp', item.description);
//                   setPickupPredictions([]);
//                   setPickUpValue(item.description);
//                   ref.current?.snapToIndex(0); // Close to 25% after selection
//                 }}
//               >
//                 <Text className="text-lg p-2">{item.description}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>

//         <View className="mb-4 w-full">
//           <TextInput
//             placeholder="Drop off"
//             className="h-12 w-full px-4 border border-gray-300 rounded-lg"
//             value={dropOffValue}
//             onChangeText={(text) => {
//               setDropOffValue(text);
//               fetchPlaces(text, setDropoffPredictions);
//             }}
//             onFocus={() => ref.current?.snapToIndex(0)} // Retract to 25% on focus if not already
//           />
//           <FlatList
//             data={dropoffPredictions}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => {
//                   onAddressChange('dropOff', item.description);
//                   setDropoffPredictions([]);
//                   setDropOffValue(item.description);
//                   ref.current?.snapToIndex(0); // Retract to 25%
//                 }}
//               >
//                 <Text className="text-lg p-2">{item.description}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>

//         <Button title="Request Ride" onPress={onRequestRide} className="w-full bg-blue-500 text-white p-4 rounded-md" />
      
//     </BottomSheet>
//   );
// });

// export default BottomSheetComponent;