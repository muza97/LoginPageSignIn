import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    
    const fadeAnimLets = useRef(new Animated.Value(0)).current;
    const fadeAnimGet = useRef(new Animated.Value(0)).current;
    const fadeAnimStarted = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        
        const startAnimation = () => {
            
            fadeAnimLets.setValue(0);
            fadeAnimGet.setValue(0);
            fadeAnimStarted.setValue(0);

            
            Animated.sequence([
                Animated.timing(fadeAnimLets, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimGet, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimStarted, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.delay(5000), 
            ]).start(() => startAnimation()); 
        };

        startAnimation();
    }, []);

    return (    
        <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bgColor(1)}}>
            <View className="flex-1 flex justify-around my-4">
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Animated.Text style={{ opacity: fadeAnimLets, color: 'black', fontWeight: 'bold', fontSize: 34 }}>
                        Let's
                    </Animated.Text>
                    <Animated.Text style={{ opacity: fadeAnimGet, color: 'black', fontWeight: 'bold', fontSize: 34 }}>
                        &nbsp;Get
                    </Animated.Text>
                    <Animated.Text style={{ opacity: fadeAnimStarted, color: 'black', fontWeight: 'bold', fontSize: 34 }}>
                        &nbsp;Started
                    </Animated.Text>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/image/mmm.webp')} 
                        style={{width: 350, height: 350, borderRadius: 20}} />
                </View> 
                <View className="space-y-4">
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Login 
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text className="font-semibold text-yellow-400">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
