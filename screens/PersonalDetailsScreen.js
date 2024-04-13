import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchProfileImage } from '../components/CustomDrawerContent';
import { fetchUserDetails } from '../components/userUtils';  
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import { patchUserDetails } from '../components/userUpdate';
import Snack from '../components/Snack';

export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const initializeDetails = async () => {
      setLoading(true);
      const details = await fetchUserDetails();
      if (details) {
        setUserDetails(details);
      }
      setLoading(false);

      const imageUrl = await fetchProfileImage(); 
      if (imageUrl) {
        setProfileImageUrl(imageUrl);
      }
    };
    initializeDetails();
  }, []);

  


  const handleUpdateDetails = async (field, newValue) => {
    setUpdateInProgress(true);
    const fieldsToUpdate = { ...userDetails, [field]: newValue };
    const updatedDetails = await patchUserDetails(fieldsToUpdate.name, fieldsToUpdate.email, fieldsToUpdate.phoneNumber);
    if (updatedDetails) {
      setUserDetails(updatedDetails);
      setSnackbarMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    } else {
      setSnackbarMessage(`Failed to update ${field}.`);
    }
    setSnackbarVisible(true);
    
    setUpdateInProgress(false);
  };




  const updateName = async (newName) => {
    setUpdateInProgress(true);
    const updatedDetails = await patchUserDetails(newName, null, null);
    if (updatedDetails) {
      setUserDetails(updatedDetails);
      setSnackbarMessage('Name updated successfully!');
    } else {
      setSnackbarMessage('Failed to update name.');
    }
    setSnackbarVisible(true);
    
    setUpdateInProgress(false);
  };

  //update image : 
  const uploadProfilePicture = async (imageUri) => {
    if (!imageUri) {
      console.error('No image URI to upload');
      return;
    }
  
    const token = await AsyncStorage.getItem('userToken');
    
    const fileType = imageUri.match(/\.(jpg|jpeg|png)$/i); 
    if (!fileType) {
      console.error('Unable to determine the file type from URI');
      return;
    }
  
    const formData = new FormData();
    formData.append('profilePicture', {
      uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
      type: `image/${fileType[1]}`, 
      name: `profile-picture.${fileType[1]}`, 
    });
  
    try {
      const response = await fetch(apiUrl+'/user/update-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const responseData = await response.json();
      if (response.ok) {
       // await AsyncStorage.setItem('profileImageUrl', imageUri);
      //  setProfileImageUrl(imageUri);
     //  navigation.navigate('Profile', { profileImageUrl: imageUri }); {/*navigera tillbaka lösning*/}
      }
      if (!response.ok) {
        console.error('Upload Error:', responseData);
        setSnackbarMessage(`Upload Error: ${responseData.error}`);
        setSnackbarVisible(true);
      } else {
        console.log('Upload Successful', responseData);
        setSnackbarMessage('Profile picture updated successfully!');
        setSnackbarVisible(true);
      }
  
      console.log('Upload Successful', responseData);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };
  
  

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    console.log(pickerResult); 
  
    if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      console.log('Uploading image with URI:', uri);
      setProfileImageUrl(uri);
      await uploadProfilePicture(uri);
    } else {
      console.error('No image selected or no URI found');
    }
  };
  
  


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="bg-white flex-1">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="pl-5 pt-6">
          <Ionicons name="arrow-back" size={30} className="text-black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold flex-1 pl-2 pt-6">Personuppgifter</Text>
      </View>

      <View className="items-center p-6">
        <Image
          source={ profileImageUrl ? { uri: profileImageUrl } : require('../assets/image/on-comp-moon.png')}
          className="w-24 h-24 rounded-full"
        />
       <TouchableOpacity 
          className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2"
          onPress={pickImage} 
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-sm p-2">Change Avatar</Text>
      </View>

      <View className="px-4">
        {/* Name Input */}
         <View className="flex-row items-center py-3 border-b border-gray-300">
          <Ionicons name="person-outline" size={24} className="text-gray-600" />
          <TextInput
            style={{ flex: 1, marginLeft: 3, height: 40 }}
            onChangeText={(value) => setUserDetails({ ...userDetails, name: value })}
            value={userDetails.name}
            placeholder="Name"
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => updateName(userDetails.name)}>
            <Text className="text-blue-500">{updateInProgress ? 'Updating...' : 'Change'}</Text>
          </TouchableOpacity>
        </View>

        {/* Phone Number Input */}
<View className="flex-row items-center py-3 border-b border-gray-300">
  <Ionicons name="call-outline" size={24} className="text-gray-600" />
  <TextInput
    style={{ flex: 1, marginLeft: 3, height: 40 }}
    onChangeText={(value) => setUserDetails({ ...userDetails, phoneNumber: value })}
    value={userDetails.phoneNumber}
    placeholder="Phone Number"
    keyboardType="phone-pad"
  />
  <TouchableOpacity onPress={() => handleUpdateDetails('phoneNumber', userDetails.phoneNumber)}>
    <Text className="text-blue-500">{updateInProgress ? 'Updating...' : 'Change'}</Text>
  </TouchableOpacity>
</View>

        {/* Email Input */}
        <View className="flex-row items-center py-3">
          <Ionicons name="mail-outline" size={24} className="text-gray-600" />
          <TextInput
            style={{ flex: 1, marginLeft: 3, height: 40 }}
            onChangeText={(value) => setUserDetails({ ...userDetails, email: value })}

            value={userDetails.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TouchableOpacity onPress={() => handleUpdateDetails('email', userDetails.email)}>
            <Text className="text-blue-500">change</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <Snack
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        message={snackbarMessage}
      />
    </View>
  );
}