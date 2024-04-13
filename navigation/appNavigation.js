// navigation/appNavigation.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
// Import other screens
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TripsScreen from '../screens/TripsScreen';
import ContactScreen from '../screens/ContactScreen';
import { themeColors } from '../theme'; // Ensure this is the correct path
import CustomDrawerContent from '../components/CustomDrawerContent'; // Ensure this is the correct path
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import LoginAndSecurityScreen from '../screens/additionalScreens/LoginAndSecurityScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator  
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: themeColors.bgColor(1), // Your drawer background color from theme
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Trips" component={TripsScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      {/* Add other screens as needed */}
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
        <Stack.Screen name="Main" options={{ headerShown: false }} component={DrawerNavigator} />
        <Stack.Screen name="PersonalDetails" options={{ headerShown: false }} component={PersonalDetailsScreen} />
        <Stack.Screen name="LoginAndSecurity" options={{ headerShown: false }} component={LoginAndSecurityScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
