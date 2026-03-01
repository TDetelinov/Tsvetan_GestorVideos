// screens/PlayerScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PlayerScreen({ route }) {
  const { url } = route.params;

  // Funció millorada per netejar la URL i afegir paràmetres de seguretat
  const getEmbedUrl = (originalUrl) => {
    let videoId = '';
    if (originalUrl.includes('v=')) {
      videoId = originalUrl.split('v=')[1].split('&')[0];
    } else if (originalUrl.includes('youtu.be/')) {
      videoId = originalUrl.split('youtu.be/')[1].split('?')[0];
    }
    
    // Afegim l'origin per evitar errors de domini i el useragent
    return `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&origin=http://localhost:19006`;
  };

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: getEmbedUrl(url) }} 
        style={styles.video}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
        // Aquest "userAgent" és la clau per evitar l'error 150/153
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'black',
    justifyContent: 'center' 
  },
  video: { 
    flex: 1,
    width: Dimensions.get('window').width,
    height: 300
  }
});