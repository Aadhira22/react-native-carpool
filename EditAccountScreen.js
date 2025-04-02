import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // For image picking

const EditAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('Pedro');
  const [fullName, setFullName] = useState('Shivanshi');
  const [phoneNumber, setPhoneNumber] = useState('+91 98 1045 3265');
  const [gender, setGender] = useState('Women');
  const [email, setEmail] = useState('shivanshi@gmail.com');
  const [password, setPassword] = useState('******');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied', 'You need to grant permission to access images.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets ? result.assets[0].uri : result.uri;
      setProfileImage(imageUri);
    }
  };

  const handlePhoneNumberChange = (text) => {
    if (text.length <= 15) { // Adjust based on format
      setPhoneNumber(text);
    }
  };

  const handleSave = () => {
    // Handle save logic here, for example, saving the updated info
    Alert.alert('Success', 'Your account information has been updated!');
    setIsEditing(false); // Stop editing after saving
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle between Edit and Save
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Edit Account</Text>

      {/* Profile Image with Edit Icon */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={{ uri: profileImage || 'https://placehold.co/100x100' }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.editIcon} onPress={handlePickImage}>
            <FontAwesome name="pencil" size={14} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Editable Fields */}
      <View style={styles.fieldContainer}>
        <TouchableOpacity style={styles.fieldRow}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{username}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fieldRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{fullName}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fieldRow}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.inputField}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            editable={isEditing}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fieldRow}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{gender}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fieldRow}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fieldRow}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.value}>{password}</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle Edit/Save Button */}
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={isEditing ? handleSave : handleEditToggle}
      >
        <Text style={styles.saveButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#d4e157', // Matches the green color in the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    marginTop: 10,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  inputField: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#d4e157',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;
