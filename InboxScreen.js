import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatScreen from './ChatScreen';
const chatData = [
  { id: '1', name: 'User 1', message: 'Where are you?', avatar: require('./assets/user1.jpg') },
  { id: '2', name: 'User 2', message: "I'm about to reach.", avatar: require('./assets/user1.jpg') },
  { id: '3', name: 'User 3', message: "Let's meet at the corner.", avatar: require('./assets/user1.jpg') },
  { id: '4', name: 'Car pool in Delhi', message: 'Mr. Singh: Shared an invite for the upcoming carpool!', avatar: require('./assets/carpool.jpg') },
  { id: '5', name: 'Travel Buddies', message: 'Ms. Sharma: Anybody interested in a weekend getaway?', avatar: require('./assets/user1.jpg') }
];

const InboxScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation(); // Ensure this hook is being used properly

  const filteredChats = chatData.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase()) ||
    chat.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inbox</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { chatName: item.name })}>
            <View style={styles.chatItem}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.chatText}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  searchBar: { backgroundColor: '#F2F2F2', padding: 10, borderRadius: 20, marginBottom: 15 },
  chatItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatText: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatMessage: { fontSize: 14, color: '#555' }
});

export default InboxScreen;
