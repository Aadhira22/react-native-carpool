import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const AddVehicleScreen = ({ navigation, route}) => {
  const userId = route.params?.userId;
  const [vehicleType, setVehicleType] = useState('4-seater');
  const [vehicleBrand, setVehicleBrand] = useState('Hyundai');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('White');
  const [registrationPlate, setRegistrationPlate] = useState('');
  const [photo, setPhoto] = useState([]);

  const handleAddPhoto = async () => {
    if (photo.length >= 2) {
      Alert.alert('Limit Reached', 'You can only upload two images.');
      return;
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission denied');
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
      setPhoto([...photo, imageUri]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/vehicles', {
        userId,
        type: vehicleType,
        brand: vehicleBrand,
        model: vehicleModel,
        color: vehicleColor,
        plate: registrationPlate,
        images: photo,
      });
      Alert.alert('Vehicle Added', 'Your vehicle has been added!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add vehicle.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Add Vehicle</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vehicle Type</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={vehicleType}
              onValueChange={(itemValue) => setVehicleType(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="4-seater" value="4-seater" />
              <Picker.Item label="2-seater" value="2-seater" />
              <Picker.Item label="SUV" value="SUV" />
              <Picker.Item label="Truck" value="Truck" />
            </Picker>
          </View>
        </View>

        <View style={styles.rowInputGroup}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Vehicle Brand</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={vehicleBrand}
                onValueChange={(itemValue) => setVehicleBrand(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Hyundai" value="Hyundai" />
                <Picker.Item label="Toyota" value="Toyota" />
                <Picker.Item label="Skoda" value="Skoda" />
                <Picker.Item label="Tata" value="Tata" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Colour</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={vehicleColor}
                onValueChange={(itemValue) => setVehicleColor(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="White" value="White" />
                <Picker.Item label="Black" value="Black" />
                <Picker.Item label="Red" value="Red" />
                <Picker.Item label="Blue" value="Blue" />
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vehicle Model</Text>
          <TextInput
            style={styles.input}
            value={vehicleModel}
            onChangeText={setVehicleModel}
            placeholder="Enter model"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vehicle Registration Plate</Text>
          <TextInput
            style={styles.input}
            value={registrationPlate}
            onChangeText={setRegistrationPlate}
            placeholder="Enter registration plate"
          />
        </View>

        <Text style={styles.label}>Photo</Text>
        <View style={styles.photoContainer}>
          {photo.length > 0 ? photo.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.photo} />
          )) : null}
          <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
            <FontAwesome name="plus" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  rowInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    color: '#333',
    fontSize: 16,
  },
  input: {
    height: 45,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  photoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  addPhotoButton: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#d4e157',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddVehicleScreen;