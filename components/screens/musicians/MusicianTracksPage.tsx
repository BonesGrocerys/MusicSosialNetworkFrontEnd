import { View, Text } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { TypeRootStackParamList } from "../../../navigation/types";
import { RouteProp } from "@react-navigation/native";

interface IMusicianTracksPage {
  route: RouteProp<TypeRootStackParamList, "MusicianTracksPage">;
}

const MusicianTracksPage: FC<IMusicianTracksPage> = ({ route }) => {
  return (
    <View>
      <Text>{route?.params?.musicianId}</Text>
    </View>
  );
};

export default MusicianTracksPage;
