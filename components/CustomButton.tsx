import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  disabled,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading || disabled}
      className={`rounded-lg py-[12px] justify-center items-center ${
        disabled ? 'bg-[#E2E2E2]' : 'bg-[#67548e]'
      } ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ddd" />
      ) : (
        <Text
          className={`text-primary font-medium ${
            disabled ? 'text-[#bbb]' : 'text-white'
          } mt-1 text-base ${textStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
