import React, { useState ,useEffect} from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // For image picking
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const CompleteProfileScreen = ({ navigation, route }) => {
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(''); // Replaced email with dob
  const [profileImage, setProfileImage] = useState(null);
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    if (route.params?.userId) {
      setUserId(route.params.userId);
    }
  }, [route.params]);

  const handleCompleteProfile = async() => {
    if (!fullName || !phoneNumber || !gender || !dob || !pincode) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    // Basic DOB format validation (dd/mm/yyyy)
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobRegex.test(dob)) {
      Alert.alert('Error', 'Please enter Date of Birth in dd/mm/yyyy format');
      return;
    }
    Alert.alert('Success', 'Profile completed successfully!');
    try {
      const response = await axios.post('http://localhost:5000/api/complete-profile', {
        userId, // Passed from SignUpScreen
        fullName,
        phoneNumber,
        gender,
        profileImage,
        pincode,
        dob
      });
  
      if (response.data.success) {
        Alert.alert('Success', 'Profile completed successfully!');
        navigation.navigate('FindRideScreen');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong! Please try again.');
      console.error(error);
    }
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        const imageUri = result.assets ? result.assets[0].uri : result.uri;
        setProfileImage(imageUri); // Set the selected image
      }
    } else {
      Alert.alert('Permission denied', 'You need to grant permission to access images.');
    }
  };

  const handlePhoneNumberChange = (text) => {
    if (text.length <= 10) {
      setPhoneNumber(text);
    }
  };

  const handleDobChange = (text) => {
    // Allow only numbers and slashes, and limit to dd/mm/yyyy format
    const cleaned = text.replace(/[^0-9/]/g, '');
    setDob(cleaned);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Complete Profile</Text>
      <Text style={styles.subtitle}>
        Don't worry, only you can see your personal data. No one else will be able to see it.
      </Text>

      {/* Profile Image with Edit Icon */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={{ uri: profileImage || 'https://placehold.co/100x100' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handlePickImage}>
            <FontAwesome name="pencil" size={14} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          value={fullName} 
          onChangeText={setFullName} 
          placeholder="Enter Full Name"
        />
      </View>

      {/* Pincode and Phone Number in Same Row */}
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Pincode</Text>
          <Picker
            style={styles.input}
            selectedValue={pincode}
            onValueChange={(itemValue) => setPincode(itemValue)}
          >
            <Picker.Item label="Select Pincode" value="" />
            <Picker.Item label="+91" value="+91" />
            {/* Add more pincode options */}
          </Picker>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput 
            style={styles.input} 
            value={phoneNumber} 
            onChangeText={handlePhoneNumberChange} 
            placeholder="Enter Phone Number"
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Gender Dropdown */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Date of Birth Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput 
          style={styles.input} 
          value={dob} 
          onChangeText={handleDobChange} 
          placeholder="dd/mm/yyyy"
          keyboardType="numeric" // Use numeric keyboard for easier input
          maxLength={10} // Limit to 10 characters (dd/mm/yyyy)
        />
      </View>

      {/* Complete Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleCompleteProfile}>
        <Text style={styles.buttonText}>Complete Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f4',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,  // Make it circular
    backgroundColor: 'gray',
  },
  editIcon: {
    position: 'absolute',  // Position the edit icon absolutely within the TouchableOpacity
    bottom: 0,             // Align to the bottom of the image
    right: 0,              // Align to the right of the image
    width: 25,
    height: 25,
    borderRadius: 12.5,    // Circle shape
    backgroundColor: '#d4e157',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f4',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',  // Makes the pincode and phone number appear in a row
    justifyContent: 'space-between', // Space them out
  },
  inputWrapper: {
    width: '48%', // Set width to 48% to allow space for both inputs
  },
  button: {
    backgroundColor: '#d4e157',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CompleteProfileScreen;