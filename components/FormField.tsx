import {
  View,
  Text,
  KeyboardType,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

interface Props {
  label?: string;
  value: string;
  handleChangeText: (e: string) => void;
  className?: string;
  keyboardType?: KeyboardType;
  placeholder?: string;
}

const FormField = ({
  label,
  value,
  placeholder,
  handleChangeText,
  className,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${className}`}>
      {/* <Text className="text-base text-gray-100 font-medium">{label}</Text> */}
      <View className="w-full h-16 px-4 pt-1 border-2 rounded-lg border-[#7A7580] focus-within:border-[#67548e] items-center flex-row">
        <TextInput
          className="flex-1 text-black font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7A7580"
          onChangeText={handleChangeText}
          secureTextEntry={label === 'Password' && !showPassword}
        />

        {label === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(perv => !perv)}>
            <Image
              source={showPassword ? icons.hide : icons.eye}
              className="w-8 h-8"
              resizeMode="contain"
              tintColor="#7A7580"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
