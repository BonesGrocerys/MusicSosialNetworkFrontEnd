import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { FC, useState, useEffect, useRef } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../../../navigation/types";
import { IMusicians, ITrack } from "../../../../Interfaces/Tracks";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import axios from "axios";
import { API_URL } from "../../../../providers/api";
import { useAuth } from "../../../../providers/AuthProvider";
import { useMusic } from "../../../../providers/MusicProvider";
import { truncate } from "lodash";
import { Entypo } from "@expo/vector-icons";
import ModalizeTrack from "../../Track/ModalizeTrack";
import { MaterialIcons } from "@expo/vector-icons";
import { IPlaylist } from "../../../../Interfaces/Playlist";
interface IPlaylistTracks {
  navigation: PlaylistNavigationProp;
  route: PlaylistRouteProp;
}
type PlaylistNavigationProp = StackNavigationProp<TypeRootStackParamList>;

type PlaylistRouteProp = RouteProp<TypeRootStackParamList>;

const Playlist: FC<IPlaylistTracks> = ({ navigation, route }) => {
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>();
  const [playlist, setPlaylist] = useState<IPlaylist>();
  const [playlistBelongsToUser, setPlaylistBelongsToUser] = useState<boolean>();
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
    await playSound(playlistTracks, index);
  };

  const handlePress = async (itemData: ITrack) => {
    await TrackIsAddedPages(itemData);
    await setModalizeItem(itemData);
    await ModalizeTrackRef.current?.open();
  };

  const GetTracksFromPlaylistId = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");
      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Playlist/get-tracks-from-playlistId?playlistId=${route?.params?.playlist?.id}`
      );
      if (data.success) {
        setPlaylistTracks(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const PlaylistBelongsToUser = async () => {
    try {
      const { data } = await axios.get<IOperationResult<boolean>>(
        `${API_URL}/Playlist/playlist-belongs-to-user?playlistId=${route?.params?.playlist?.id}&personId=${user?.id}`
      );
      if (data.success) {
        setPlaylistBelongsToUser(data?.result);
        console.log(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const DeleteTracksFromPlaylist = async (track: ITrack) => {
    try {
      const { data } = await axios.delete<IOperationResult<any>>(
        `${API_URL}/Playlist/delete-track-from-playlist?playlistId=${route?.params?.playlist?.id}&trackId=${track?.id}`
      );
      if (data.success) {
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const DeleteTrackHandler = async (track: ITrack) => {
    await DeleteTracksFromPlaylist(track);
    await GetTracksFromPlaylistId();
  };

  useEffect(() => {
    GetTracksFromPlaylistId();
    PlaylistBelongsToUser();
    setPlaylist(route?.params?.playlist);
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
              uri: `data:image/jpeg;base64,${route?.params?.playlist?.playlistImage}`,
            }}
          ></ImageBackground>
          <Text style={{ color: "grey", marginTop: 10, fontSize: 16 }}>
            {route?.params?.playlist?.creator}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {route?.params?.playlist?.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("PlaylistUpdate", { playlist })}
        >
          <Text style={{ color: "white" }}>Update</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            marginTop: 10,
            marginLeft: 20,
            paddingBottom: 10,
          }}
        >
          Треки&ensp;
          <Text style={{ color: "yellow" }}>{playlistTracks?.length}</Text>
        </Text>
        {playlistTracks?.length === 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Добавить треки
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {playlistTracks?.map((item, index) => (
          // <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={styles.trackView}>
              <TouchableOpacity key={index} onPress={() => playMyTracks(index)}>
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
                        {key === playlistTracks[index].url &&
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
                        {key === playlistTracks[index].url &&
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
                {playlistBelongsToUser === true ? (
                  <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={() => DeleteTrackHandler(item)}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
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

export default Playlist;
