import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { FC, useState, useEffect, useRef } from "react";
import { IPlaylist } from "../../../../Interfaces/Playlist";
import axios, { AxiosError } from "axios";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import { API_URL } from "../../../../providers/api";
import { useAuth } from "../../../../providers/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Loader from "../../../ui/Loader";
import { Modalize } from "react-native-modalize";
const PlaylistsCreatedByMe: FC = () => {
  const navigation = useNavigation();
  const [myPlaylists, setMyPlaylists] = useState<IPlaylist[] | null>();
  const [playlist, setPlaylist] = useState<IPlaylist>();
  const modalizePlaylistRef = useRef<any>(null);
  const { user } = useAuth();
  const getAllMyPlaysts = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<IPlaylist[]>>(
        `${API_URL}/Playlist/get-playlists-by-personId?personId=${user?.id}`,
        {
          headers: {
            // Authorization: `bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setMyPlaylists(data.result);
        return true;
      }
    } catch (e) {
      setMyPlaylists(null);
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const HandleDeletePlaylist = async () => {
    await DeletePlaylist();
    await getAllMyPlaysts();
    await modalizePlaylistRef.current?.close();
  };

  const DeletePlaylist = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.delete<IOperationResult<any>>(
        `${API_URL}/Playlist/delete-playlist?playlistId=${playlist?.id}`
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

  const handlePress = async (itemData: IPlaylist) => {
    await setPlaylist(itemData);
    await modalizePlaylistRef.current?.open();
  };

  useEffect(() => {
    getAllMyPlaysts();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          height: 30,
          alignItems: "center",
          alignContent: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: "grey",
          marginTop: 10,
        }}
        onPress={() => navigation.navigate("CreatePlaylist")}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-around",
            width: Dimensions.get("window").width,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 13,
            }}
          >
            Создать плейлист
          </Text>
          <AntDesign name="right" size={24} color="grey" />
        </View>
      </TouchableOpacity>
      {myPlaylists === null ? (
        <View
          style={{
            alignItems: "center",
            width: "100%",
            marginTop: "50%",
          }}
        >
          <Text style={{ color: "white" }}>Плейлистов пока нет</Text>
        </View>
      ) : (
        <ScrollView>
          {myPlaylists ? (
            <View>
              {myPlaylists?.map((playlist: IPlaylist) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginTop: 10,
                      alignContent: "center",
                      alignItems: "center",
                      width: "80%",
                    }}
                    onPress={() =>
                      navigation.navigate("Playlist", { playlist })
                    }
                  >
                    <ImageBackground
                      source={{
                        uri: `data:image/jpeg;base64,${playlist?.playlistImage}`,
                      }}
                      style={{ width: 100, height: 100 }}
                      imageStyle={{ borderRadius: 6 }}
                    ></ImageBackground>
                    <View style={{ width: "50%", alignItems: "center" }}>
                      <Text style={{ color: "white", fontSize: 16 }}>
                        {playlist?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePress(playlist)}
                    style={{ width: "20%" }}
                  >
                    <View>
                      <Entypo
                        name="dots-three-horizontal"
                        size={24}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={{ height: 100 }}></View>
            </View>
          ) : (
            <Loader />
          )}
        </ScrollView>
      )}

      <Modalize
        ref={modalizePlaylistRef}
        snapPoint={350}
        scrollViewProps={{ scrollEnabled: false }}
        panGestureEnabled={false}
      >
        <View style={styles.ModalContainer}>
          <View style={styles.ModalContent}>
            <View
              style={{
                borderBottomWidth: 0.3,
                borderBottomColor: "#1b1b1b",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${playlist?.playlistImage}`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                  marginTop: 10,
                  marginBottom: 5,
                }}
              />
              <Text style={{ color: "white", marginBottom: 10 }}>
                {playlist?.name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.ModalBlock}
              onPress={() =>
                navigation.navigate("PlaylistUpdate", { playlist })
              }
            >
              <Text style={{ color: "white", marginBottom: 10 }}>
                Обновить плейлист
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ModalBlock}
              onPress={() => HandleDeletePlaylist()}
            >
              <Text style={{ color: "red", marginBottom: 10 }}>
                Удалить плейлист
              </Text>
            </TouchableOpacity>
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
  ModalContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#0f0f0f",
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 45,
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
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PlaylistsCreatedByMe;
