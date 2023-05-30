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
import ModalizeTrack from "../Track/ModalizeTrack";
//   interface ISearchContentChart {
//     route: RouteProp<TypeRootStackParamList, "SearchContentChart">;
//   }

const SearchContentChart: FC = () => {
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
        `${API_URL}/Statistics/get-popular-tracks`
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
      <View>
        <View>
          {tracks?.slice(0, 5).map((item, index) => (
            <View style={styles.trackView}>
              <View>
                <TouchableOpacity
                  key={index}
                  onPress={() => playMyTracks(index)}
                >
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Chart")}>
            <Text style={{ color: "white" }}>Показать все треки</Text>
          </TouchableOpacity>
        </View>
      </View>

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
  container: {
    height: 350,
  },
  //   trackContainer: {
  //     height: 50,
  //     width: Dimensions.get("window").width,
  //     flexDirection: "row",
  //     marginTop: 10,
  //   },
  trackView: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default SearchContentChart;
