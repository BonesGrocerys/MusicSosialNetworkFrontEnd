import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useRef, useEffect } from "react";
import { useMusic } from "../../../../providers/MusicProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import axios from "axios";
import { API_URL } from "../../../../providers/api";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import { ITrack } from "../../../../Interfaces/Tracks";
import { useAuth } from "../../../../providers/AuthProvider";

const MyTracks: FC = () => {
  const {
    playSound,
    songsNow,
    indexNow,
    playingStatus,
    key,
    currentPlaylist,
    setInfinityTracksStatus,
    infinityTracksStatus,
  } = useMusic();
  const ModalizeTrackRef = useRef(null);
  const { user, getToken, token } = useAuth();
  const [tracks, setTracks] = useState<ITrack[]>();

  const getAllTracks = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Tracks/get-all-added-tracks-person/${user?.id}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setTracks(data.result);
        return true;
      }
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const DeleteTrackToPerson = async (trackId: number) => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.delete<IOperationResult<any>>(
        `${API_URL}/Tracks/delete?personId=${user?.id}&trackId=${trackId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (data.success) {
        alert("ok");
        return true;
      }
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const playMyTracks = async (index: number) => {
    await setInfinityTracksStatus(false);
    console.log("infinityTracksStatus", infinityTracksStatus);

    await playSound(tracks, index);
  };

  const deleteHandler = async (trackId: number) => {
    await DeleteTrackToPerson(trackId);
    getAllTracks();
  };

  useEffect(() => {
    getAllTracks();
  }, []);

  return (
    <View style={styles.container}>
      {tracks ? (
        <View>
          {tracks?.map((item, index) => (
            <View style={styles.trackView}>
              <View>
                <TouchableOpacity
                  key={index}
                  onPress={() => playMyTracks(index)}
                >
                  {/* style={styles.trackContainer} */}
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 20 }}>
                      <ImageBackground
                        source={require("../../../../assets/image/eternal_doom_final.jpg")}
                        style={{ width: 50, height: 50 }}
                        imageStyle={{ borderRadius: 6 }}
                      >
                        {/* indexNow === index */}
                        {key === tracks[index].url &&
                        playingStatus === "playing" ? (
                          <Image
                            source={require("../../../../assets/Equalizer/gif-animation.gif")}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                              marginLeft: 10,
                              marginTop: 10,
                            }}
                          />
                        ) : (
                          <Text></Text>
                        )}
                      </ImageBackground>
                    </View>
                    <View
                      style={{
                        // alignItems: "center",
                        marginTop: 4,
                        marginLeft: 60,
                      }}
                    >
                      <Text style={{ color: "white" }}>{item.title}</Text>
                      {item?.musicians?.map((musicians: any) => (
                        <Text style={{ color: "grey", flexDirection: "row" }}>
                          {musicians.nickname}{" "}
                        </Text>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 14, marginRight: 10 }}>
                <TouchableOpacity
                  onPress={() => ModalizeTrackRef.current?.open()}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="white"
                  />
                  {/* <Text style={{ color: "white" }}>{item.id} </Text> */}
                </TouchableOpacity>
              </View>
              <Modalize snapPoint={20} ref={ModalizeTrackRef}>
                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={() => deleteHandler(item.id)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View style={{ width: "15%", marginLeft: 10 }}>
                      <Ionicons name="trash-outline" size={40} color="red" />
                      <Text style={{ color: "white" }}>{item.id} </Text>
                    </View>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Удалить аудиозапись
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modalize>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            У вас пока нет треков
          </Text>
          <TouchableOpacity onPress={getAllTracks}>
            <Ionicons name="reload" size={40} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
    opacity: 0.93,
    flex: 1,
    // flexDirection: "row",
  },
  trackContainer: {
    height: 50,
    width: Dimensions.get("window").width,
    // justifyContent: "space-between",
    // display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  trackView: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default MyTracks;
