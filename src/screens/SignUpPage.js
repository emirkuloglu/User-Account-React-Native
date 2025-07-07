import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import { setIsLoading } from '../redux/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector} from 'react-redux';
import { register } from '../redux/userSlice';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const SignUpPage = () => 
{

  const navigation = useNavigation();


  const[username, setUsername] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[cpassword, setCpassword] = useState("")

  const dispatch = useDispatch();

  const {isLoading} = useSelector(state=>state.user)

  const handleRegister = ()=>
  {
    if(password !== cpassword)
    {
      alert("Passwords do not match!");
      return;
    }
    dispatch(register({email,password,username}))
  }


  if(isLoading)
  {
    return <Loading/>
  }

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: 'lightgrey'}}>
      <SafeAreaView className="flex">

        <View className="flex-row justify-start">
          <TouchableOpacity

            onPress={()=> navigation.navigate('Welcome')}
            className="bg-blue-950 p-2 rounded-tr-2xl rounded-bl-2xl ml-2">
            <ArrowLeftIcon size="20" color="white"/>

          </TouchableOpacity>
        </View>


        <View className="flex-row justify-center">
          <Image source={require('../../assets/images/loginIcon.png')}
            style={{width:120, height:120}} />
        </View>

      </SafeAreaView>


      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>

        <View>

          <Text className="text-gray-700 font-bold ml-2"> Full Name </Text>
          <TextInput
            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
            onChangeText={setUsername}
            value={username}
            placeholder='Enter your full name'
          />
          
          <Text className="text-gray-700 font-bold ml-2"> Email Address </Text>
          <TextInput
            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
            onChangeText={setEmail}
            value={email}
            keyboardType='email-address'
            placeholder='Enter your email'
          />

          <Text className="text-gray-700 font-bold ml-2"> Password </Text>
          <TextInput
            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            placeholder='Enter your password'
          />

          <Text className="text-gray-700 font-bold ml-2"> Confirm Password </Text>
          <TextInput
            className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
            secureTextEntry
            onChangeText={setCpassword}
            value={cpassword}
            placeholder='Confirm your password'
          />

          <TouchableOpacity
            onPress={handleRegister}
            className="py-3 bg-blue-950 rounded-xl">

            <Text className="text-lg font-xl font-bold text-center text-white">
              Sign Up
            </Text>
          </TouchableOpacity>

        </View>

        <View className='flex-row justify-center mt-5'>
            <Text className='text-lg text-gray-500 font-semibold'>
                Already have an account?
            </Text>

            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className='text-lg font-bold text-blue-950'> Login </Text>
            </TouchableOpacity>
        </View>

      </View>

      {isLoading 
      ? <Loading changeIsLoading={() => setIsLoading(false)} /> 
      : null}

    </View>
  );
}

export default SignUpPage