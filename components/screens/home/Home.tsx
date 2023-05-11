import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { MusicContext, useMusic } from "../../../providers/MusicProvider";
import axios from "axios";
import { API_URL } from "../../../providers/api";
import { IOperationResult } from "../../../Interfaces/OperationResult";
import { ITrack } from "../../../Interfaces/Tracks";
import { IAlbum } from "../../../Interfaces/Album";
import { useAuth } from "../../../providers/AuthProvider";
import { AntDesign } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";

const Home: FC = () => {
  const {
    playSound,
    infinityTracks,
    getRandomTrack,

    setInfinityTracksStatus,
  } = useMusic();
  const { user, logout, getToken, token } = useAuth();

  const PlayInfinityTracks = async () => {
    setInfinityTracksStatus(true);
    await getRandomTrack(), await playSound(infinityTracks, 0);
  };

  useEffect(() => {
    getRandomTrack();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/image/retrowave-synthwave.gif")}
        style={{ width: "100%", height: "100%", paddingBottom: 130 }}
        resizeMode="cover"
      >
        <View style={{ paddingTop: 200, alignItems: "center" }}>
          <Text style={{ color: "white" }}>
            <TouchableOpacity onPress={PlayInfinityTracks}>
              <Ionicons name="ios-play" size={60} color="white" />
            </TouchableOpacity>
          </Text>
          {/* <Text style={{ color: "white" }}> Моя волна</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "black",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    opacity: 0.93,
  },
  text: {
    marginVertical: "50%",
  },
});

export default Home;
