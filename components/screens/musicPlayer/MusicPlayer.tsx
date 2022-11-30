import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { FC, useEffect, useState } from "react";
import PlayerMenuBottom from "./PlayerMenuBottom";
import { Dispatch, SetStateAction } from "react";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { useMusic } from "../../../providers/MusicProvider";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
const MusicPlayer: FC = () => {
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const {
    duration,
    playingStatus,
    PlayPause,
    NextTrack,
    trackPlayNow,
    PreviousTrack,
    songsNow,
    indexNow,
    itemNow,
    sound,
    fullDuration,
    convertTime,
    RenderCurrentTime,
    setPlayingStatus,
    playbackPositionNow,
    trackIndexNow,
    setTrackIndexNow,
    OnPlaybackStatusUpdate,
    setPlaybackPositionNow,
    setFullDuration,
    isLooping,
    setIsLooping,
  } = useMusic();

  // console.log(trackPlayNow);
  // console.log(indexNow + 1);
  // console.log(songsNow);

  // console.log(indexNow);

  // async function ResumeAudio() {
  //   setPlayingStatus("playing");
  //   await sound?.PlayAsync();
  // }
  // console.log(indexNow, "в MusicPlayer");
  // console.log(trackIndexNow);
  console.log(isLooping);

  // useEffect(() => {
  //   if (fullDuration - 100 < playbackPositionNow) {
  //     setFullDuration(101);
  //     setPlaybackPositionNow(null);
  //     NextTrack();
  //   }
  // });
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 320, height: 320 }}
        source={songsNow[indexNow].atwork}
      />
      <View style={styles.time}>
        <Text style={{ color: "white" }}>
          {playingStatus === "pausing" ? currentPosition : RenderCurrentTime()}
        </Text>
        <Text style={{ color: "white" }}>
          {convertTime(fullDuration / 1000)}
        </Text>
      </View>

      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        // value={calculateSeekBar()}
        value={duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={(duration) =>
          setCurrentPosition(convertTime((duration * fullDuration) / 1000))
        }
        onSlidingStart={PlayPause}
        onSlidingComplete={async (duration) => {
          await sound.setPositionAsync(Math.floor(fullDuration * duration));
          await PlayPause();
        }}
      />
      <Text style={{ color: "white" }}>{songsNow[indexNow].title}</Text>
      <Text style={{ color: "white" }}>{songsNow[indexNow].artist}</Text>
      <View style={styles.playPause}>
        <TouchableOpacity onPressIn={() => PreviousTrack()}>
          <AntDesign name="caretleft" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={PlayPause}>
          {playingStatus === "playing" ? (
            <Ionicons name="ios-pause" size={40} color="white" />
          ) : (
            <Ionicons name="ios-play" size={40} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={async () => {
            await NextTrack();
          }}
        >
          <AntDesign name="caretright" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsLooping(!isLooping)}>
          <View>
            <Ionicons name="repeat" size={40} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
  },
  playPause: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  time: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "85%",
    height: "4%",
    marginTop: "2%",
  },
  blue: {
    color: "blue",
  },
  white: {
    color: "white",
  },
  // text: {
  //   marginVertical: "50%",
  // },
});

export default MusicPlayer;
