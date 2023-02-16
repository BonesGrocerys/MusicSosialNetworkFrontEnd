import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { TouchableOpacity,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMusic } from "../../../providers/MusicProvider";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Modalize } from "react-native-modalize";
import { MusicContext } from "../../../providers/MusicProvider";
import { useAuth } from "../../../providers/AuthProvider";

// interface IMiniPlayerProps {
//   onIsOpen: any;
//   songs: any;
//   duration: any;
//   playbackStatus: any;
// }
// const MiniPlayer: FC<IMiniPlayerProps> = ({ onIsOpen }) => {
const MiniPlayer: FC = () => {
  const {
    songs,
    setActiveMiniPlayer,
    sound,
    playSound,
    playingStatus,
    stopPlaying,
    PlayPause,
    ModalizeRef,
    fullDuration,
    playbackPositionNow,
    setFullDuration,
    setPlaybackPositionNow,
    NextTrack,
    trackIndexNow,
    isLooping,
    indexNow,
    tracks,
    setSound,
    setDuration,
    songsNow,
    getRandomTrack,
    infinityTracks,
    setKey,
  } = useMusic();

  useEffect(() => {
    // console.log("useEffect");
    if (fullDuration - 100 < playbackPositionNow && isLooping === false) {
     

      setFullDuration(101);
      // setDuration(0);
      setPlaybackPositionNow(0);
      // setSound(null);
      // NextTrack();
       getRandomTrack(),
    setKey(-1);
    playSound(infinityTracks, 0)
    PlayPause()
    }
  });

  useEffect(() => {
    return sound
      ? () => {
          if (isLooping === true) {
            console.log("Лупинг тру");
          } else {
            console.log("Unloading Sound");
            sound.unloadAsync();
          }
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={PlayPause}>
          <View style={{ marginLeft: 10 }}>
            {playingStatus === "playing" ? (
              <Ionicons name="ios-pause" size={30} color="white" />
            ) : (
              <Ionicons name="ios-play" size={30} color="white" />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ModalizeRef.current?.open()}>
          <View>
            <Text style={{ color: "white" }}>{songsNow[indexNow].title}</Text>
            <Text style={{ color: "grey" }}>SHPACKYOU$</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={{ marginRight: 20 }}>
            <Ionicons
              onPress={stopPlaying}
              name="close-outline"
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    position: "absolute",
    bottom: 64,
    // width: "100%",
    height: 64,
    zIndex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    borderTopColor: "#1b1b1b",
    borderTopWidth: 2,
    // borderBottomWidth: 2,
    color: "white",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    marginVertical: "50%",
  },
});

export default MiniPlayer;
