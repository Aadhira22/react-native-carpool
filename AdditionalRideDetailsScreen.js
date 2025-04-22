import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const AdditionalRideDetailsScreen = ({ route, navigation }) => {
  const { pickupLocation, dropoffLocation, routeSummary, routeDuration, routeCoordinates } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [passengers, setPassengers] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const formatDate = (d) => d.toISOString().split('T')[0];
  const formatTime = (t) => t.toTimeString().split(' ')[0].slice(0, 5); // "HH:MM"

  const handlePublish = async () => {
    setLoading(true);

    const rideData = {
      pickup: {
        lat: pickupLocation.latitude,
        lng: pickupLocation.longitude,
        description: pickupLocation.description,
      },
      dropoff: {
        lat: dropoffLocation.latitude,
        lng: dropoffLocation.longitude,
        description: dropoffLocation.description,
      },
      route: {
        duration: routeDuration,
        summary: routeSummary,
        coordinates: routeCoordinates.map(coord => ({
          lat: coord.latitude,
          lng: coord.longitude,
        })),
      },
      date: formatDate(date),
      time: formatTime(time),
      passengers: Number(passengers),
    };

    try {
      const response = await fetch('http://<YOUR_LOCAL_IP>:5000/api/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Ride published successfully!');
        navigation.goBack();
      } else {
        console.error(result);
        Alert.alert('Error', result.error || 'Failed to publish ride');
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Network Error', 'Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date:</Text>
      <Button title={formatDate(date)} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Select Time:</Text>
      <Button title={formatTime(time)} onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleTimeChange}
        />
      )}

      <Text style={styles.label}>Number of Passengers:</Text>
      <Picker
        selectedValue={passengers}
        onValueChange={(value) => setPassengers(value)}
        style={styles.picker}
      >
        {[1, 2, 3, 4, 5, 6].map(num => (
          <Picker.Item label={num.toString()} value={num.toString()} key={num} />
        ))}
      </Picker>

      <Button
        title={loading ? 'Publishing...' : 'Publish Ride'}
        onPress={handlePublish}
        disabled={loading}
      />
    </View>
  );
};

export default AdditionalRideDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  picker: {
    backgroundColor: '#eee',
    marginBottom: 20,
  },
});
