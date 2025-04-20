import React, { useState } from 'react';
import {
  View, TextInput, Button, StyleSheet, Image,
  TouchableOpacity, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateGroupScreen = ({ navigation, route }) => {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const { userId } = route.params;

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setGroupImage(response.assets[0]);
      }
    });
  };

  const createGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Validation', 'Group name is required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('memberIds', JSON.stringify([userId]));

    if (groupImage) {
      formData.append('image', {
        uri: groupImage.uri,
        name: groupImage.fileName || 'group.jpg',
        type: groupImage.type || 'image/jpeg',
      });
    }
    const token = await AsyncStorage.getItem('userToken');
    try {
      const res = await fetch('http://localhost:5000/api/group/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to create group');
      const data = await res.json();
      navigation.goBack();
    } catch (err) {
      console.error('Group creation error:', err);
      Alert.alert('Error', 'Could not create group.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: groupImage?.uri || 'https://via.placeholder.com/50' }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Group Name"
          value={groupName}
          onChangeText={setGroupName}
          style={styles.input}
        />
      </View>
      <Button title="Create Group" onPress={createGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#ccc' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
});

export default CreateGroupScreen;
