import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PersonalDetailsScreen = () => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Personal Details</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter full name" 
        value={fullName} 
        onChangeText={setFullName} 
      />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter email" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />

      {/* Mobile Number */}
      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.phoneInputContainer}>
        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png' }} style={styles.flagIcon} />
        <Text style={styles.countryCode}>+91</Text>
        <TextInput 
          style={styles.phoneInput} 
          placeholder="Enter mobile number" 
          keyboardType="phone-pad" 
          value={mobileNumber} 
          onChangeText={setMobileNumber} 
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9F9F9' },
  backButton: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  input: { backgroundColor: '#EEE', padding: 15, borderRadius: 10, marginBottom: 15 },
  pickerContainer: { backgroundColor: '#EEE', borderRadius: 10, marginBottom: 15 },
  picker: { height: 50 },
  phoneInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEE', padding: 15, borderRadius: 10, marginBottom: 20 },
  flagIcon: { width: 24, height: 16, marginRight: 8 },
  countryCode: { fontSize: 16, marginRight: 10 },
  phoneInput: { flex: 1 },
  continueButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 30, alignItems: 'center' },
  continueButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default PersonalDetailsScreen;
