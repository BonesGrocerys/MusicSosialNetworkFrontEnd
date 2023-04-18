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
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import axios from "axios";
import { API_URL } from "../../../providers/api";
import { IMusicians } from "../../../Interfaces/Tracks";
import { ITrack } from "../../../Interfaces/Tracks";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import MusicianPage from "../musicians/MusicianPage";
import { truncate } from "lodash";
import { IOperationResult } from "../../../Interfaces/OperationResult";
import { useMusic } from "../../../providers/MusicProvider";
import { TypeRootStackParamList } from "../../../navigation/types";
import { RouteProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

interface ISearchTracks {
  route: RouteProp<TypeRootStackParamList, "SearchTracks">;
}

const SearchTracks: FC<ISearchTracks> = ({ route }) => {
  const navigation = useNavigation();
  const ModalizeTrackRef = useRef<any>(null);
  const [tracks, setTracks] = useState<ITrack[]>();
  const [modalizeItem, setModalizeItem] = useState<ITrack>();
  const {
    playSound,
    playingStatus,
    key,
    setInfinityTracksStatus,
    infinityTracksStatus,
    AddTrackToPersonPages,
    trackIsAdded,
    DeleteTrackFromPerson,
    TrackIsAddedPages,
  } = useMusic();

  const handlePress = async (itemData: ITrack) => {
    await setModalizeItem(itemData);
    await TrackIsAddedPages(itemData);
    await ModalizeTrackRef.current?.open();
  };

  const playMyTracks = async (index: number) => {
    await setInfinityTracksStatus(false);
    console.log("infinityTracksStatus", infinityTracksStatus);
    await playSound(tracks, index);
  };

  const GetAllTracks = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Tracks/get-all-tracks?searchText=${route?.params?.searchText}`
      );
      if (data.success) {
        setTracks(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    GetAllTracks();
  }, []);
  return (
    <View style={styles.container}>
      <View></View>
      <View>
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
                                  source={require("../../../assets/Equalizer/gif-animation.gif")}
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
                              source={require("../../../assets/image/Anemone.jpg")}
                              style={{ width: 50, height: 50 }}
                              imageStyle={{ borderRadius: 6 }}
                            >
                              {key === tracks[index].url &&
                              playingStatus === "playing" ? (
                                <Image
                                  source={require("../../../assets/Equalizer/gif-animation.gif")}
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
                            style={{ flexDirection: "row", flexWrap: "nowrap" }}
                          >
                            <Text style={{ color: "grey" }}>
                              {truncate(
                                item?.musicians
                                  ?.map(
                                    (musician: IMusicians) => musician.nickname
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
      </View>

      <Modalize
        snapPoint={350}
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
            {trackIsAdded === true ? (
              <View style={styles.ModalBlock}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPress={() => DeleteTrackFromPerson(modalizeItem)}
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
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => AddTrackToPersonPages(modalizeItem)}
              >
                <AntDesign name="plus" size={30} color="#00b3ff" />

                <Text
                  style={{
                    color: "white",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  Добавить аудиозапись
                </Text>
              </TouchableOpacity>
            )}
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

export default SearchTracks;
