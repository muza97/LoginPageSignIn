import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginAndSecurityScreen() {
  // Dummy state for demonstration purposes
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  // Function to handle the password change process
  const handleChangePassword = () => {
    // Here you'd typically make an API call to update the password
    Alert.alert('Password Changed', 'Your password has been updated successfully.');
  };

  // Function to handle enabling/disabling two-factor authentication
  const handleToggleTwoFactor = () => {
    // Again, typically involves an API call or security token setup
    Alert.alert('Two-Factor Authentication', 'Two-factor authentication settings have been updated.');
  };

  return (
    <View className="flex-1 bg-white px-4 py-12">
      <Text className="text-lg font-semibold mb-4">Login and Security</Text>

      <View className="mb-4">
        <Text className="text-base font-semibold mb-2">Change Password</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-md mb-3"
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          className="border border-gray-300 p-3 rounded-md"
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity className="bg-blue-500 mt-4 p-3 rounded-md" onPress={handleChangePassword}>
          <Text className="text-white text-center">Update Password</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <Text className="text-base font-semibold mb-2">Two-Factor Authentication</Text>
        <TouchableOpacity className="flex-row items-center justify-between p-3 border border-gray-300 rounded-md" onPress={handleToggleTwoFactor}>
          <Text className="text-base">Status: Enabled</Text>
          <Ionicons name="toggle-outline" size={24} className="text-gray-600" />
        </TouchableOpacity>
      </View>

      {/* More security settings as needed */}

      <TouchableOpacity className="mt-4" onPress={() => Alert.alert('Logged out')}>
        <Text className="text-red-500 text-center">Log Out of All Devices</Text>
      </TouchableOpacity>

    </View>
  );
}
