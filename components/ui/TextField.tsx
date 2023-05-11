import { useState } from "react";
import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface CustomTextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput = ({
  placeholder,
  onChangeText,
}: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocused ? styles.focusedInput : null]}
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#A0A0A0",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#FFF",
    width: "100%",
  },
  focusedInput: {
    borderColor: "white",
  },
});

export default CustomTextInput;
