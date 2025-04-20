import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAccountScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [username, setUsername] = useState(user.username || '');
  const [fullName, setFullName] = useState(user.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [gender, setGender] = useState(user.gender || '');
  const [email, setEmail] = useState(user.email || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
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
    if (text.length <= 15) {
      setPhoneNumber(text);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        username,
        fullName,
        phoneNumber,
        gender,
        email,
        profileImage,
      };

      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Unauthorized', 'User token not found.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        Alert.alert('Update failed', result.message || 'Unable to update user info.');
        return;
      }

      // Save updated user info locally
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      route.params?.onGoBack?.(updatedUser);

      navigation.goBack();

      Alert.alert('Success', 'Your account information has been updated!');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update account information.');
      console.error(error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
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
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Username</Text>
            {isEditing ? (
              <TextInput
                style={styles.inputField}
                value={username}
                onChangeText={setUsername}
              />
            ) : (
              <Text style={styles.value}>{username}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.inputField}
                value={fullName}
                onChangeText={setFullName}
              />
            ) : (
              <Text style={styles.value}>{fullName}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.inputField}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{phoneNumber}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Gender</Text>
            {isEditing ? (
              <TextInput
                style={styles.inputField}
                value={gender}
                onChangeText={setGender}
              />
            ) : (
              <Text style={styles.value}>{gender}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Email Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.value}>{email}</Text>
            )}
          </View>
        </View>

        {/* Toggle Edit/Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={isEditing ? handleSave : handleEditToggle}
        >
          <Text style={styles.saveButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
    backgroundColor: '#d4e157',
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
    flex: 1,
  },
  inputField: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 2,
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
    marginLeft: 10,
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
    fontSize: 16,
  },
});

export default EditAccountScreen;
