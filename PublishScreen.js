import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DatePicker from "react-native-date-picker";

export default function RideOfferScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [returnRide, setReturnRide] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image source={require("./assets/carpool.jpg")} style={styles.headerImage} />

      {/* Title */}
      <Text style={styles.title}>Offer a Ride</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Icon name="map-pin" size={16} color="#888" style={styles.inputIcon} />
        <TextInput placeholder="Pick-up" value={pickup} onChangeText={setPickup} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="map-pin" size={16} color="#888" style={styles.inputIcon} />
        <TextInput placeholder="Drop-off" value={dropoff} onChangeText={setDropoff} style={styles.input} />
        <Icon name="refresh-cw" size={18} color="#888" />
      </View>

      {/* Date and Time Pickers */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.inputContainer, styles.smallInput]} onPress={() => setOpenDate(true)}>
          <Icon name="calendar" size={16} color="#888" style={styles.inputIcon} />
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.inputContainer, styles.smallInput]} onPress={() => setOpenTime(true)}>
          <Icon name="clock" size={16} color="#888" style={styles.inputIcon} />
          <Text>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={openDate}
        date={date}
        mode="date"
        onConfirm={(selectedDate) => {
          setOpenDate(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpenDate(false)}
      />

      {/* Time Picker Modal */}
      <DatePicker
        modal
        open={openTime}
        date={time}
        mode="time"
        onConfirm={(selectedTime) => {
          setOpenTime(false);
          setTime(selectedTime);
        }}
        onCancel={() => setOpenTime(false)}
      />

      {/* Passenger Count & Price */}
      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.smallInput]}>
          <Icon name="users" size={16} color="#888" style={styles.inputIcon} />
          <TouchableOpacity onPress={() => setPassengers(Math.max(1, passengers - 1))}>
            <Icon name="minus" size={16} color="black" />
          </TouchableOpacity>
          <Text style={styles.passengerCount}>{passengers}</Text>
          <TouchableOpacity onPress={() => setPassengers(Math.min(3, passengers + 1))}>
            <Icon name="plus" size={16} color="black" />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, styles.smallInput]}>
          <Text style={styles.currency}>₹</Text>
          <TextInput placeholder="Price per seat" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="edit-2" size={16} color="#888" style={styles.inputIcon} />
        <TextInput placeholder="Add a note" value={note} onChangeText={setNote} style={styles.input} />
      </View>

      {/* Return Ride Toggle */}
      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Return</Text>
        <Switch value={returnRide} onValueChange={setReturnRide} />
      </View>

      {/* Publish Button */}
      <TouchableOpacity style={styles.publishButton}>
        <Text style={styles.publishButtonText}>Publish</Text>
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
  headerImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  passengerCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  publishButton: {
    backgroundColor: "#3568FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  publishButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

