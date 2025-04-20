import { GOOGLE_WEB_CLIENT_ID} from '@env';
import React, { useState ,useEffect} from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Icon for show/hide password
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, provider } from './firebaseConfig';
import { GoogleAuthProvider,signInWithPopup,signInWithCredential } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

   // Function to handle Google Sign-In
   useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID, // Get this from Firebase Console
    });
  }, []);
  const handleGoogleLogin = async () => {
    try {
      let user = null;
  
      if (Platform.OS === "web") {
        console.log('hello');
        const result = await signInWithPopup(auth, provider);
        user = result.user;
        console.log('mello');
      } else {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(auth, googleCredential);
        user = userCredential.user;
      }
  
      if (user) {
        // Check if the user exists in MongoDB
        const response = await fetch("http://localhost:5000/api/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email: user.email })
        });
  
        const data = await response.json();
        if (response.ok) {
          await AsyncStorage.setItem("userToken", data.token);
          await AsyncStorage.setItem("userData", JSON.stringify(data.user));
          navigation.replace("FindRideScreen"); // Navigate if user exists
        } else {
          Alert.alert("Login Failed", data.message);
        }
      }
    } catch (error) {
      Alert.alert("Google Sign-In Failed", error.message);
    }
  };
  
  

  // Function to handle Email/Password Login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data.user);
        await AsyncStorage.setItem("userToken", data.token); 
        await AsyncStorage.setItem("userData", JSON.stringify(data.user)); 
        navigation.replace("FindRideScreen");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log in</Text>

      {/* Google Authentication Button */}
      <TouchableOpacity style={styles.authButton} onPress={handleGoogleLogin}>
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
