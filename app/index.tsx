import { View, Text, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';

const App = () => {
  const url = Linking.useURL();

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="text-4xl font-black text-purple-500">
            Sendbypass
          </Text>
          <Text className="text-3xl text-white font-bold text-center mt-5">
            React native demo app
          </Text>
          <Text className="text-sm text-gray-100 mt-7 text-center">
            testing combination of native login and webview
          </Text>
          <Text className="text-white">URL: {url}</Text>
          <CustomButton
            title="Let's go"
            handlePress={() => router.push('/main')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default App;
