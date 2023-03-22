import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <ActivityIndicator size="large" color="white" style={{ marginTop: 10 }} />
  );
};

export default Loader;
