import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
// import Icon from 'react-native-vector-icons/AntDesign';

interface IField {
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
  isSecure?: boolean;
  style?: any;
  isSearch?: boolean;
}

const Field: FC<IField> = ({
  onChange,
  value = "",
  placeholder,
  isSecure,
  isSearch,
  style,
}) => {
  return (
    <View style={{ ...styles.wrapper, ...styles.shadow, ...style }}>
      {/* {isSearch && <Icon name="search1" size={20} style={{ opacity: 0.45 }} />} */}
      <TextInput
        style={{
          ...styles.input,
          width: isSearch ? "90%" : "100%",
          paddingHorizontal: isSearch ? 10 : 15,
        }}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        secureTextEntry={isSecure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "#e3e3e3",
    borderColor: "black",
    fontSize: 17,
    padding: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Field;
