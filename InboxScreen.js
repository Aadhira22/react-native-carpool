import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, Alert, Image, ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InboxScreen = () => {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const storedData = await AsyncStorage.getItem('userData');

          if (!storedData) {
            Alert.alert('Error', 'User data not found. Please log in again.');
            return;
          }

          const parsed = JSON.parse(storedData);
          setUserId(parsed.id);

          const res = await fetch(`http://localhost:5000/api/group/user/${parsed.id}`);
          if (!res.ok) throw new Error('Failed to fetch group chats');

          const data = await res.json();
          setChats(data);
        } catch (err) {
          console.error('Error loading inbox:', err);
          Alert.alert('Error', 'Could not fetch your chats.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  const filteredChats = chats.filter(chat =>
    chat.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (groupId) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const res = await fetch(`http://localhost:5000/api/group/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        Alert.alert('Error', result.error || 'Could not delete group');
        return;
      }
  
      // Remove the deleted group from state
      setChats(prev => prev.filter(chat => chat._id !== groupId));
      Alert.alert('Success', 'Group deleted');
    } catch (err) {
      console.error('Failed to delete group:', err);
      Alert.alert('Error', 'Failed to delete group');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inbox</Text>

      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search groups..."
      />

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  chatType: 'group',
                  chatId: item._id,
                  name: item.name,
                  userId
                })
              }
            >
              <View style={styles.chatItem}>
                <Image
                  source={{
                    uri: item.imageUrl
                      ? `http://192.168.1.33:5000${item.imageUrl}`
                      : 'https://via.placeholder.com/50',
                  }}
                  style={styles.chatImage}
                />
                <Text style={styles.chatName}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => handleDelete(item._id)}
                  style={styles.delete}
                >
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>

              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
              No groups found.
            </Text>
          }
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateGroupScreen', { userId })}
        style={styles.createBtn}
        disabled={!userId}
      >
        <Text style={[styles.createText, !userId && { color: 'gray' }]}>+ Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  search: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8, marginBottom: 10 },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  chatImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
    paddingRight:40,
  },
  delete:{
    marginRight:20
  },
  createBtn: { marginTop: 20, alignItems: 'center' },
  createText: { color: 'blue', fontSize: 16 },
});

export default InboxScreen;
