import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EASYRIDE</Text>
      <Text style={styles.tagline}>CARPOOL FOR THE PLANET 🌱</Text>
      <Image source={require('./assets/carpool.jpg')} style={styles.image} />
      <Text style={styles.description}>
        Easyride helps you save money, make friends, and reduce your carbon footprint.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#FF4500', marginBottom: 5 },
  tagline: { fontSize: 16, color: 'green', marginBottom: 20 },
  image: { width: 280, height: 180, marginBottom: 20 },
  description: { textAlign: 'center', fontSize: 16, marginBottom: 30, color: '#555' },
  button: { backgroundColor: '#FF4500', padding: 15, borderRadius: 8, width: '90%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
