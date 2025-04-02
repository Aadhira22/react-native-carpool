import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image, ScrollView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext } from "react";
import { RideContext } from "./RideContext";

export default function RideOfferScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [returnRide, setReturnRide] = useState(false);
  const { addRide } = useContext(RideContext);

  const handlePublishRide = () => {
    const newRide = {
      pickup,
      dropoff,
      date: date.toDateString(),
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      passengers,
      price,
    };
    addRide(newRide);
    alert("Ride Published Successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require("./assets/carpool.jpg")} style={styles.headerImage} />
        <Text style={styles.title}>Offer a Ride</Text>
        <View style={styles.inputContainer}>
          <Icon name="map-pin" size={16} color="#888" style={styles.inputIcon} />
          <TextInput placeholder="Pick-up" value={pickup} onChangeText={setPickup} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="map-pin" size={16} color="#888" style={styles.inputIcon} />
          <TextInput placeholder="Drop-off" value={dropoff} onChangeText={setDropoff} style={styles.input} />
          <TouchableOpacity onPress={() => {
          // Swap pickup and dropoff values
          setPickup(dropoff);
          setDropoff(pickup);
          }}>
    <Icon name="refresh-cw" size={18} color="#888" />
  </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.inputContainer, styles.smallInput]} onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar" size={16} color="#888" style={styles.inputIcon} />
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.inputContainer, styles.smallInput]} onPress={() => setShowTimePicker(true)}>
            <Icon name="clock" size={16} color="#888" style={styles.inputIcon} />
            <Text>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}

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
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Return</Text>
          <Switch value={returnRide} onValueChange={setReturnRide} />
        </View>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublishRide}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
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
    backgroundColor: "#FF4500",
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
