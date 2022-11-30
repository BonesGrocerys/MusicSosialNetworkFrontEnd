import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState } from "react";
import { MusicContext, useMusic } from "../../../providers/MusicProvider";

const Home: FC = () => {
  const {
    activeMiniPlayer,
    setActiveMiniPlayer,
    playSound,
    songs,
    NextTrack,
    album,
  } = useMusic();
  return (
    <View style={styles.container}>
      {album.map((item, index) => (
        <View>
          <TouchableOpacity key={index} onPress={() => playSound(index)}>
            <Text style={{ color: "white" }}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "black",

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: "50%",
  },
});

export default Home;
