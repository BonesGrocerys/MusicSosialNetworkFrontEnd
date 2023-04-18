import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { FC, useEffect, useState, useRef, Component } from "react";
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { useMusic } from "../../../providers/MusicProvider";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../../providers/AuthProvider";
import { IOperationResult } from "../../../Interfaces/OperationResult";
import { API_URL } from "../../../providers/api";
import { Modalize } from "react-native-modalize";
import axios from "axios";
import { IMusicians, ITrack } from "../../../Interfaces/Tracks";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../../navigation/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// interface MusicPlayerProps {
//   navigation: MusicPlayerScreenNavigationProp;
//   route: MusicPlayerScreenRouteProp;
// }

// type MusicPlayerScreenNavigationProp = StackNavigationProp<
//   TypeRootStackParamList,
//   "MusicPlayer"
// >;

// type MusicPlayerScreenRouteProp = RouteProp<
//   TypeRootStackParamList,
//   "MusicPlayer"
// >;

const MusicPlayer: FC = ({}) => {
  const ModalizeTrackRef = useRef<any>(null);
  // const navigation = useNavigation();
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
    currentPlaylist,
    infinityTracksStatus,
    trackIsAdded,
    TrackIsAdded,
    setTrackIsAdded,
  } = useMusic();

  console.log(isLooping);

  const AddTrackToPerson = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios
        .get(
          `${API_URL}/Tracks/add-track-to-peson?personId=${user?.id}&trackId=${songsNow?.[indexNow].id}`,
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
      setTrackIsAdded(true);
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

  //   console.log("TRACK IS ADDED", trackIsAdded);
  // }, []);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{ width: 320, height: 320, marginTop: 15, borderRadius: 15 }}
          source={{
            uri: `data:image/png;base64,${songsNow?.[indexNow]?.cover}`,
          }}
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
        style={{ width: "85%", height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={duration}
        onValueChange={(duration) =>
          setCurrentPosition(convertTime((duration * fullDuration) / 1000))
        }
        onSlidingStart={PlayPause}
        onSlidingComplete={async (duration) => {
          await sound.setPositionAsync(Math.floor(fullDuration * duration));
          await PlayPause();
        }}
      />
      <Text style={{ color: "white" }}>{songsNow?.[indexNow].title}</Text>
      <View>
        <TouchableOpacity
          onPress={() => ModalizeTrackRef.current?.open()}
          style={{ flexDirection: "row", flexWrap: "nowrap" }}
        >
          {songsNow?.[indexNow]?.musicians?.map((musicians: any) => (
            <View key={musicians.id}>
              <Text style={{ color: "grey" }}>{musicians.nickname} &nbsp;</Text>
            </View>
          ))}
        </TouchableOpacity>
      </View>

      <View style={styles.playPause}>
        {infinityTracksStatus === true ? (
          <AntDesign name="caretleft" size={40} color="grey" />
        ) : (
          <TouchableOpacity onPressIn={() => PreviousTrack()}>
            <AntDesign name="caretleft" size={40} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={PlayPause}
          style={{ marginLeft: 10, marginRight: 10 }}
        >
          {playingStatus === "playing" ? (
            <Ionicons name="ios-pause" size={50} color="white" />
          ) : (
            <Ionicons name="ios-play" size={50} color="white" />
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
        {trackIsAdded === true ? (
          <AntDesign name="heart" size={40} color="white" />
        ) : (
          <View>
            <TouchableOpacity onPress={AddTrackToPerson}>
              <AntDesign name="plus" size={40} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* {songsNow?.[indexNow]?.musicians?.map((musician: IMusicians) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("MusicianPage", { ...musician })}
        >
          <Text style={{ color: "white" }}>{musician.nickname}</Text>
        </TouchableOpacity>
      ))} */}

      <Modalize
        snapPoint={250}
        ref={ModalizeTrackRef}
        scrollViewProps={{ scrollEnabled: false }}
      >
        <View>
          {/* {songsNow?.map((songs: ITrack) => (
            <Text> {songs.title} </Text>
          ))} */}
          {/* {songsNow?.[indexNow].musicians?.map((musician: IMusicians) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push("MusicianPage", {
                  params: { musicianId: musician.id },
                } as any)
              }
            >
              <Text>{musician.nickname}</Text>
            </TouchableOpacity>
          ))} */}
        </View>
      </Modalize>
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
  },
  playPause: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
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
});

export default MusicPlayer;
