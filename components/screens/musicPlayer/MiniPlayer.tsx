import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMusic } from "../../../providers/MusicProvider";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Modalize } from "react-native-modalize";
import { MusicContext } from "../../../providers/MusicProvider";
import { useAuth } from "../../../providers/AuthProvider";
import { AntDesign } from "@expo/vector-icons";
import { IMusicians } from "../../../Interfaces/Tracks";

const MiniPlayer: FC = () => {
  const {
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
    isLooping,
    indexNow,
    songsNow,
    getRandomTrack,
    infinityTracks,
    infinityTracksStatus,
    setKey,
    duration,
  } = useMusic();

  useEffect(() => {
    // console.log("useEffect");
    if (fullDuration - 100 < playbackPositionNow && isLooping === false) {
      if (infinityTracksStatus === false) {
        setFullDuration(101);
        // setDuration(0);
        setPlaybackPositionNow(0);
        // setSound(null);
        NextTrack();
      } else {
        setFullDuration(101);
        // setDuration(0);
        setPlaybackPositionNow(0);
        // setSound(null);
        // NextTrack();

        getRandomTrack(), setKey(-1);
        playSound(infinityTracks, 0);
        PlayPause();
      }
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
        <View>
          <Slider
            style={{ width: "100%", height: 0 }}
            minimumValue={0}
            maximumValue={1}
            disabled={true}
            thumbTintColor={"transparent"}
            minimumTrackTintColor={"yellow"}
            // thumbStyle={{ width: 0, height: 0 }}
            value={duration}
          />
        </View>
        <View style={styles.content}>
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
              <Text style={{ color: "white" }}>
                {songsNow?.[indexNow]?.title}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
              {songsNow?.[indexNow]?.musicians && (
                <Text style={{ color: "grey" }}>
                  <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
                    {songsNow?.[indexNow]?.musicians && (
                      <Text style={{ color: "grey" }}>
                        {songsNow[indexNow].musicians
                          .reduce((text: string, musician: any) => {
                            let nickname = musician.nickname;

                            return `${text}${nickname}, `;
                          }, "")
                          .slice(0, -2)}
                      </Text>
                    )}
                  </View>
                </Text>
              )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    position: "absolute",
    bottom: 64,
    height: 50,
    zIndex: 1,
    backgroundColor: "#101010",
  },
  text: {
    marginVertical: "50%",
  },
  content: {
    color: "white",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MiniPlayer;
