import React, { useEffect, useContext } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MapScreen from './src/screens/MapScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { userEmail } = useContext(AuthContext);
  const { isDarkMode, theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: isDarkMode ? theme.card : '#ffffff' 
        },
        headerTintColor: isDarkMode ? theme.text : '#333333',
        contentStyle: { 
          backgroundColor: theme.background 
        }
      }}
    >
      {userEmail !== '' ? (
        <Stack.Group>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'InfnetFood' }} 
          />
          <Stack.Screen 
            name="Products" 
            component={ProductsScreen} 
          />
          <Stack.Screen 
            name="ProductDetails" 
            component={ProductDetailsScreen} 
            options={{ title: 'Detalhes do Item' }} 
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            options={{ title: 'Meu Carrinho' }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: 'Meu Perfil' }} 
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ title: 'Restaurantes no Rio' }} 
          />
          <Stack.Screen 
            name="RestaurantDetails" 
            component={RestaurantDetailsScreen} 
            options={{ title: 'Detalhes do Restaurante' }} 
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen} 
            options={{ title: 'Finalizar Pedido' }} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: 'Configurações' }} 
          />
        </Stack.Group>
      ) : (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS !== 'web') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão de notificação negada');
        }
      }
    }
    requestPermissions();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}