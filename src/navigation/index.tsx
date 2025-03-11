import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import PassphraseGenerationScreen from '../screens/auth/PassphraseGenerationScreen';
import PassphraseValidationScreen from '../screens/auth/PassphraseValidationScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';

// Main Screens
import DashboardScreen from '../screens/main/DashboardScreen';
import SpheresScreen from '../screens/main/SpheresScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import WalletScreen from '../screens/wallet/WalletScreen';

// Sphere Screens
import SphereDetailsScreen from '../screens/sphere/SphereDetailsScreen';
import SphereCreateScreen from '../screens/sphere/SphereCreateScreen';
import SphereCreatePostScreen from '../screens/sphere/SphereCreatePostScreen';
import SpherePostDetailsScreen from '../screens/sphere/SpherePostDetailsScreen';
import SphereRecScreen from '../screens/sphere/SphereRecScreen';

// Types
import { RootStackParamList, MainTabParamList } from '../types';

// Auth Context
import { useAuth } from '../contexts/AuthContext';

// Create navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main Tab Navigator
 * Handles navigation between main app tabs
 */
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Spheres') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopColor: '#334155',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Explore" component={SpheresScreen} />
      <Tab.Screen name="Spheres" component={SpheresScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
    </Tab.Navigator>
  );
};

/**
 * Root Navigator
 * Handles authentication flow and main app navigation
 */
const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1E2A38' },
        }}
      >
        {!isAuthenticated ? (
          // Auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="PassphraseGeneration" component={PassphraseGenerationScreen} />
            <Stack.Screen name="PassphraseValidation" component={PassphraseValidationScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          </>
        ) : (
          // Main app
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabNavigator} 
            />
            <Stack.Screen
              name="SphereDetails"
              component={SphereDetailsScreen}
            />
            <Stack.Screen
              name="SphereCreate"
              component={SphereCreateScreen}
            />
            <Stack.Screen
              name="SphereCreatePost"
              component={SphereCreatePostScreen}
            />
            <Stack.Screen
              name="SpherePostDetails"
              component={SpherePostDetailsScreen}
            />
            <Stack.Screen
              name="SphereRec"
              component={SphereRecScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;