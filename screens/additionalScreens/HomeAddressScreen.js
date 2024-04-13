import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeAddressScreen() {
  // State for the home address details
  const [address, setAddress] = useState({
    street: '123 Main St',
    city: 'Anytown',
    postalCode: '12345',
    country: 'Countryland',
    isEditing: false,
  });

  const handleEdit = () => {
    setAddress({ ...address, isEditing: true });
  };

  const handleSave = () => {
    // Here you'd typically validate the address and save it to your backend
    setAddress({ ...address, isEditing: false });
    Alert.alert('Address Saved', 'Your home address has been updated successfully.');
  };

  return (
    <View className="flex-1 bg-white px-4 py-12">
      <Text className="text-lg font-semibold mb-4">My Current Home Address</Text>

      {address.isEditing ? (
        // Editable address details
        <View>
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="Street"
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="City"
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="Postal Code"
            keyboardType="number-pad"
            value={address.postalCode}
            onChangeText={(text) => setAddress({ ...address, postalCode: text })}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="Country"
            value={address.country}
            onChangeText={(text) => setAddress({ ...address, country: text })}
          />
          <TouchableOpacity className="bg-blue-500 mt-4 p-3 rounded-md shadow-md" onPress={handleSave}>
            <Text className="text-white text-center font-semibold">Save Address</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Display current address
        <View>
          <Text className="text-base mb-2">Street: {address.street}</Text>
          <Text className="text-base mb-2">City: {address.city}</Text>
          <Text className="text-base mb-2">Postal Code: {address.postalCode}</Text>
          <Text className="text-base mb-2">Country: {address.country}</Text>
          <TouchableOpacity className="mt-4 bg-gray-300 p-3 rounded-md shadow-md" onPress={handleEdit}>
            <Text className="text-black text-center font-semibold">Edit Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
