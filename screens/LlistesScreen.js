// screens/LlistesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function LlistesScreen({ navigation }) {
  const [llistes, setLlistes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [novaLlistaNom, setNovaLlistaNom] = useState('');

  useEffect(() => {
    // Consultamos las listas del usuario actual
    const q = query(collection(db, 'llistes'), where('userId', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLlistes(data);
    });
    return unsubscribe;
  }, []);

  const crearLlista = async () => {
    if (novaLlistaNom.trim() === '') return;
    await addDoc(collection(db, 'llistes'), {
      nom: novaLlistaNom,
      userId: auth.currentUser.uid
    });
    setNovaLlistaNom('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={llistes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.llistaItem} 
            onPress={() => navigation.navigate('VideosListDetail', { llistaId: item.id, nom: item.nom })}
          >
            <Ionicons name="folder" size={24} color="#A52A2A" />
            <Text style={styles.llistaText}>{item.nom}</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal para añadir nueva lista */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Llista</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de la llista"
              value={novaLlistaNom}
              onChangeText={setNovaLlistaNom}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancel}>
                <Text>Cancel·lar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={crearLlista} style={styles.btnSave}>
                <Text style={{color: 'white'}}>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  llistaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  llistaText: { flex: 1, marginLeft: 15, fontSize: 18 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#A52A2A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { margin: 30, backgroundColor: 'white', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { backgroundColor: '#eee', padding: 10, borderRadius: 10, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  btnCancel: { marginRight: 20, padding: 10 },
  btnSave: { backgroundColor: '#A52A2A', padding: 10, borderRadius: 10 }
});