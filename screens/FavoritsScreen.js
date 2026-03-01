// screens/FavoritsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function FavoritsScreen({ navigation }) {
  const [favorits, setFavorits] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'videos'),
      where('userId', '==', auth.currentUser.uid),
      where('favorit', '==', true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFavorits(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('Player', { url: item.url, titol: item.titol })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.titol}</Text>
              <Text style={{ color: 'gray' }}>{new Date(item.dataInsercio).toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No tens cap favorit encara.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  card: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  thumbnail: { width: 80, height: 50, borderRadius: 5 }
});