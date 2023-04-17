import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import React, { FC, useEffect, useState, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Entypo } from "@expo/vector-icons";
import { useMusic } from "../../providers/MusicProvider";
import { IMusicians, ITrack } from "../../Interfaces/Tracks";
import Field from "../ui/Field";
import axios, { all } from "axios";
import { IOperationResult } from "../../Interfaces/OperationResult";
import { API_URL } from "../../providers/api";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../ui/Loader";
import { IAlbum } from "../../Interfaces/Album";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../navigation/types";
import { truncate } from "lodash";
interface ISearch {
  // route: RouteProp<TypeRootStackParamList, "MusicianPage">;
  // navigation: NavigationProp<TypeRootStackParamList, "MusicianPage">;
  // route: RouteProp<TypeRootStackParamList, "MusicianPage">;
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
}

type SearchScreenNavigationProp = StackNavigationProp<
  TypeRootStackParamList,
  "MusicianPage"
>;

type SearchScreenRouteProp = RouteProp<TypeRootStackParamList, "MusicianPage">;

const Search: FC<ISearch> = ({ navigation }) => {
  // const navigation = useNavigation();
  const [allTracks, setAllTracks] = useState<ITrack[]>();
  const [allAlbums, setAllAlbums] = useState<IAlbum[]>();
  const [searchText, setSearchText] = useState("");
  const [modalizeItem, setModalizeItem] = useState<ITrack>();
  const [allMusician, setAllMusician] = useState<IMusicians[]>();
  const ModalizeTrackRef = useRef<any>(null);
  const {
    songsNow,
    indexNow,
    setInfinityTracksStatus,
    playSound,
    infinityTracksStatus,
    playingStatus,
    key,
  } = useMusic();

  const playMyTracks = async (index: number) => {
    await setInfinityTracksStatus(false);
    console.log("infinityTracksStatus", infinityTracksStatus);

    await playSound(allTracks, index);
  };

  const handlePress = async (itemData: ITrack) => {
    await setModalizeItem(itemData);
    await ModalizeTrackRef.current?.open();
  };
  const GetAllMusician = async (searchText?: string) => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<IMusicians[]>>(
        `${API_URL}/Musician/get-all-musician?SearchText=${
          searchText ? searchText : ""
        }`
      );
      if (data.success) {
        setAllMusician(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const GetAllTracks = async (searchText?: string) => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Tracks/get-all-tracks?searchText=${
          searchText ? searchText : ""
        }`
      );
      if (data.success) {
        setAllTracks(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const GetAllAbums = async (searchText?: string) => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<IAlbum[]>>(
        `${API_URL}/Album/get-all-albums?SearchText=${
          searchText ? searchText : ""
        }`
      );
      if (data.success) {
        setAllAlbums(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const fetchData = () => {
    GetAllTracks(searchText);
    GetAllAbums(searchText);
    GetAllMusician(searchText);
  };

  const closeInput = () => {
    setSearchText("");
    setAllTracks(undefined);
    setAllAlbums(undefined);
    setAllMusician(undefined);
    Keyboard.dismiss();
  };

  useEffect(() => {
    let debouncer = setTimeout(() => {
      if (searchText === "") {
        setAllTracks(undefined);
        setAllAlbums(undefined);
        setAllMusician(undefined);
      } else {
        fetchData();
      }
    }, 200);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchText]);

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Field
          onChange={(value) => setSearchText(value)}
          value={searchText}
          placeholder="Поиск..."
          style={{ width: "80%" }}
          isSearch
        />
        <TouchableOpacity onPress={closeInput}>
          <Ionicons name="md-close-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {searchText ? (
          <View>
            <View>
              {allMusician ? (
                <View>
                  {allMusician.map((musician) => (
                    <Text style={{ color: "white" }}>{musician.nickname}</Text>
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              {allTracks ? (
                <View>
                  {allTracks.length > 0 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "white", marginLeft: 20 }}>
                        Треки
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SearchTracks", { searchText })
                        }
                      >
                        <Text style={{ color: "white", marginRight: 20 }}>
                          Показать все треки &ensp;
                          <Text style={{ color: "yellow" }}>
                            {allTracks.length}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                  <View>
                    {allTracks?.slice(0, 5).map((item, index) => (
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
                                    {key === allTracks[index].url &&
                                    playingStatus === "playing" ? (
                                      <Image
                                        source={require("../../assets/Equalizer/gif-animation.gif")}
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
                                    source={require("../../assets/image/Anemone.jpg")}
                                    style={{ width: 50, height: 50 }}
                                    imageStyle={{ borderRadius: 6 }}
                                  >
                                    {key === allTracks[index].url &&
                                    playingStatus === "playing" ? (
                                      <Image
                                        source={require("../../assets/Equalizer/gif-animation.gif")}
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
                        <View style={{ marginTop: 14, marginRight: 20 }}>
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

                  {allTracks.length === 0 ? (
                    <View>
                      <Text style={{ color: "white" }}>Треки не найдены</Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={{ color: "white" }}>
                    <Loader />
                  </Text>
                </View>
              )}
              {allAlbums ? (
                <View style={styles.AlbumsContainer}>
                  {allAlbums?.slice(0, 2).map((album: IAlbum, index) => (
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
              ) : (
                <View></View>
              )}
            </View>
          </View>
        ) : (
          <View>
            <Text style={{ color: "white" }}>Введите запрос</Text>
          </View>
        )}
      </ScrollView>
      <Modalize snapPoint={250} ref={ModalizeTrackRef}>
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
            {/* <View>
                <Text style={{ color: "white" }}>Музыканты:</Text>
              </View> */}
            {modalizeItem?.musicians?.map((musician: IMusicians) => (
              <TouchableOpacity
                style={styles.ModalBlock}
                onPress={() => navigation.push("MusicianPage", { ...musician })}
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
  mainContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
    opacity: 0.93,
    flex: 1,
  },
  AlbumsContainer: {
    width: Dimensions.get("window").width,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
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
});

export default Search;
