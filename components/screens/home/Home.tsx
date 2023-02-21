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
    key,
    infinityTracks,
    getRandomTrack,

    setInfinityTracksStatus,
  } = useMusic();
  const { user, logout, getToken, token } = useAuth();

  const [tracks, setTracks] = useState<ITrack[]>();

  const PlayInfinityTracks = async () => {
    setInfinityTracksStatus(true);
    await getRandomTrack(), await playSound(infinityTracks, 0);
    console.log("INFINITY TRACKS", infinityTracks);
  };

  // const getAllTracksHome = async () => {
  //   try {
  //     console.log("НАЧАЛО МЕТОДА");

  //     const { data } = await axios
  //       .get<IOperationResult<ITrack[]>>(`${API_URL}/Tracks/get-tracks`, {
  //         headers: {
  //           Authorization: `Bearer  ${token}`,
  //         },
  //       })
  //       .then((x) => {
  //         console.log(x);
  //         return x;
  //       });
  //     setTracks(data.result);
  //     console.log(data);
  //     // console.log(token);
  //   } catch (e) {
  //     console.log("ОШИБКА");
  //     console.log(e);
  //     // console.log(`Bearer ${token}`);
  //   } finally {
  //   }
  // };

  useEffect(() => {
    getRandomTrack();
    // console.log(infinityTracks);
  }, []);

  return (
    <View style={styles.container}>
      {/* {tracks?.map((item: any, index: any) => (
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("window").width,
          }}
        >
          <TouchableOpacity
            key={index}
            onPress={() => playSound(tracks, index)}
            style={
              key === tracks[index].url
                ? { opacity: 0.5, flexDirection: "row", marginTop: 10 }
                : { flexDirection: "row", marginTop: 10 }
            }
          >
            <ImageBackground
              source={require("../../../assets/image/eternal_doom_final.jpg")}
              style={{ width: 50, height: 50 }}
              imageStyle={{ borderRadius: 6 }}
            ></ImageBackground>
            <View style={{ height: 50, alignItems: "center", width: "80%" }}>
              <Text style={{ color: "white" }}>{item.title}</Text>
              {item?.musicians?.map((musicians: any) => (
                <Text style={{ color: "grey", flexDirection: "row" }}>{musicians.nickname} </Text>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      ))} */}
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
