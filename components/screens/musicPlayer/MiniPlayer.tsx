import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMusic } from "../../../providers/MusicProvider";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Modalize } from "react-native-modalize";
import { MusicContext } from "../../../providers/MusicProvider";

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

    setSound,
  } = useMusic();

  // const [playingStatus, setPlayingStatus] = useState("nosound");
  // const [sound, setSound] = useState<Audio.Sound | null>(null);
  // const [duration, setDuration] = useState<any>();

  // const calculateSeekBar = (
  //   playbackPosition: number,
  //   playbackDuration: number
  // ) => {
  //   if (playbackPosition !== null && playbackDuration !== null) {
  //     return playbackPosition / playbackDuration;
  //   }
  //   return 0;
  // };

  // function OnPlaybackStatusUpdate(playbackStatus: any) {
  //   if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
  //     const playbackPosition = playbackStatus.positionMillis;
  //     const playbackDuration = playbackStatus.durationMillis;
  //     setDuration(playbackPosition / playbackDuration);
  //     console.log(playbackPosition);
  //     console.log(playbackDuration);
  //   }
  // }

  // async function playSound() {
  //   if (playingStatus == "nosound") {
  //     console.log("Loading Sound");
  //     await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  //     const { sound } = await Audio.Sound.createAsync(
  //       // require("../../../assets/Songs/Lower_world.m4a")
  //       { uri: songs[1].url }
  //     );

  //     setSound(sound);
  //     setPlayingStatus("playing");
  //     console.log("Playing Sound");
  //     await sound.playAsync();
  //     // await sound.setProgressUpdateIntervalAsync(
  //     //   _DEFAULT_PROGRESS_UPDATE_INTERVAL_MILLIS
  //     // );
  //     return sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate);
  //   } else {
  //     if (sound != null) {
  //       if (playingStatus === "playing") {
  //         sound.pauseAsync();
  //         console.log("Pausing");
  //         setPlayingStatus("pausing");
  //       } else {
  //         setPlayingStatus("playing");
  //         sound.playAsync();
  //         // sound.set;
  //       }
  //     }
  //   }
  // }

  // function _syncPauseAndPlayRecording() {
  //   if (sound != null) {
  //     if (playingStatus === "playing") {
  //       sound.pauseAsync();
  //       console.log("Pausing");
  //       setPlayingStatus("pausing");
  //     } else {
  //       setPlayingStatus("playing");
  //       sound.playAsync();
  //     }
  //   }
  // }

  useEffect(() => {
    // console.log("useEffect");

    if (fullDuration - 100 < playbackPositionNow && isLooping === false) {
      setFullDuration(101);
      setPlaybackPositionNow(null);
      NextTrack();
    } else if (fullDuration - 200 < playbackPositionNow && isLooping === true) {
      sound.setPositionAsync(0);
      // PlayPause();
      sound.playAsync();
    }
  });

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
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
            <Text style={{ color: "white" }}>{songs[indexNow].title}</Text>
            <Text style={{ color: "white" }}>{songs[indexNow].artist}</Text>
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
    position: "absolute",
    width: "100%",
    height: 60,
    bottom: 64,
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
