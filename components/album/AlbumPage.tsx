import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useEffect, useRef } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../navigation/types";
import axios from "axios";
import { IOperationResult } from "../../Interfaces/OperationResult";
import { API_URL } from "../../providers/api";
import { IMusicians, ITrack } from "../../Interfaces/Tracks";
import { useMusic } from "../../providers/MusicProvider";
import { useAuth } from "../../providers/AuthProvider";
import { truncate } from "lodash";
import { Entypo } from "@expo/vector-icons";
import ModalizeTrack from "../screens/Track/ModalizeTrack";
import { AntDesign } from "@expo/vector-icons";
interface IAlbumPage {
  route: RouteProp<TypeRootStackParamList, "AlbumPage">;
}

const AlbumPage: FC<IAlbumPage> = ({ route }) => {
  const navigation = useNavigation();
  const [allTracks, setAllTracks] = useState<ITrack[]>();
  const [albumBelongsToUser, setAlbumBelongsToUser] = useState<boolean>();
  const ModalizeTrackRef = useRef<any>(null);
  const [modalizeItem, setModalizeItem] = useState<ITrack | undefined>();
  const {
    songsNow,
    indexNow,
    setInfinityTracksStatus,
    playSound,
    infinityTracksStatus,
    playingStatus,
    key,
    trackIsAdded,
    TrackIsAddedPages,
  } = useMusic();
  const { user } = useAuth();
  const playMyTracks = async (index: number) => {
    await setInfinityTracksStatus(false);
    console.log("infinityTracksStatus", infinityTracksStatus);
    await playSound(allTracks, index);
  };

  const handlePress = async (itemData: ITrack) => {
    await TrackIsAddedPages(itemData);
    await setModalizeItem(itemData);
    await ModalizeTrackRef.current?.open();
  };
  const GetAllTracks = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Album/get-tracks-from-albumId?albumId=${route?.params?.id}`
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

  const AddAlbumToPerson = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios
        .post(
          `${API_URL}/Album/add-album-to-person?albumId=${route?.params?.id}&personId=${user?.id}`,
          {}
        )
        .then((x) => {
          console.log(x);
          return x;
        });
      setAlbumBelongsToUser(true);
      console.log("Успешно");
      alert("Альбом добавлен");
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const DeleteAlbumFromPerson = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.delete<IOperationResult<any>>(
        `${API_URL}/Album/delete-album-from-person?albumId=${route?.params?.id}&personId=${user?.id}`
      );

      if (data.success) {
        alert("ok");
        setAlbumBelongsToUser(false);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const AlbumIsAdded = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");
      const { data } = await axios.get<IOperationResult<boolean>>(
        `${API_URL}/Album/AlbumIsAdded?albumId=${route?.params?.id}&personId=${user?.id}`
      );
      if (data.success) {
        setAlbumBelongsToUser(data.result);
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
    AlbumIsAdded();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View
          style={{
            width: Dimensions.get("window").width,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <ImageBackground
            style={{ width: 200, height: 200 }}
            imageStyle={{ borderRadius: 10 }}
            source={{
              uri: `data:image/jpeg;base64,${route?.params?.cover}`,
            }}
          ></ImageBackground>
          {albumBelongsToUser === true ? (
            <TouchableOpacity onPress={() => DeleteAlbumFromPerson()}>
              <AntDesign name="heart" size={40} color="white" />
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity onPress={AddAlbumToPerson}>
                <AntDesign name="hearto" size={40} color="white" />
              </TouchableOpacity>
            </View>
          )}
          <Text style={{ color: "white", fontSize: 16 }}>
            {route?.params?.albumTitle}
          </Text>
          <Text style={{ color: "grey" }}>
            {truncate(
              route?.params?.musicians
                ?.map((musician: IMusicians) => musician.nickname)
                .join(" "),
              { length: 20, separator: " " }
            )}
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            marginTop: 10,
            marginLeft: 20,
            paddingBottom: 10,
          }}
        >
          Треки&ensp;
          <Text style={{ color: "yellow" }}>{allTracks?.length}</Text>
        </Text>

        {allTracks?.map((item, index) => (
          // <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={styles.trackView}>
              <TouchableOpacity key={index} onPress={() => playMyTracks(index)}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ height: 50 }}>
                    <Text
                      style={{
                        color: "white",
                        marginTop: 15,
                        marginLeft: 10,
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
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
                            ?.map((musician: IMusicians) => musician.nickname)
                            .join(" "),
                          { length: 20, separator: " " }
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{ marginTop: 14, marginRight: 20, flexDirection: "row" }}
              >
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          // </ScrollView>
        ))}
        <View style={{ height: 55 }}></View>
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
  trackView: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default AlbumPage;
