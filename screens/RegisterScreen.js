// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (password.length < 6) {
      Alert.alert('Error', 'La contrasenya ha de tenir mínim 6 caràcters');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .catch(error => Alert.alert('Error al registrar', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear un compte</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correu electrònic"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contrasenya"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar-se</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Tornar al Login</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#A52A2A',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: '#808080', // Color gris per diferenciar-ho
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});