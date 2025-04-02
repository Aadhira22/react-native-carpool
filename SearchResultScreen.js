// RideRequest.js (updated)
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RideContext } from "./RideContext"; // Import context

const RideRequest = ({ navigation, route }) => {
  const { rides } = useContext(RideContext); // Get rides from context
  const { pickup, dropoff } = route.params || {}; // Get params from navigation

  // Filter rides based on pickup and dropoff
  const filteredRides = rides.filter(ride => 
    ride.pickup.includes(pickup.toLowerCase()) &&
    ride.dropoff.includes(dropoff.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} color="gray" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search Results</Text>
      </View>
      <Text style={styles.subHeaderText}>
        Found {filteredRides.length} rides for your request
      </Text>

      {filteredRides.length === 0 ? (
        <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
          No rides match your search
        </Text>
      ) : (
        filteredRides.map((ride, index) => (
          <View key={index} style={styles.card}>
            {/* Profile Section - Static for now, tweak if dynamic later */}
            <View style={styles.profileContainer}>
               <Image source={require('./assets/user1.jpg')}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.profileName}>Name</Text>
                <Text style={styles.profileRating}>
                  <FontAwesome name="star" size={12} color="yellow" /> 4.5 (77 trips)
                </Text>
              </View>
            </View>
            {/* Ride Info Section */}
            <View style={styles.infoContainer}>
              <View style={styles.routeSegment}>
                <Text style={styles.infoText}>{ride.time}</Text>
                <View style={styles.dotAndLineContainer}>
                  <FontAwesome name="circle-o" size={12} color="gray" />
                  <View style={styles.dottedLine} />
                </View>
                <Text style={styles.infoText}>{ride.pickup}</Text>
              </View>
              <View style={styles.routeSegment}>
                <Text style={styles.infoText}>{ride.time}</Text> {/* Adjust if you add end time */}
                <View style={styles.dotAndLineContainer}>
                  <FontAwesome name="circle-o" size={12} color="gray" />
                </View>
                <Text style={styles.infoText}>{ride.dropoff}</Text>
              </View>
            </View>
            {/* Details Section */}
            <View style={styles.detailsContainer}>
              <TouchableOpacity style={styles.noSmokingButton}>
                <Text style={styles.noSmokingText}>No Smoking</Text>
              </TouchableOpacity>
              <Text style={styles.seatsText}>
                {ride.passengers} Seats available <FontAwesome name="user" size={12} color="gray" />
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.detailLabel}>ROUTE</Text>
                <Text style={styles.detailText}>Going Only</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>VEHICLE</Text>
                <Text style={styles.detailText}>Hyundai Creta</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>PAY</Text>
                <Text style={styles.detailText}>₹{ride.price}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.requestButton}>
              <Text style={styles.requestButtonText}>Request a ride</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

// Styles unchanged, keeping your layout as is


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically align items in the center
    marginBottom: 14,
    marginTop:30
  },
  backButton: {
    marginRight: 16, // Space between the arrow and the header text
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 14,
    color: 'gray',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  profileRating: {
    fontSize: 12,
    color: 'gray',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  routeSegment: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically align items in the center
    marginBottom: 8, // Space between route segments
  },
  icon: {
    marginHorizontal: 8, // Space between text and icons
  },
  dotAndLineContainer: {
    alignItems: 'center', // Align items vertically
    justifyContent: 'center', // Center items horizontally
    marginHorizontal: 8, // Add horizontal space between icons
  },
  dottedLine: {
    borderLeftWidth: 1, // Vertical line
    borderLeftColor: 'gray',
    borderStyle: 'dotted',
    height: 24, // Height of the dotted line
    marginVertical: 4, // Space above and below the dotted line
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  noSmokingButton: {
    backgroundColor: 'black',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  noSmokingText: {
    color: 'white',
    fontSize: 12,
  },
  seatsText: {
    fontSize: 12,
    color: 'gray',
  },
  detailLabel: {
    fontSize: 12,
    color: 'gray',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  requestButton: {
    backgroundColor: '#A3E635',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  requestButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RideRequest;
