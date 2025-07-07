import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View className="absolute w-full h-full bg-white items-center justify-center">
      <ActivityIndicator size="large" color="black" />
      <Text className="font-bold text-base mt-2">Loading...</Text>
    </View>
  );
};

export default Loading;