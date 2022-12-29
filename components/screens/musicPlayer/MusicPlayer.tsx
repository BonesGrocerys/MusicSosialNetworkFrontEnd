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
import MultiSlider from "react-native-multi-slider";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { useAuth } from "../../../providers/AuthProvider";
import { IOperationResult } from "../../../Interfaces/OperationResult";
import { API_URL } from "../../../providers/api";
import axios from "axios";

const MusicPlayer: FC = () => {
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const { user, logout, getToken, token } = useAuth();
  const {
    duration,
    playingStatus,
    PlayPause,
    NextTrack,
    PreviousTrack,
    songsNow,
    indexNow,
    sound,
    fullDuration,
    convertTime,
    RenderCurrentTime,
    isLooping,
    setIsLooping,
    songs,
  } = useMusic();

  console.log(isLooping);

  const AddTrackToPerson = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios
        .get(
          `${API_URL}/Tracks/add-track-to-peson?personId=${user?.id}&trackId=${songsNow[indexNow].id}`,
          {
            headers: {
              Authorization: `Bearer  ${token}`,
            },
          }
        )
        .then((x) => {
          console.log(x);
          return x;
        });
      console.log("Успешно");
      alert("Трек добавлен");
      console.log(data);
      // console.log(token);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
      // console.log(`Bearer ${token}`);
    } finally {
    }
  };

  // useEffect(() => {
  //   AddTrackToPerson();
  // }, []);
  // const [activeIcon, setActiveIcon] = useState<boolean>(false);

  // useEffect(() => {
  //   if (fullDuration - 100 < playbackPositionNow) {
  //     setFullDuration(101);
  //     setPlaybackPositionNow(null);
  //     NextTrack();
  //   }
  // });
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: 320, height: 320, marginTop: 15 }}
          source={songs[3].atwork}
        />
      </View>

      <View style={styles.time}>
        <Text style={{ color: "white" }}>
          {playingStatus === "pausing"
            ? RenderCurrentTime()
            : RenderCurrentTime()}
        </Text>
        <Text style={{ color: "white" }}>
          {convertTime(fullDuration / 1000)}
        </Text>
      </View>

      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={duration}
        // minimumTrackTintColor="#FFFFFF"
        // maximumTrackTintColor="#000000"
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
      <Text style={{ color: "grey" }}>SHPACKYOU$</Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View>
          {isLooping === false ? (
            <TouchableOpacity
              onPress={() => {
                sound.setStatusAsync({ isLooping: true });
                setIsLooping(!isLooping);
              }}
            >
              <View>
                <MaterialCommunityIcons
                  name="repeat-off"
                  size={40}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                sound.setStatusAsync({ isLooping: false });
                setIsLooping(!isLooping);
              }}
            >
              <View>
                <MaterialCommunityIcons name="repeat" size={40} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TouchableOpacity onPress={AddTrackToPerson}>
            <AntDesign name="plus" size={40} color="white" />
          </TouchableOpacity>
        </View>
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
