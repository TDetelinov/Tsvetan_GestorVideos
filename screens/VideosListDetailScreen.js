// screens/VideosListDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function VideosListDetailScreen({ route, navigation }) {
  const { llistaId, nom } = route.params;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: nom });
    const q = query(
      collection(db, 'videos'),
      where('llistaId', '==', llistaId),
      orderBy('dataInsercio', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [llistaId]);

  const toggleFavorit = async (id, estatActual) => {
    await updateDoc(doc(db, 'videos', id), { favorit: !estatActual });
  };

  const renderVideo = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Player', { url: item.url, titol: item.titol })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.videoTitle} numberOfLines={1}>{item.titol}</Text>
        <Text style={styles.date}>{new Date(item.dataInsercio).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorit(item.id, item.favorit)}>
        <Ionicons 
          name={item.favorit ? "star" : "star-outline"} 
          size={28} 
          color={item.favorit ? "#FFD700" : "gray"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideo}
        ListEmptyComponent={<Text style={styles.empty}>No hi ha vídeos en aquesta llista.</Text>}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddVideo', { llistaId })}
      >
        <Ionicons name="videocam" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2
  },
  thumbnail: { width: 100, height: 60, borderRadius: 5 },
  infoContainer: { flex: 1, marginLeft: 15 },
  videoTitle: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: 'gray', marginTop: 5 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#A52A2A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty: { textAlign: 'center', marginTop: 50, color: 'gray' }
});