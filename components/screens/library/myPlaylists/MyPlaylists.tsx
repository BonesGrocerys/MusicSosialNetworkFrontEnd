import { View, Text } from "react-native";
import React, { FC } from "react";
import PlaylistsCreatedByMe from "./PlaylistsCreatedByMe";

const MyPlaylists: FC = () => {
  return (
    <View>
      <Text style={{ color: "black" }}>MyPlaylists</Text>
      <PlaylistsCreatedByMe />
    </View>
  );
};

export default MyPlaylists;
