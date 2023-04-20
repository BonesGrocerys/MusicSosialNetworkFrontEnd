import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../../navigation/types";
import { useMusic } from "../../../providers/MusicProvider";
import { IPlaylist } from "../../../Interfaces/Playlist";
import { RouteProp } from "@react-navigation/native";
interface IAddTrackInPlaylist {
  navigation: AddTrackInPlaylistNavigationProp;
  route: AddTrackInPlaylistRouteProp;
}
type AddTrackInPlaylistNavigationProp =
  StackNavigationProp<TypeRootStackParamList>;

type AddTrackInPlaylistRouteProp = RouteProp<TypeRootStackParamList>;
const AddTrackInPlaylist: FC<IAddTrackInPlaylist> = ({ navigation, route }) => {
  const handleBackButtonPress = async (item: IPlaylist) => {
    await AddTrackToPlaylist(route?.params?.modalizeItem.id, item.id);
    await navigation.goBack();
  };

  const { GetPlaylistByPersonId, playlistsByPersonId, AddTrackToPlaylist } =
    useMusic();

  useEffect(() => {
    GetPlaylistByPersonId();
  }, []);
  return (
    <View>
      {playlistsByPersonId?.map((playlist: IPlaylist) => (
        <Text onPress={() => handleBackButtonPress(playlist)}>
          {playlist.name}
        </Text>
      ))}
    </View>
  );
};

export default AddTrackInPlaylist;
