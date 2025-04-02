import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, CheckBox 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // For show/hide password icon
import CompleteProfileScreen from './CompleteProfileScreen';
const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = () => {
    // Handle Sign Up logic
    if (!agreedToTerms) {
    Alert.alert('Error', 'You must agree to the terms and conditions.');
    return;
  }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    // Further validation and sign-up logic
    navigation.navigate('CompleteProfileScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let’s Get Started.</Text>
      <Text style={styles.subHeading}>Fill your information below to register a new account.</Text>

      {/* Username Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username}
        onChangeText={setUsername} 
      />

      {/* Email Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
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

      {/* Confirm Password Input with Show/Hide Toggle */}
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Confirm Password" 
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}  
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Agree to Terms and Conditions */}
      <View style={styles.termsContainer}>
        <CheckBox 
          value={agreedToTerms}
          onValueChange={setAgreedToTerms}
        />
        <Text style={styles.termsText}> Agree with Terms & Condition</Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Link to Sign In */}
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
    flex: 1, // Ensures the background spans the entire screen
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: 'white', 
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
    height: 50,
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 20,
    height: 50,
  },
  passwordInput: { 
    flex: 1,
  },
  termsContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30,
  },
  termsText: { 
    fontSize: 14, 
    color: '#333', 
    paddingBottom:3,
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
    marginTop: 15,
  },
  signInText: { 
    fontSize: 14, 
    color: '#000',
  },
  hyperlink: {
    fontSize: 14, 
    color: '#FF4500', 
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
