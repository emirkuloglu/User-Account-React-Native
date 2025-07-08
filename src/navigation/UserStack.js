import React from 'react'
import { HomePage,ProfilePage } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack.Navigator
          screenOptions={{headerShown:false}}>

          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      </Stack.Navigator>
    </>
  )
}

export default UserStack;