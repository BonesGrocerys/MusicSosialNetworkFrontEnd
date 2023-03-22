import { View, Text } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../navigation/types";

interface IAlbumPage {
  route: RouteProp<TypeRootStackParamList, "AlbumPage">;
}

const AlbumPage: FC<IAlbumPage> = ({ route }) => {
  return (
    <View>
      <Text>{route.params.id}</Text>
      <Text>{route.params.albumTitle}</Text>
    </View>
  );
};

export default AlbumPage;
