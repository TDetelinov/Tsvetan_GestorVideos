// screens/AddVideoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddVideoScreen({ route, navigation }) {
  const { llistaId } = route.params;
  const [titol, setTitol] = useState('');
  const [url, setUrl] = useState('');

  const obtenirThumbnail = (url) => {
    // Lógica básica para obtener miniatura de YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
      }
    }
    return 'https://via.placeholder.com/150'; // Imagen por defecto si no es YouTube
  };

  const guardarVideo = async () => {
    if (!titol || !url) {
      Alert.alert('Error', 'Omple tots els camps');
      return;
    }

    try {
      await addDoc(collection(db, 'videos'), {
        titol,
        url,
        llistaId,
        userId: auth.currentUser.uid,
        thumbnail: obtenirThumbnail(url),
        dataInsercio: new Date().toISOString(),
        favorit: false
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Títol del vídeo</Text>
      <TextInput style={styles.input} value={titol} onChangeText={setTitol} placeholder="Ex: Tutorial React" />
      
      <Text style={styles.label}>URL del vídeo (YouTube)</Text>
      <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="https://www.youtube.com/..." />

      <TouchableOpacity style={styles.button} onPress={guardarVideo}>
        <Text style={styles.buttonText}>Afegir Vídeo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 5 },
  input: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10 },
  button: { backgroundColor: '#A52A2A', padding: 15, borderRadius: 25, marginTop: 30, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' }
});