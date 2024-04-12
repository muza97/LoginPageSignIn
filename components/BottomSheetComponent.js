import React, { forwardRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetComponent = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ['10%','25%', '50%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Swipe down to close</Text>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </View>
    </BottomSheet>
  );
});

export default BottomSheetComponent;
