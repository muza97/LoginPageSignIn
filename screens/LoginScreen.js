//React-native-taxi-app-user/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from '../theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api-hdzvzie4ya-uc.a.run.app/api/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', data.message || 'Please check your credentials');
      }
    } catch (error) {
      Alert.alert('Login Error', 'Unable to connect to the server');
      console.error('Login error:', error);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bgColor(1)}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../assets/image/on-comp-moon.png')}
          style={{width: 200, height: 200}}/>
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
          style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              onChangeText={setEmail}
              placeholder='Enter your email address'
              autoCapitalize='none'
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              onChangeText={setPassword}
              placeholder='Enter your password'
              />
              <TouchableOpacity className="flex items-end mb-5">
                <Text className="text-gray-700">Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={handleLogin}
                  className="py-3 bg-yellow-400 rounded-xl"
                  >
                <Text className="font-xl font-bold text-center text-gray-700">
                Login
                </Text>
              </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>    
          <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/icons/google.png')} className="w-10 h-10"/>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/icons/apple.png')} className="w-10 h-10"/>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10"/>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}