import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-4">Profile Page</Text>
      <Pressable
        onPress={handleLogout}
        className="bg-red-600 px-5 py-3 rounded"
      >
        <Text className="text-white font-bold">Log Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfilePage;
