import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function PaymentMethodScreen() {
  // Dummy state for existing card details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '**** **** **** 1234', // Masked card number for display
    cardholderName: 'John Doe',
    expiryDate: '08/24', // MM/YY format
    cvv: '***', // Masked CVV for display
    isEditing: false,
  });

  const handleEdit = () => {
    setCardDetails({ ...cardDetails, isEditing: true });
  };

  const handleSave = () => {
    // Validate details, then save 
    setCardDetails({ ...cardDetails, isEditing: false });
    Alert.alert('Payment Method', 'Your payment method has been updated successfully.');
  };

  return (
    <View className="flex-1 bg-white px-4 py-12">
      <Text className="text-lg font-semibold mb-4">Payment Method</Text>

      {cardDetails.isEditing ? (
        // Editable card details
        <View>
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="Card Number"
            keyboardType="number-pad"
            value={cardDetails.cardNumber}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="Cardholder Name"
            value={cardDetails.cardholderName}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cardholderName: text })}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="MM/YY"
            value={cardDetails.expiryDate}
            onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
          />
          <TextInput
            className="border border-gray-300 p-3 rounded-md mb-3"
            placeholder="CVV"
            keyboardType="number-pad"
            value={cardDetails.cvv}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
          />
          <TouchableOpacity className="bg-blue-500 mt-4 p-3 rounded-md shadow-md" onPress={handleSave}>
            <Text className="text-white text-center font-semibold">Save Payment Method</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Display registered card details
        <View>
          <Text className="text-base mb-2">Card Number: {cardDetails.cardNumber}</Text>
          <Text className="text-base mb-2">Cardholder Name: {cardDetails.cardholderName}</Text>
          <Text className="text-base mb-2">Expiry Date: {cardDetails.expiryDate}</Text>
          <TouchableOpacity className="mt-4 bg-gray-300 p-3 rounded-md shadow-md" onPress={handleEdit}>
            <Text className="text-black text-center font-semibold">Edit Payment Method</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
