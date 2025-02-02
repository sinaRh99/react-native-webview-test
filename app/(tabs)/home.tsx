import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  useEffect(() => {
    const loadToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('🚀 ~ loadToken ~ userToken:', userToken);
    };

    loadToken();
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
