import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
import FormField from './FormField';
import CustomButton from './CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  handleClose: () => void;
  handleGetToken: (token: string) => void;
}

const windowHeight = Dimensions.get('window').height;

const BottomSheet = ({ handleClose, handleGetToken }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sheetState, setSheetState] = useState<
    'login-email' | 'login-password'
  >('login-email');

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const API_URL = 'https://api-dev.sendbypass.com/v1/login/';
    try {
      setIsSubmitting(true);
      const response = await axios.post(API_URL, { email, password });
      const { access } = response.data;
      handleGetToken(access || '');
      AsyncStorage.setItem('access', access);
      // AsyncStorage.setItem('refresh', refresh);
      setIsSubmitting(false);
      handleClose();
    } catch (error) {
      setIsSubmitting(false);
    }
  }

  return (
    <View
      style={{ maxHeight: windowHeight * 0.8 }}
      className="w-full bg-white rounded-t-[28px] absolute bottom-[80px] left-0 right-0"
    >
      <View className="mb-[16px] items-center p-[25px]">
        <View className="bg-[#7A7580] w-[40px] h-[5px] rounded-[100px]"></View>
      </View>

      <View className="px-[30px] pb-[20px]">
        <View className="mb-[15px] flex-row justify-between">
          <TouchableOpacity
            className={`flex-row items-center justify-center gap-[10px] ${
              sheetState === 'login-password' ? 'opacity-1' : 'opacity-0'
            }`}
            onPress={() => setSheetState('login-email')}
          >
            <Image
              source={icons.arrowLeft}
              className="w-[20px] h-[20px]"
              tintColor="#67548E"
            />
            <Text className="font-medium text-[#67548E] text-base -mb-[5px]">
              Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[40px] h-[40px] rounded-lg border-2 border-[#DED8E1] items-center justify-center"
            onPress={handleClose}
          >
            <Image
              source={icons.close}
              className="w-[25px] h-[25px]"
              tintColor="#67548E"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {sheetState === 'login-email' && (
          <View>
            <Text className="text-2xl font-bold mb-[5px]">
              Sign in to Sendbypass
            </Text>
            <Text className="text-sm text-[#49454F]">
              Don't have an account?{' '}
              <Text className="text-[#67548E]">Sign Up</Text>
            </Text>

            <View className="mt-[30px] rounded-lg border-2 border-[#7A7580] px-[30px] py-[12px] flex-row items-center justify-center gap-[10px]">
              <Image
                source={icons.google}
                className="w-[20px] h-[20px]"
                resizeMode="contain"
              />
              <Text className="text-sm -mb-1 font-medium text-[#67548E]">
                Continue with Google
              </Text>
            </View>

            <View className="my-[25px] px-[20px] flex-row gap-[20px] items-center">
              <View className="flex-1 h-0.5 bg-[#ECE6F0]"></View>
              <Text className="text-xs font-medium text-[#7A7580]">OR</Text>
              <View className="flex-1 h-0.5 bg-[#ECE6F0]"></View>
            </View>
            <FormField
              value={email}
              handleChangeText={e => setEmail(e)}
              placeholder="Email"
              className="mb-[25px]"
            />
            <CustomButton
              handlePress={() => setSheetState('login-password')}
              title="Continue"
              containerStyles="mb-[20px]"
              disabled={!email}
            />

            <Text className="text-xs text-[#7A7580]">
              By joining, you agree to the Sendbypass{' '}
              <Text className="underline">Terms & Conditions.</Text> Please read
              our <Text className="underline">Privacy Policy</Text> to learn how
              we use your personal data.
            </Text>
          </View>
        )}

        {sheetState === 'login-password' && (
          <View>
            <Text className="text-2xl font-bold mb-[5px]">
              Continue with email
            </Text>
            <Text className="text-sm text-[#49454F]">{email}</Text>

            <FormField
              value={password}
              handleChangeText={e => setPassword(e)}
              placeholder="Password"
              className="mb-[25px] mt-[30px]"
              label="Password"
            />
            <CustomButton
              handlePress={handleSubmit}
              title="Sign in"
              containerStyles="mb-[20px]"
              disabled={!password}
              isLoading={isSubmitting}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default BottomSheet;
