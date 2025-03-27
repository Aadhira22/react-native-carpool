import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DriverDetailsScreen = () => {
  const driver = {
    name: "Arshad",
    rating: 4.5,
    vehicle: "Honda City",
    experience: "10 years",
    vaccinated: "Yes",
    plateNumber: "TN72 AP 19099",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  };

  const reviews = [
    {
      id: '1',
      name: 'Boosh',
      comment: 'Very good person, safe to travel with, friendly personality.',
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/31.jpg"
    },
    {
      id: '2',
      name: 'Lokesh',
      comment: 'Very good person, safe to travel with, friendly personality.',
      rating: 3,
      image: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    {
      id: '3',
      name: 'Ravi',
      comment: 'Smooth ride, good driving skills.',
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Driver Card */}
      <View style={styles.driverCard}>
        <Image source={{ uri: driver.image }} style={styles.driverImage} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverDetails}>{driver.plateNumber}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{driver.rating}</Text>
            <Ionicons name="star" size={18} color="#FFD700" />
          </View>
        </View>
      </View>

      {/* Driver Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Vehicle: {driver.vehicle}</Text>
        <Text style={styles.detailsText}>Work experience: {driver.experience}</Text>
        <Text style={styles.detailsText}>Double Vaccinated? {driver.vaccinated}</Text>
      </View>

      {/* Reviews Section */}
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewTitle}>Reviews</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Image source={{ uri: item.image }} style={styles.reviewImage} />
            <View style={styles.reviewInfo}>
              <Text style={styles.reviewName}>{item.comment}</Text>
              <Text style={styles.reviewer}>{item.name}</Text>
              <View style={styles.starContainer}>
                {[...Array(item.rating)].map((_, i) => (
                  <Ionicons key={i} name="star" size={16} color="#FFD700" />
                ))}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9F9F9' },
  backButton: { marginBottom: 20 },
  driverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', padding: 15, borderRadius: 10 },
  driverImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 18, fontWeight: 'bold' },
  driverDetails: { fontSize: 14, color: 'gray' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { fontSize: 16, marginRight: 5 },
  detailsContainer: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginVertical: 15 },
  detailsText: { fontSize: 14, marginBottom: 5 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  reviewTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#007BFF', fontSize: 14 },
  reviewCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 10 },
  reviewImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  reviewInfo: { flex: 1 },
  reviewName: { fontSize: 14, fontWeight: 'bold' },
  reviewer: { fontSize: 12, color: 'gray', marginBottom: 5 },
  starContainer: { flexDirection: 'row' },
});

export default DriverDetailsScreen;
