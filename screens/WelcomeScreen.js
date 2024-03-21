import React from 'react';
import {View, Text, Image, TouchableOpacity} from  "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation()
  return (    
<SafeAreaView  className="flex-1" style={{backgroundColor: themeColors.bgColor(1)}}>
        <View className="flex-1 flex justify-around my-4">
            <Text
            className="text-gray font-bold text-4xl text-center">
                Let's Get Started
            </Text>
            <View className="flex-row justify-center">
            <Image source={require('../assets/image/mmm.webp')} 
                style={{width: 350, height: 350, borderRadius: 20}} />
            </View> 
             <View className="space-y-4">
                <TouchableOpacity
                onPress={()=> navigation.navigate('Login')}
                className="py-3 bg-yellow-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-700"
                    >
                         Login 
                    </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Don't have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-yellow-400">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}
