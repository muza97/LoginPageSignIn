// components/BottomSheetComponent.js
import React, { forwardRef, useMemo } from 'react';
import { View, TextInput, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const BottomSheetComponent = forwardRef(({ onFocus, onRequestRide }, ref) => {
  const snapPoints = useMemo(() => ['10%', '70%', '100%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
    >
      <View className="flex-1 items-center p-4">
        <TextInput
          placeholder="Pick up"
          className="h-12 w-full mb-4 bg-white border border-gray-300 px-4"
          onFocus={() => onFocus('pickUp')}
        />
        <TextInput
          placeholder="Drop off"
          className="h-12 w-full mb-4 bg-white border border-gray-300 px-4"
          onFocus={() => onFocus('dropOff')}
        />
        <Button title="Request Ride" onPress={onRequestRide} />
      </View>
    </BottomSheet>
  );
});

export default BottomSheetComponent;
// //components/BottomSheetcontent.js
// import React, { forwardRef, useMemo } from 'react';
// import { View, Text } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';

// const BottomSheetComponent = forwardRef((props, ref) => {
//   const snapPoints = useMemo(() => ['10%','25%', '50%'], []);

//   return (
//     <BottomSheet
//       ref={ref}
//       index={1} 
//       snapPoints={snapPoints}
//       enablePanDownToClose={false}  
//     >
//       <View style={{ flex: 1, alignItems: 'center' }}>
//         <Text>Swipe down to close</Text>
//         <Text>Item 1</Text>
//         <Text>Item 2</Text>
//         <Text>Item 3</Text>
//       </View>
//     </BottomSheet>
//   );
// });

// export default BottomSheetComponent;
