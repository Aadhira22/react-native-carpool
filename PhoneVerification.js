import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PhoneVerification = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  return (
    <View className="flex-1 bg-white px-5 py-10">
      
      {/* Header */}
      <Text className="text-gray-500 text-sm uppercase tracking-wide text-center mb-5">Profile Verification</Text>

      {/* Progress Bar */}
      <View className="w-full h-1 bg-gray-200 rounded-full mb-5">
        <View className="w-1/3 h-full bg-black rounded-full"></View>
      </View>

      {/* Title */}
      <Text className="text-2xl font-semibold text-black">Enter your phone number</Text>
      <Text className="text-gray-500 mt-2">We'll text you a code so we can confirm that it's you.</Text>

      {/* Phone Input */}
      <View className="mt-6">
        <Text className="text-gray-500 mb-1">What's your phone number?</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-lg"
          keyboardType="phone-pad"
          placeholder="+1 (123) 456-7890"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Privacy Notice */}
      <View className="flex-row items-center mt-4">
        <Feather name="lock" size={16} color="gray" />
        <Text className="text-gray-500 ml-2 text-sm">Only shared with confirmed bookings</Text>
      </View>

      {/* Send Verification Code Button */}
      <TouchableOpacity className="bg-orange-500 mt-8 py-4 rounded-lg">
        <Text className="text-white text-lg font-semibold text-center">Send Verification Code</Text>
      </TouchableOpacity>

    </View>
  );
};

export default PhoneVerification;
