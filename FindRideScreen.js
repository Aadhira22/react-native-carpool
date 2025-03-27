import React, { useState } from "react";
import InboxScreen from './InboxScreen';
import RideOverview from './RideOverview';
import ProfileScreen from './ProfileScreen';
import PublishScreen from './PublishScreen';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";



// Ride Search Screen
const RideSearchScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [passengerCount, setPassengerCount] = useState("1");

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Find Your Ride</Text>
        <TextInput style={styles.input} placeholder="Enter Pick-Up Location" />
        <TextInput style={styles.input} placeholder="Enter Drop-Off Location" />

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowPicker(true)}
        >
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

        {/* Passenger Dropdown */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={passengerCount}
            onValueChange={(itemValue) => setPassengerCount(itemValue)}
          >
            <Picker.Item label="1 Passenger" value="1" />
            <Picker.Item label="2 Passengers" value="2" />
            <Picker.Item label="3 Passengers" value="3" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Rides</Text>
        </TouchableOpacity>

        {/* Upcoming Rides */}
        <Text style={styles.subTitle}>Upcoming Rides</Text>
        <View style={styles.rideCard}>
          <Image
            source={require('/assets/carpool.jpg')}
            style={styles.rideImage}
          />
          <View>
            <Text style={styles.rideTitle}>Delhi to Mumbai</Text>
            <Text>Driver: John Doe</Text>
            <Text>Departure: 9:00am</Text>
            <Text>Seats: 2</Text>
            <Text>Cost: ₹20</Text>

            {/* Navigation to Ride Overview */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate("RideOverview")}
            >
              <Text style={styles.detailsButtonText}>See Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Placeholder Screens


const RideStack = createStackNavigator();
const RideStackScreen = () => (
  <RideStack.Navigator>
    <RideStack.Screen name="RideSearch" component={RideSearchScreen} />
    <RideStack.Screen name="RideOverview" component={RideOverview} />
  </RideStack.Navigator>
);

// **Step 2: Create a Bottom Tab Navigator**
const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Search" component={RideStackScreen} />
        <Tab.Screen name="Publish" component={PublishScreen} />
        <Tab.Screen name="Inbox" component={InboxScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  scrollContainer: { marginBottom: 60 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateInput: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  dateText: { fontSize: 16 },
  pickerContainer: {
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  searchButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  subTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  rideCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  rideImage: { width: 80, height: 80, marginRight: 10 },
  rideTitle: { fontSize: 18, fontWeight: "bold" },
  detailsButton: {
    marginTop: 5,
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: { fontSize: 14 },
});

export default App;
