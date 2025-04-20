import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, Image, StyleSheet, Alert 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const VehicleManagementScreen = ({ navigation, route }) => {
  const userId = route.params?.userId;
  const [vehicle, setVehicle] = useState(null);

  // Fetch vehicle data function
  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/vehicles/${userId}`);
      setVehicle(res.data[0] || null); // fallback to null if empty array
    } catch (error) {
      console.error('Failed to fetch vehicle:', error);
    }
  };

  // Fetch on screen focus
  useFocusEffect(
    React.useCallback(() => {
      fetchVehicle();
    }, [])
  );

  // Navigate to add vehicle screen
  const handleAddVehicle = () => {
    navigation.navigate("AddVehicleScreen", { userId });
  };

  // Placeholder for future vehicle detail page
  const handleSelectVehicle = () => {
    Alert.alert('Vehicle Selected', 'Navigate to the selected vehicle details!');
  };

  // Handle vehicle delete
  const confirmDeleteVehicle = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${vehicle._id}`);
      await fetchVehicle(); // refresh state after deletion
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      Alert.alert('Error', 'Could not delete the vehicle.');
    }
  };
  
  const handleDeleteVehicle = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDeleteVehicle, // no async wrapper here!
        },
      ]
    );
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
      {vehicle ? (
        <TouchableOpacity style={styles.vehicleCard} onPress={handleSelectVehicle}>
          <Image 
            source={{ uri: vehicle.images?.[0] || 'https://via.placeholder.com/60' }} 
            style={styles.vehicleImage} 
          />
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleModel}>{vehicle.model}</Text>
            <Text style={styles.vehiclePlate}>{vehicle.plate}</Text>
          </View>
          <TouchableOpacity onPress={handleDeleteVehicle}>
            <FontAwesome name="trash" size={20} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <Text>No vehicle added yet.</Text>
      )}

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
    borderColor: '#d4e157',
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
