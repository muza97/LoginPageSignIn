import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler'; // Import TextInput from 'react-native-gesture-handler' for better gesture handling if required

const CustomTextInput = ({ value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <TextInput
    className="border border-gray-300 p-3 rounded-md mb-3"
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
  />
);

export default function HomeAddressScreen() {
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
    if (!address.street || !address.city || !address.postalCode || !address.country) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setAddress({ ...address, isEditing: false });
    Alert.alert('Address Saved', 'Your home address has been updated successfully.');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <Text className="text-lg font-bold mb-5">My Current Home Address</Text>

        {address.isEditing ? (
          <View>
            <CustomTextInput
              placeholder="Street"
              value={address.street}
              onChangeText={(text) => setAddress(prev => ({ ...prev, street: text }))}
            />
            <CustomTextInput
              placeholder="City"
              value={address.city}
              onChangeText={(text) => setAddress(prev => ({ ...prev, city: text }))}
            />
            <CustomTextInput
              placeholder="Postal Code"
              keyboardType="number-pad"
              value={address.postalCode}
              onChangeText={(text) => setAddress(prev => ({ ...prev, postalCode: text }))}
            />
            <CustomTextInput
              placeholder="Country"
              value={address.country}
              onChangeText={(text) => setAddress(prev => ({ ...prev, country: text }))}
            />
            <TouchableOpacity
              className="bg-blue-500 mt-5 p-3 rounded-md shadow"
              onPress={handleSave}
            >
              <Text className="text-white text-center font-bold">Save Address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text className="text-base mb-2">Street: {address.street}</Text>
            <Text className="text-base mb-2">City: {address.city}</Text>
            <Text className="text-base mb-2">Postal Code: {address.postalCode}</Text>
            <Text className="text-base mb-2">Country: {address.country}</Text>
            <TouchableOpacity
              className="mt-5 bg-gray-300 p-3 rounded-md shadow"
              onPress={handleEdit}
            >
              <Text className="text-black text-center font-bold">Edit Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
