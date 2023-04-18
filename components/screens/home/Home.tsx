import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
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
import { ImageBackground } from "react-native";
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
      <View style={{ paddingTop: 200, alignItems: "center" }}>
        <Text style={{ color: "white" }}>
          <TouchableOpacity onPress={PlayInfinityTracks}>
            <Ionicons name="ios-play" size={40} color="white" />
          </TouchableOpacity>
        </Text>
        <Text style={{ color: "white" }}> Моя волна</Text>
      </View>
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
