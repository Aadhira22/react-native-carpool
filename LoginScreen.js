import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Icon for show/hide password

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === 'login@gmail.com' && password === 'abc123') {
      navigation.navigate('FindRide'); // Navigate if credentials are correct
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign up or Log in</Text>

      {/* Google Authentication Button */}
      <TouchableOpacity style={styles.authButton}>
        <Text style={styles.authText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or</Text>

      {/* Email Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Email Address" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} 
      />

      {/* Password Input with Show/Hide Toggle */}
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Password" 
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}  
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Reset Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.resetText}>Forgot password? Reset here</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.termsText}>By signing up, you agree to the Terms & Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  authButton: { backgroundColor: '#EEE', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  authText: { fontSize: 16, color: '#333' },
  orText: { textAlign: 'center', fontSize: 16, color: '#777', marginVertical: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 15, width: '100%', marginBottom: 20 },
  
  // Password Container
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 20 
  },
  passwordInput: { flex: 1 },

  button: { backgroundColor: '#FF4500', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resetText: { fontSize: 14, color: '#FF4500', textAlign: 'center', marginTop: 15 },
  termsText: { fontSize: 12, color: '#777', textAlign: 'center', marginTop: 20 },
});

export default LoginScreen;
