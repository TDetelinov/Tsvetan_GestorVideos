// screens/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="#A52A2A" />
      <Text style={styles.label}>Connectat com a:</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Tancar Sessió</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  email: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#A52A2A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});