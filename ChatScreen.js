import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const { chatName } = route.params; // Get chat name from navigation

  // Sample chat messages
  const [messages, setMessages] = useState([
    { id: '1', text: 'By when will you reach?', sender: 'user' },
    { id: '2', text: '10:00 am', sender: 'other' },
  ]);
  
  const [inputText, setInputText] = useState('');

  // Function to send a message
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'user' }]);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{chatName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: '70%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#EAEAEA' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: '#ddd' },
  input: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10 },
  sendButton: { marginLeft: 10, padding: 10, backgroundColor: '#007BFF', borderRadius: 10 },
  sendText: { color: '#fff', fontWeight: 'bold' }
});

export default ChatScreen;
