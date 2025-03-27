import React, { useState } from "react";
import { 
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity 
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function EmergencyContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([
    { fullName: "", phoneNumber: "" },
    { fullName: "", phoneNumber: "" },
  ]);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Back Button & Edit */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Emergency Numbers</Text>
        <TouchableOpacity onPress={() => console.log("Edit Pressed")} style={styles.editButton}>
          <Icon name="edit" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeading}>Add Emergency Contacts</Text>

      {/* Contacts Form */}
      {contacts.map((contact, index) => (
        <View key={index} style={styles.contactSection}>
          <Text style={styles.label}>Contact N.{index + 1}</Text>

          <Text style={styles.fieldLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            value={contact.fullName}
            onChangeText={(text) => {
              const newContacts = [...contacts];
              newContacts[index].fullName = text;
              setContacts(newContacts);
            }}
          />

          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={contact.phoneNumber}
            onChangeText={(text) => {
              const newContacts = [...contacts];
              newContacts[index].phoneNumber = text;
              setContacts(newContacts);
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  editButton: {
    padding: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  contactSection: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F3F3F3",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
});

