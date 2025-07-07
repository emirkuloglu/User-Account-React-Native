import React from 'react'
import { LoginPage, SignUpPage, WelcomePage } from '../screens'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordPage from '../screens/ForgotPasswordPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{headerShown:false}}>

        <Stack.Screen name='Login' component={LoginPage}/>
        <Stack.Screen name='Signup' component={SignUpPage}/>
        <Stack.Screen name='Welcome' component={WelcomePage}/>
        <Stack.Screen name='Forgot' component={ForgotPasswordPage}/>

    </Stack.Navigator>
  )
}

export default AuthStack;