import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
export default function ProfileScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('./assets/user1.jpg')} style={styles.profileImage} />
        <View style={styles.profileText}>
          <Text style={styles.name}>Shivanshi</Text>
          <Text style={styles.email}>shivanshi@gmail.com</Text>
        </View>
      </View>

      {/* My Account Section */}
      <Text style={styles.sectionTitle}>My account</Text>
      <TouchableOpacity style={styles.option}>
        <Icon name="user" size={18} color="#333" />
        <Text style={styles.optionText} onPress={() => navigation.navigate("EditAccountScreen")}>Personal information</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("VehicleManagementScreen")}>
        <Icon name="phone" size={18} color="#333"  />
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
      <TouchableOpacity style={styles.logoutButton}>
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
  },
  profileText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
  // #D9534F
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
});
