import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from './MapScreen';

const Stack = createStackNavigator();

export default function RideDetailsScreen({ navigation }){
  const userImage = require("./assets/user1.jpg"); // Import image statically

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
      <View style={styles.header}>
        <Text style={styles.headerText}>>Ride Overview</Text>
      </View>
      <View style={styles.rideInfo}>
        <View style={styles.row}>
          <Text style={styles.label}>Pickup Location</Text>
          <Text style={styles.value}>123 Main St, City</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Drop-off Location</Text>
          <Text style={styles.value}>456 Elm St, City</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estimated Fare</Text>
          <Text style={styles.value}>₹15.00</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Driver</Text>
      <View style={styles.card}>
        <Image source={userImage} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Arshad</Text>
          <Text style={styles.userDetails}>TN72 AP 19099</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="star" size={20} color="#FF4500" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Co-Passengers</Text>
      {[
        { name: "Dinesh", details: "TCS, Chennai" },
        { name: "Sara", details: "IBM, Chennai" },
      ].map((passenger, index) => (
        <View key={index}>
          <View style={styles.card}>
            <Image source={userImage} style={styles.profileImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{passenger.name}</Text>
              <Text style={styles.userDetails}>{passenger.details}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="star" size={20} color="#FF4500" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate("MapScreen")}>
  <Text style={styles.mapButtonText}>View On Map</Text>
</TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  rideInfo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userDetails: {
    fontSize: 14,
    color: "gray",
  },
  iconButton: {
    padding: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  viewDetailsButton: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  callButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  callText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mapButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  mapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

