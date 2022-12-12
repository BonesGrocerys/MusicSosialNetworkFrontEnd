import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useRef } from "react";
import { useMusic } from "../../../../providers/MusicProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

const MyTracks: FC = () => {
  const { playSound, songs, indexNow, playingStatus } = useMusic();
  const ModalizeTrackRef = useRef(null);
  return (
    <View style={styles.container}>
      {songs.map((item, index) => (
        <View style={styles.trackView}>
          <View>
            <TouchableOpacity key={index} onPress={() => playSound(index)}>
              {/* style={styles.trackContainer} */}
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 20 }}>
                  <ImageBackground
                    source={item.atwork}
                    style={{ width: 50, height: 50 }}
                    imageStyle={{ borderRadius: 6 }}
                  >
                    {indexNow === index && playingStatus === "playing" ? (
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
                  <Text style={{ color: "grey" }}>{item.artist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 14, marginRight: 10 }}>
            <TouchableOpacity onPress={() => ModalizeTrackRef.current?.open()}>
              <Entypo name="dots-three-horizontal" size={24} color="white" />
              <Text style={{ color: "white" }}>{item.id} </Text>
            </TouchableOpacity>
          </View>
          <Modalize snapPoint={50} ref={ModalizeTrackRef}>
            <View style={styles.container}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <View style={{ width: "15%", marginLeft: 10 }}>
                  <Ionicons name="trash-outline" size={40} color="red" />
                  <Text style={{ color: "white" }}>{index} </Text>
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
