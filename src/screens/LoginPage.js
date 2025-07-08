import { Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../redux/userSlice';
import { login, autoLogin } from '../redux/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';



const LoginPage = () => 
  {
    const navigation = useNavigation();
      

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    // const[isLoading, setIsLoading] = useState(false)

      
      

    // userSlice içerisindeki verilerin okunması
    const {isLoading, error} = useSelector((state)=> state.user)

    console.log("Email: ", email)
    console.log("Password: ", password)
    console.log("IsLoading: ", isLoading)

    // userSlice içerisindeki reducer yapılarını kullanma veya veri gönderme
    const dispatch = useDispatch()


    //kullanıcı daha önce giriş yaptıysa kontrol et ve otomatik giriş yap
    useEffect(() => {
      dispatch(autoLogin())
    }, [])




    const handleLogin = async () =>
    {
      const result = await dispatch(login({ email, password }));

      if (login.fulfilled.match(result)) 
      {
        navigation.navigate('Home');
      }

      else 
      {
        console.log("Error: ", result.payload);
      }
    };


      return (
        <View className="flex-1 bg-white" style={{backgroundColor: 'lightgrey'}}>
          <SafeAreaView className="flex">

            <View className="flex-row justify-start">
              <TouchableOpacity

                onPress={()=> navigation.navigate('Welcome')}
                className="bg-blue-950 p-2 rounded-tr-2xl rounded-bl-2xl ml-2 mt-3">
                <ArrowLeftIcon size="25" color="white"/>

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
              
              <Text className="text-gray-700 ml-2 font-bold"> Email Address </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
                placeholder='Enter your email'
                onChangeText={(text)=> setEmail(text.toLowerCase())}
                value={email}
                keyboardType='email-address'
              />

              <Text className="text-gray-700 font-bold ml-2"> Password </Text>
              <TextInput
                className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
                secureTextEntry
                onChangeText={(password)=> setPassword(password)}
                value={password}
                placeholder='Enter your password'
              />

              <Text className="text-black text-center"> {error} </Text>

              <TouchableOpacity 
              className="flex items-end mb-5" 
              onPress={()=> navigation.navigate('Forgot')}>
                <Text className="text-gray-700 font-bold">Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                className="py-3 bg-blue-950 rounded-xl">
                <Text className="text-lg font-xl font-bold text-center text-white">
                  Login
                </Text>
              </TouchableOpacity>

            </View>


            <View className='flex-row justify-center mt-5'>
                <Text className='text-lg text-gray-500 font-semibold'>
                    Don't have an account?
                </Text>

                <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
                    <Text className='text-lg font-bold text-blue-950'> Sign Up </Text>
                </TouchableOpacity>
            </View>

          </View>

          {isLoading 
          ? <Loading changeIsLoading={() => dispatch(setIsLoading(false))} />
          : null}

        </View>
    );
}

export default LoginPage;