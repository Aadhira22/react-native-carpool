import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const Data = await AsyncStorage.getItem('userData');
      if (!token || !Data) {
        navigation.replace('Login'); // Redirect to login if not logged in
        return;
      }

      try {
        const user = JSON.parse(Data); // ✅ Convert stored JSON string back to object
        const email = user.email;
        const response = await fetch(`http://localhost:5000/api/profile?email=${email}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          console.log('mello',data);
          setUser(data);
        } else {
          console.error('Error fetching user profile:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove token
      await AsyncStorage.removeItem('userData'); // Remove email
      navigation.replace('Login'); // Redirect to login
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Try again.");
    }
  };

  if (!user) {return <Text style={styles.loadingText}>Loading...</Text>;}

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.profileImage || "https://via.placeholder.com/150" }} style={styles.profileImage} />
        <View style={styles.profileText}>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      {/* My Account Section */}
      <Text style={styles.sectionTitle}>My account</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("EditAccountScreen",{ user ,onGoBack: (newUserData) => setUser(newUserData) })}>
        <Icon name="user" size={18} color="#333" />
        <Text style={styles.optionText}>Personal information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("VehicleManagementScreen",{userId:user._id})}>
      <FontAwesome name="car" size={24} color="black" />
        <Text style={styles.optionText}>Vehicle management</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Icon name="map-pin" size={18} color="#333" />
        <Text style={styles.optionText}>Saved addresses</Text>
      </TouchableOpacity>

      {/* Additional Section */}
      <Text style={styles.sectionTitle}>Additional</Text>
      <TouchableOpacity style={styles.option}>
        <Icon name="help-circle" size={18} color="#333" />
        <Text style={styles.optionText}>Support</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out" size={18} color="white" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
  },
  profileText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#777",
  },
  email: {
    fontSize: 14,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

