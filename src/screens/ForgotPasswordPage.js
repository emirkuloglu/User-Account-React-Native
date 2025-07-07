import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import { setIsLoading } from '../redux/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { Alert } from 'react-native';


const ForgotPasswordPage = () => {

const navigation = useNavigation();

const handleForgotPassword = async () => {
  if (!email) {
    Alert.alert("Error", "Please enter your email.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Done", "An email has been sent for your password reset.");
  } catch (error) {
    console.log("Reset error: ", error.message);
    Alert.alert("Error", "Did not reset password. Please check your email address.");
  }
};


const[email, setEmail] = useState("")
const[password, setPassword] = useState("")
// const[isLoading, setIsLoading] = useState(false)




  return (
    <View className="flex-1 bg-white" style={{backgroundColor: 'lightgrey'}}>
      <SafeAreaView className="flex">

        <View className="flex-row justify-start">

          <TouchableOpacity

            onPress={()=> navigation.navigate('Login')}
            className="bg-blue-950 p-2 rounded-tr-2xl rounded-bl-2xl ml-2">
            <ArrowLeftIcon size="20" color="white"/>

          </TouchableOpacity>

        </View>

        <View className="flex-row justify-center">

          <Image source={require('../../assets/images/loginIcon.png')}
            style={{width:200, height:200}} />

        </View>

      </SafeAreaView>

      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>

        <View>

          <Text className="text-2xl text-gray-700 ml-1 mb-10 font-bold"> RESET YOUR PASSWORD </Text>
          
          <Text className="text-gray-700 ml-2 mb-3 font-bold"> Email Address </Text>
          <TextInput
            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
            placeholder='Enter your email'
            onChangeText={(text)=> setEmail(text.toLowerCase())}
            value={email}
            keyboardType='email-address'
          />

          <TouchableOpacity
            className="py-3 bg-blue-950 rounded-xl mt-5"
            onPress={handleForgotPassword}
          >

            <Text className="text-lg font-xl font-bold text-center text-white">
              Send an email
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}


export default ForgotPasswordPage;