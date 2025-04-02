import React, { useState, useContext } from "react";
import InboxScreen from './InboxScreen';
import RideOverview from './RideOverview';
import ProfileScreen from './ProfileScreen';
import PublishScreen from './PublishScreen';
import MapScreen from './MapScreen';
import { RideContext } from "./RideContext";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

// Ride Search Screen
const RideSearchScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [passengerCount, setPassengerCount] = useState("1");
  const { rides } = useContext(RideContext);

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Find Your Ride</Text>
        <TextInput style={styles.input} placeholder="Enter Pick-Up Location" />
        <TextInput style={styles.input} placeholder="Enter Drop-Off Location" />
        
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowPicker(true)}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <View style={styles.pickerContainer}>
          <Picker selectedValue={passengerCount} onValueChange={(itemValue) => setPassengerCount(itemValue)}>
            <Picker.Item label="1 Passenger" value="1" />
            <Picker.Item label="2 Passengers" value="2" />
            <Picker.Item label="3 Passengers" value="3" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate("SearchResultScreen")}>
          <Text style={styles.searchButtonText}>Search Rides</Text>
        </TouchableOpacity>

        {/* Upcoming Rides Section */}
        <View>
          <Text style={styles.subTitle}>Upcoming Rides</Text>
          {rides.length === 0 ? (
            <Text style={styles.noRidesText}>No upcoming rides</Text>
          ) : (
            rides.map((ride, index) => (
              <View key={index} style={styles.rideCard}>
                <View style={styles.rideIcon}>
                  <FontAwesome name="car" size={24} color="#fff" />
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideTitle}>{ride.pickup} → {ride.dropoff}</Text>
                  <Text style={styles.rideDetails}>📅 {ride.date} | ⏰ {ride.time}</Text>
                  <Text style={styles.rideDetails}>👥 {ride.passengers} Seats | 💰 ₹{ride.price}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#FF4500', tabBarInactiveTintColor: 'gray' }}>
      <Tab.Screen 
        name="Search" 
        component={RideSearchScreen} 
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} /> }}
      />
      <Tab.Screen 
        name="Publish" 
        component={PublishScreen} 
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="plus-circle" size={size} color={color} /> }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="map" size={size} color={color} /> }}
      />
      <Tab.Screen 
        name="Inbox" 
        component={InboxScreen} 
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="envelope" size={size} color={color} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
};

// Updated Styles
const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 16 },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { backgroundColor: "#eee", padding: 15, borderRadius: 8, marginBottom: 10 },
  dateInput: { backgroundColor: "#eee", padding: 15, borderRadius: 8, marginBottom: 10, alignItems: "center" },
  dateText: { fontSize: 16 },
  pickerContainer: { backgroundColor: "#eee", borderRadius: 8, marginBottom: 10 },
  searchButton: { backgroundColor: "#FF4500", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  searchButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  subTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  noRidesText: { textAlign: "center", color: "#888", marginTop: 10 },
  
  // Updated Ride Card Styles
  rideCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rideInfo: { flex: 1, marginLeft: 10 },
  rideTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  rideDetails: { fontSize: 14, color: "#555", marginTop: 4 },
  rideIcon: { backgroundColor: "#FF4500", padding: 10, borderRadius: 50, alignItems: "center" },
});

export default App;