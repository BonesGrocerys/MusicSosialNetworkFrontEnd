import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { FC, useState, useEffect, useRef } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../../navigation/types";
import { useMusic } from "../../../providers/MusicProvider";
import { IMusicians, ITrack } from "../../../Interfaces/Tracks";
import { IOperationResult } from "../../../Interfaces/OperationResult";
import axios from "axios";
import { API_URL } from "../../../providers/api";
import { Entypo } from "@expo/vector-icons";
import { truncate } from "lodash";
import { Modalize } from "react-native-modalize";
import { Ionicons } from "@expo/vector-icons";
import { IAlbum } from "../../../Interfaces/Album";
import Loader from "../../ui/Loader";
import ModalizeTrack from "../Track/ModalizeTrack";
import { useAuth } from "../../../providers/AuthProvider";
interface IMusicianPage {
  // route: RouteProp<TypeRootStackParamList, "MusicianPage">;
  // navigation: NavigationProp<TypeRootStackParamList, "MusicianPage">;
  // route: RouteProp<TypeRootStackParamList, "MusicianPage">;
  navigation: MusicianPageScreenNavigationProp;
  route: MusicianPageScreenRouteProp;
}

type MusicianPageScreenNavigationProp =
  StackNavigationProp<TypeRootStackParamList>;
("MusicianPage");

type MusicianPageScreenRouteProp = RouteProp<TypeRootStackParamList>;
("MusicianPage");

const MusicianPage: FC<IMusicianPage> = ({ navigation, route }) => {
  const {
    songsNow,
    indexNow,
    setInfinityTracksStatus,
    playSound,
    infinityTracksStatus,
    playingStatus,
    key,
    trackIsAdded,
    TrackIsAdded,
  } = useMusic();
  const [musicianId, setMusicianId] = useState<number>();
  const [musician, setMusician] = useState<IMusicians>();
  const [tracks, setTracks] = useState<ITrack[]>();
  const [albums, setAlbums] = useState<IAlbum[]>();
  const [modalizeItem, setModalizeItem] = useState<ITrack>();
  const [subscribed, setSubscribed] = useState<boolean>();
  const ModalizeTrackRef = useRef<any>(null);
  const { user } = useAuth();

  const Subscribe = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.post<IOperationResult<boolean>>(
        `${API_URL}/Musician/subscribe-to-musician?musicianId=${route?.params?.id}&personId=${user?.id}`
      );
      if (data.success) {
        console.log(data.result);
        setSubscribed(true);

        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const Unsubscribe = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.delete<IOperationResult<boolean>>(
        `${API_URL}/Musician/unsubscribe?personId=${user?.id}&musicianId=${route?.params?.id}`
      );
      if (data.success) {
        console.log(data.result);
        setSubscribed(false);

        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const PersonIsSubscribedToMusician = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<boolean>>(
        `${API_URL}/Musician/person-is-subscribed-to-musician?personId=${user?.id}&musicianId=${route?.params?.id}`
      );
      if (data.success) {
        setSubscribed(data.result);
        console.log(subscribed);

        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const GetMusician = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<IMusicians>>(
        `${API_URL}/Musician/get-musician-by-id?musicianId=${route?.params?.id}`
      );
      if (data.success) {
        setMusician(data.result);
        return true;
      }
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const GetAlbumsToMusicianId = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<IAlbum[]>>(
        `${API_URL}/Album/get-albums-to-musician/${route?.params?.id}`
      );
      if (data.success) {
        setAlbums(data.result);
        return true;
      }
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const GetTracksByMusicianId = async () => {
    try {
      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Tracks/get-all-tracks-to-musician/${route?.params?.id}`
      );
      if (data.success) {
        setTracks(data.result);
        setMusicianId(route?.params?.id);
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

  const handlePress = async (itemData: ITrack) => {
    await setModalizeItem(itemData);
    await ModalizeTrackRef.current?.open();
    // console.log(modalizeItem);
  };

  useEffect(() => {
    GetMusician();
    GetTracksByMusicianId();
    GetAlbumsToMusicianId();
    PersonIsSubscribedToMusician();
  }, []);

  console.log(route?.params?.nickname);

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <ImageBackground
            source={{
              uri: `data:image/jpeg;base64,${musician?.musicianCover}`,
            }}
            style={{
              width: "100%",
              height: 200,
              justifyContent: "flex-end",
            }}
            imageStyle={{}}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "flex-start",
                    fontSize: 26,
                    marginLeft: 10,
                  }}
                >
                  {musician?.nickname}
                </Text>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "flex-start",
                    fontSize: 12,
                    marginLeft: 10,
                  }}
                >
                  Слушатели за месяц: {musician?.monthlyListeners}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                {subscribed === true ? (
                  <TouchableOpacity
                    style={styles.unsubscribeButton}
                    onPress={() => Unsubscribe()}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 5,
                        color: "white",
                      }}
                    >
                      Отписаться
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={() => Subscribe()}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 5,
                        color: "white",
                      }}
                    >
                      Подписаться
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>

          <View>
            {tracks ? (
              <View>
                <Text style={{ color: "white", marginTop: 10 }}>Треки:</Text>

                <View>
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
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "nowrap",
                                }}
                              >
                                <Text style={{ color: "grey" }}>
                                  {item.auditionsCount}
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
                </View>
                <View
                  style={{ width: "100%", alignItems: "center", marginTop: 10 }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MusicianTracksPage", { tracks })
                    }
                  >
                    <Text style={{ color: "white" }}>Показать все треки</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Загрузка треков...
                </Text>
                <Loader />
              </View>
            )}

            {albums ? (
              <View>
                <Text style={{ color: "white" }}>Альбомы:</Text>

                <View style={styles.AlbumsContainer}>
                  {albums?.slice(0, 2).map((album: IAlbum, index) => (
                    <TouchableOpacity
                      style={{ marginTop: 5 }}
                      onPress={() =>
                        navigation.navigate("AlbumPage", { ...album })
                      }
                    >
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${album?.cover}`,
                        }}
                        style={{ width: 150, height: 150 }}
                      />
                      <Text style={{ color: "white" }}>
                        {album?.albumTitle}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View
                  style={{ width: "100%", alignItems: "center", marginTop: 10 }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MusicianAlbumPage", { albums })
                    }
                  >
                    <Text style={{ color: "white" }}>Показать все альбомы</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Загрузка альбомов...
                </Text>
                <Loader />
              </View>
            )}
          </View>

          <View style={{ height: 100 }}></View>
        </ScrollView>
        {modalizeItem ? (
          <ModalizeTrack
            modalizeItem={modalizeItem}
            ModalizeTrackRef={ModalizeTrackRef}
            trackIsAdded={trackIsAdded}
            navigation={navigation}
          ></ModalizeTrack>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#0f0f0f",
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
  AlbumsContainer: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    // justifyContent: "center",
    // flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-around",

    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  subscribeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
    width: 120,
    height: 30,
  },
  unsubscribeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    width: 120,
    height: 30,
  },
});
export default MusicianPage;
