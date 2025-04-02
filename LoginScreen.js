import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Icon for show/hide password
import SignUpScreen from './SignUpScreen';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === 'shivanshi@gmail.com' && password === 'abc123') {
      navigation.navigate('FindRideScreen'); // Navigate if credentials are correct
    } 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log in</Text>

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
    placeholderTextColor="#888"  // Ensures placeholder is visible
    secureTextEntry={!showPassword}
    value={password}
    onChangeText={setPassword}  
  />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
  </TouchableOpacity>
</View>


      {/* Forgot Password Link (Above Continue Button) */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.resetText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Don't have an account? Sign Up Link */}
     <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.hyperlink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.termsText}>By signing up, you agree to the Terms & Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'left', marginBottom: 30 },
  authButton: { backgroundColor: '#EEE', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  authText: { fontSize: 16, color: '#333' },
  orText: { textAlign: 'center', fontSize: 16, color: '#777', marginVertical: 15 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 15, 
    width: '100%', 
    marginBottom: 20,
    height: 50, // Set a fixed height for the input fields
  },
  
  // Password Container
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    width: '100%', 
    paddingHorizontal: 15, 
    marginBottom: 20, 
    height: 50, 
  },
  
  passwordInput: { 
    flex: 1, 
    color: '#000',  
    width: '100%',  
    paddingVertical: 0,  
    fontSize: 16,  
  },

  // Forgot Password Text (Grey and Aligned to the Right)
  resetText: { 
    fontSize: 14, 
    color: '#888', 
    textAlign: 'right', 
    marginBottom: 15, // Added margin for spacing above the Continue button
  },

  button: { backgroundColor: '#FF4500', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  hyperlink: {
    fontSize: 14, 
    color: '#FF4500', // Hyperlink color
    textAlign: 'center', 
    fontWeight: 'bold', // Optional: Make it bold for more emphasis
  },

  signupContainer: {
  flexDirection: 'row',  // Ensures text and link are in a row (same line)
  justifyContent: 'center', // Centers them horizontally within the container
  alignItems: 'center', // Aligns them vertically in the center
  marginTop: 15, // Adds margin above the container (adjust if necessary)
},


  termsText: { fontSize: 12, color: '#777', textAlign: 'center', marginTop: 20 },
});

export default LoginScreen;
