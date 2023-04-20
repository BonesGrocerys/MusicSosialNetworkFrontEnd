import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { FC, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../../navigation/types";
import { NavigationAction } from "@react-navigation/native";

interface IAddTrackInPlaylist {
  navigation: AddTrackInPlaylistNavigationProp;
}
type AddTrackInPlaylistNavigationProp =
  StackNavigationProp<TypeRootStackParamList>;
const AddTrackInPlaylist: FC<IAddTrackInPlaylist> = ({ navigation }) => {
  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  return (
    <View>
      <ScrollView>
        <TouchableOpacity>
          <Text>PLAYLIST 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>PLAYLIST 2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>PLAYLIST 3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Text>Назад</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddTrackInPlaylist;
