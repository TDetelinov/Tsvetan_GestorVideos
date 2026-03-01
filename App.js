// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Ionicons } from '@expo/vector-icons';

// --- IMPORTACIONS DE LES PANTALLES ---
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LlistesScreen from './screens/LlistesScreen';
import FavoritsScreen from './screens/FavoritsScreen';
import ProfileScreen from './screens/ProfileScreen';
import VideosListDetailScreen from './screens/VideosListDetailScreen'; // L'error venia d'aquí
import AddVideoScreen from './screens/AddVideoScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegació de pestanyes inferiors
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Llistes') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Favorits') iconName = focused ? 'star' : 'star-outline';
          else if (route.name === 'Usuari') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#A52A2A',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#A52A2A' },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Llistes" component={LlistesScreen} options={{ title: 'Les meves Llistes' }} />
      <Tab.Screen name="Favorits" component={FavoritsScreen} options={{ title: 'Vídeos Favorits' }} />
      <Tab.Screen name="Usuari" component={ProfileScreen} options={{ title: 'El meu Perfil' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // PANTALLES PER A USUARIS LOGEJATS
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="VideosListDetail" 
              component={VideosListDetailScreen} 
              options={{ 
                headerStyle: { backgroundColor: '#A52A2A' },
                headerTintColor: '#fff',
                title: 'Vídeos' 
              }} 
            />
            <Stack.Screen 
              name="AddVideo" 
              component={AddVideoScreen} 
              options={{ title: 'Afegir nou vídeo' }} 
            />
            <Stack.Screen 
              name="Player" 
              component={PlayerScreen} 
              options={{ title: 'Reproductor', headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }} 
            />
          </>
        ) : (
          // PANTALLES DE LOGIN / REGISTRE
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear Compte' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}