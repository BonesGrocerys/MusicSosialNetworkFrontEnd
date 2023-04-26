import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
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
import { IMusicians, ITrack } from "../../../../Interfaces/Tracks";
import { useAuth } from "../../../../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { truncate } from "lodash";
import Loader from "../../../ui/Loader";
const MyTracks: FC = () => {
  const {
    playSound,
    playingStatus,
    key,
    setInfinityTracksStatus,
    infinityTracksStatus,
    songsNow,
    indexNow,
    TrackIsAdded,
    trackIsAdded,
  } = useMusic();
  const navigation = useNavigation();
  const ModalizeTrackRef = useRef<any>(null);
  const { user, getToken, token } = useAuth();
  const [tracks, setTracks] = useState<ITrack[] | null>();
  const [modalizeItem, setModalizeItem] = useState<ITrack>();

  const handlePress = async (itemData: ITrack) => {
    await setModalizeItem(itemData);
    await ModalizeTrackRef.current?.open();
    // console.log(modalizeItem);
  };

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
    } catch (e) {
      setTracks(null);
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const DeleteTrackToPerson = async (trackId: number) => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.delete<IOperationResult<any>>(
        `${API_URL}/Tracks/delete-track-to-person?personId=${user?.id}&trackId=${trackId}`,
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
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const playMyTracks = async (index: number) => {
    await setInfinityTracksStatus(false);
    console.log("infinityTracksStatus", infinityTracksStatus);
    // await TrackIsAdded(tracks, index);
    await playSound(tracks, index);
  };

  const deleteHandler = async (trackId: number) => {
    await DeleteTrackToPerson(trackId);
    await ModalizeTrackRef.current?.close();
    getAllTracks();
  };

  useEffect(() => {
    getAllTracks();
  }, []);

  return (
    <View style={styles.container}>
      {tracks === null ? (
        <View style={{ alignItems: "center", marginTop: "50%" }}>
          <Text style={{ color: "white" }}>Треков пока нет</Text>
        </View>
      ) : (
        <View>
          {tracks ? (
            <View>
              <View>
                <ScrollView style={styles.Scroll}>
                  {tracks?.map((item, index) => (
                    <View style={styles.trackView}>
                      <View>
                        <TouchableOpacity
                          key={index}
                          onPress={() => playMyTracks(index)}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ marginLeft: 20 }}>
                              {item?.cover ? (
                                <ImageBackground
                                  source={{
                                    uri: `data:image/jpeg;base64,${item?.cover}`,
                                  }}
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
                              ) : (
                                <ImageBackground
                                  source={require("../../../../assets/image/Anemone.jpg")}
                                  style={{ width: 50, height: 50 }}
                                  imageStyle={{ borderRadius: 6 }}
                                >
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
                              )}
                            </View>
                            <View
                              style={{
                                marginTop: 4,
                                marginLeft: 40,
                              }}
                            >
                              <Text style={{ color: "white" }}>
                                {item.title.length > 10
                                  ? `${item.title.substring(0, 19)}...`
                                  : item.title}
                              </Text>
                              <View
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "nowrap",
                                }}
                              >
                                <Text style={{ color: "grey" }}>
                                  {truncate(
                                    item?.musicians
                                      ?.map(
                                        (musician: IMusicians) =>
                                          musician.nickname
                                      )
                                      .join(" "),
                                    { length: 20, separator: " " }
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: 14, marginRight: 10 }}>
                        <TouchableOpacity onPress={() => handlePress(item)}>
                          <Entypo
                            name="dots-three-horizontal"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : (
            <Loader />
          )}
        </View>
      )}

      <Modalize
        snapPoint={400}
        ref={ModalizeTrackRef}
        scrollViewProps={{ scrollEnabled: false }}
        panGestureEnabled={false}
      >
        <View style={styles.ModalContainer}>
          <View style={styles.ModalContent}>
            <View
              style={{
                borderBottomWidth: 0.3,
                borderBottomColor: "#1b1b1b",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${modalizeItem?.cover}`,
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 5,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 10,
                }}
              />
              <Text style={{ color: "white", marginLeft: 20 }}>
                {modalizeItem?.title}
              </Text>
            </View>
            <View style={styles.ModalBlock}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => deleteHandler(modalizeItem!.id)}
              >
                <Ionicons name="trash-outline" size={30} color="red" />

                <Text
                  style={{
                    color: "white",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  Удалить аудиозапись
                </Text>
              </TouchableOpacity>
            </View>

            {modalizeItem?.musicians?.map((musician: IMusicians) => (
              <TouchableOpacity
                style={styles.ModalBlock}
                onPress={() =>
                  navigation.navigate("MusicianPage", { ...musician })
                }
              >
                <Text style={{ color: "white" }}>
                  {musician.nickname}&nbsp;
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modalize>
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
  },
  trackContainer: {
    height: 50,
    width: Dimensions.get("window").width,
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
  ModalContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#0f0f0f",
    flex: 1,

    alignItems: "center",
  },
  ModalContent: {
    marginTop: 10,
    height: Dimensions.get("window").height,
    width: "90%",
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
  },
  ModalBlock: {
    height: "6%",
    width: "100%",
    borderBottomWidth: 0.3,
    borderBottomColor: "#1b1b1b",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  Scroll: {
    height: Dimensions.get("window").height,
  },
});

export default MyTracks;
