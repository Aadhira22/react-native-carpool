import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset</Text>
      <Text style={styles.subtitle}>Enter email to reset password</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By logging, you agree to our <Text style={styles.link}>Terms & Conditions</Text> and {' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F9F9F9' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FF4500F' },
  subtitle: { fontSize: 14, color: '#777', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, backgroundColor: '#fff', marginBottom: 20 },
  button: { backgroundColor: '#FF4500', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  termsText: { fontSize: 12, color: '#777', textAlign: 'center', marginTop: 20 },
  link: { fontWeight: 'bold', color: '#000' },
  loginText: { fontSize: 14, color: '#777', textAlign: 'center', marginTop: 20 },
  loginLink: { fontWeight: 'bold', color: '#007AFF' },
});

export default ResetPasswordScreen;
