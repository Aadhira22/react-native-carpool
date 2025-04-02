import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, Image, StyleSheet, Alert 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const VehicleManagementScreen = ({ navigation }) => {
  const [vehicle, setVehicle] = useState({
    model: 'Creta',
    plate: 'DL2CU 5417',
    imageUri: 'https://placehold.co/100x100', // Placeholder image URI
  });

  const handleAddVehicle = () => {
    // Handle Add Vehicle logic here, like navigating to a new screen to add a vehicle
   navigation.navigate("AddVehicleScreen");
  };

  const handleSelectVehicle = () => {
    // Handle selecting a vehicle, like navigating to vehicle details
    Alert.alert('Vehicle Selected', 'Navigate to the selected vehicle details!');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Vehicle Management</Text>

      {/* Selected Vehicle Display */}
      <TouchableOpacity style={styles.vehicleCard} onPress={handleSelectVehicle}>
        <Image
          source={{ uri: vehicle.imageUri }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
        <View style={styles.vehicleDetails}>
          <Text style={styles.vehicleModel}>{vehicle.model}</Text>
          <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
        </View>
        <FontAwesome name="chevron-right" size={20} color="gray" />
      </TouchableOpacity>

      {/* Add Vehicle Button */}
      <TouchableOpacity style={styles.addVehicleButton} onPress={handleAddVehicle}>
        <Text style={styles.addVehicleText}>+ Add Vehicle</Text>
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
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  vehicleImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  vehicleDetails: {
    marginLeft: 15,
    flex: 1,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  vehiclePlate: {
    fontSize: 14,
    color: '#555',
  },
  addVehicleButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d4e157', // Matches the green color in your reference
    alignItems: 'center',
    marginBottom: 20,
  },
  addVehicleText: {
    color: '#d4e157',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VehicleManagementScreen;
