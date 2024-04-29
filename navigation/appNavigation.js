import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TripsScreen from '../screens/TripsScreen';
import ContactScreen from '../screens/ContactScreen';
import { themeColors } from '../theme';
import CustomDrawerContent from '../components/CustomDrawerContent';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import LoginAndSecurityScreen from '../screens/additionalScreens/LoginAndSecurityScreen';
import PaymentMethodScreen from '../screens/additionalScreens/PaymentMethodScreen';
import HomeAddressScreen from '../screens/additionalScreens/HomeAddressScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator  
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: themeColors.bgColor(1),
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Trips" component={TripsScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      {/* Additional screens can be added as needed */}
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
          <Stack.Screen name="Main" options={{ headerShown: false }} component={DrawerNavigator} />
          <Stack.Screen name="PersonalDetails" options={{ headerShown: false }} component={PersonalDetailsScreen} />
          <Stack.Screen name="LoginAndSecurity" options={{ headerShown: false }} component={LoginAndSecurityScreen} />
          <Stack.Screen name="Payment" options={{ headerShown: false }} component={PaymentMethodScreen} />
          <Stack.Screen name="HomeAddress" options={{ headerShown: false }} component={HomeAddressScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
