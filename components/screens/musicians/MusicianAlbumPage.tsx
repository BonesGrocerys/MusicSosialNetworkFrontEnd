import { View, Text } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { TypeRootStackParamList } from "../../../navigation/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface IMusicianAlbumPage {
  route: RouteProp<TypeRootStackParamList, "MusicianAlbumPage">;
}

const MusicianAlbumPage: FC<IMusicianAlbumPage> = ({ route }) => {
  return (
    <View>
      <Text>{route?.params?.musicianId}</Text>
    </View>
  );
};

export default MusicianAlbumPage;
