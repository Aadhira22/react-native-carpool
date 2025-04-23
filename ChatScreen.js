import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons';

const socket = io('http://192.168.1.33:5000');

const ChatScreen = ({ navigation, route }) => {
  const { chatId, chatType, name, userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMemberId, setNewMemberId] = useState('');

  const flatListRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/messages/${chatType}/${chatId}`)
      .then(res => res.json())
      .then(data => setMessages(data.reverse()));

    const handleReceiveMessage = (msg) => {
      if (msg.receiver === chatId && msg.chatType === chatType) {
        setMessages(prev => {
          const exists = prev.some(m => m._id === msg._id);
          return exists ? prev : [msg, ...prev];
        });
        scrollToBottom();
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);
    checkIfCreator();

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const checkIfCreator = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/group/user/${userId}`);
      const groups = await res.json();
      const group = groups.find(g => g._id === chatId);
      if (group && group.createdBy === userId) setIsCreator(true);
    } catch (err) {
      console.error('Failed to check group creator:', err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const msg = {
      text,
      sender: userId,
      receiver: chatId,
      chatType
    };

    const res = await fetch('http://localhost:5000/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });

    const saved = await res.json();
    socket.emit('sendMessage', saved); // Let socket handle message distribution
    setText('');
    scrollToBottom();
  };

  const handleAddMember = async () => {
    if (!newMemberId.trim()) {
      Alert.alert('Input Required', 'Please enter a valid user ID.');
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    try {
      const res = await fetch(`http://localhost:5000/api/group/${chatId}/add-member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: newMemberId.trim() }),
      });

      if (!res.ok) throw new Error('Request failed');

      const updatedGroup = await res.json();
      Alert.alert('Success', `User  added to "${updatedGroup.name}"`);
      setModalVisible(false);
      setNewMemberId('');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not add user to group.');
    }
  };

  const renderMessage = ({ item }) => {
 const isMine = String(item.sender?._id || item.sender) === String(userId);
    return (
      <View style={isMine ? styles.mine : styles.their}>
        {!isMine && <Text style={styles.senderName}>{item.senderName}</Text>}
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
            {isCreator && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
              >
                <Icon name="person-add" size={22} color="white" />
              </TouchableOpacity>
            )}
          </View>

          {/* Message list */}
          <View style={styles.messageContainer}>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => String(item._id || Math.random())}
              inverted
              style={styles.messageList}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          </View>

          {/* Input bar */}
          <View style={styles.inputWrapper}>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Type a message"
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Modal for adding member */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Member</Text>
            <TextInput
              placeholder="Enter User ID"
              value={newMemberId}
              onChangeText={setNewMemberId}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button title="Add" onPress={handleAddMember} />
              <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoid: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addButton: {
    marginLeft: 'auto',
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
  },
  messageContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  messageList: { flex: 1 },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  their: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  senderName: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
    color: '#555',
  },
  inputWrapper: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  sendBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'blue',
    marginLeft: 8,
    borderRadius: 8,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
export  default ChatScreen;
