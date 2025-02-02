import {
  View,
  Text,
  KeyboardType,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { ChangeEvent, useState } from "react";

interface Props {
  label: string;
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
      <Text className="text-base text-gray-100 font-medium">{label}</Text>
      <View className="w-full h-16 px-4 bg-gray-900 border-2 border-gray-950 rounded-2xl focus:border-purple-400 items-center flex-row">
        <TextInput
          className="flex-1  text-white font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#0b0b8b"
          onChangeText={handleChangeText}
          secureTextEntry={label === "Password" && !showPassword}
        />

        {label === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((perv) => !perv)}>
            <View
              className={`w-6 h-6 rounded-full ${
                showPassword ? "bg-blue-400" : "bg-orange-400"
              } `}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
