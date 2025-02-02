import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api-dev.sendbypass.com/v1/login/';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    try {
      const response = await axios.post(API_URL, form);
      console.log('🚀 ~ handleSubmit ~ response:', response);
      AsyncStorage.setItem('userToken', response.data.access);
      router.replace('/home');
      // fetch('https://api-dev.sendbypass.com/v1/login/', {
      //   headers: {
      //     accept: 'application/json, text/plain, */*',
      //     'content-type': 'application/json',
      //   },
      //   referrer: 'http://localhost:8081/',
      //   referrerPolicy: 'strict-origin-when-cross-origin',
      //   body: '{"email":"rahimi.sina1999@gmail.com","password":"sinasina"}',
      //   method: 'POST',
      // });
    } catch (error) {}
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl text-white font-semibold mt-10">
            Log in to Send by Pass
          </Text>
          <FormField
            label="Email"
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            className="mt-7"
            keyboardType="email-address"
          />
          <FormField
            label="Password"
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            className="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 ">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg text-purple-400">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
