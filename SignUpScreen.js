import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp =  async () => {
    if (!agreedToTerms) {
      Alert.alert('Error', 'You must agree to the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        email,
        password
      });

      if (response.data.success) {
        console.log("Navigating to CompleteProfileScreen with userId:", response.data.userId);
        navigation.navigate('CompleteProfileScreen', { userId: response.data.userId });
      } else {
        Alert.alert('Signup Failed', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong! Please try again.');
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let’s Get Started.</Text>
      <Text style={styles.subHeading}>Fill your information below to register a new account.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username}
        onChangeText={setUsername} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} 
      />

      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Password" 
          placeholderTextColor="#888" // Added to ensure placeholder visibility
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}  
        />
        <TouchableOpacity 
          style={styles.eyeIcon} // Added style for spacing
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Confirm Password" 
          placeholderTextColor="#888" // Added to ensure placeholder visibility
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}  
        />
        <TouchableOpacity 
          style={styles.eyeIcon} // Added style for spacing
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <CheckBox 
          value={agreedToTerms}
          onValueChange={setAgreedToTerms}
        />
        <Text style={styles.termsText}> Agree with Terms & Condition</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.hyperlink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: 'white' 
  },
  heading: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#000', 
    textAlign: 'left', 
    marginBottom: 10 
  },
  subHeading: { 
    fontSize: 16, 
    color: '#333', 
    textAlign: 'left', 
    marginBottom: 30 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 15, 
    width: '100%', 
    marginBottom: 20, 
    height: 50 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    marginBottom: 20, 
    height: 50 
  },
  passwordInput: { 
    flex: 1, 
    paddingVertical: 15, // Adjusted padding for consistency
    paddingLeft: 15,     // Added left padding for placeholder visibility
  },
  eyeIcon: { 
    padding: 10 // Added padding to give space to the icon
  },
  termsContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30 
  },
  termsText: { 
    fontSize: 14, 
    color: '#333', 
    paddingBottom: 3 
  },
  button: { 
    backgroundColor: '#FF4500', 
    padding: 15, 
    borderRadius: 8, 
    width: '100%', 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  signInContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 15 
  },
  signInText: { 
    fontSize: 14, 
    color: '#000' 
  },
  hyperlink: { 
    fontSize: 14, 
    color: '#FF4500', 
    fontWeight: 'bold' 
  },
});

export default SignUpScreen;