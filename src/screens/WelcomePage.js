import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'


const WelcomePage = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView className='flex-1' style={{backgroundColor: 'snow'}}>
        <View className='flex-1 flex justify-around my-32'>
            
            <Text
                className='text-black font-bold text-4xl text-center'>
                Let's Get Started!
            </Text>

            <View className="flex-row justify-center">
                <Image source={require("../../assets/images/welcomeImage.jpg")}
                    style={{width:350, height:350}} />
            </View>

            <View className='space-y-4'>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Signup')}
                    className='py-3 bg-blue-950 mx-7 rounded-xl'>
                    <Text
                        className='text-2xl font-bold text-center text-white'>
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <View className='flex-row justify-center mt-5'>
                    <Text className='text-lg text-black font-semibold'>
                        Already have an account?
                    </Text>

                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className='text-lg font-bold text-blue-950'> Log In </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    </SafeAreaView>
  )
}

export default WelcomePage