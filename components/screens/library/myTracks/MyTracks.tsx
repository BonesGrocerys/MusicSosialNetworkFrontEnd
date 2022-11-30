import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState } from "react";
import { MusicContext, useMusic } from "../../../../providers/MusicProvider";
import MusicPlayer from "../../musicPlayer/MusicPlayer";
import PlayerModal from "../../musicPlayer/PlayerModal";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";

const MyTracks: FC = () => {
  const {
    activeMiniPlayer,
    setActiveMiniPlayer,
    playSound,
    songs,
    NextTrack,
    indexNow,
    playingStatus,
  } = useMusic();

  // const [playingStatus, setPlayingStatus] = useState("nosound");

  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  // async function playSound() {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../../../../assets/Songs/Lower_world.m4a")
  //   );
  //   setSound(sound);
  //   setPlayingStatus("playing");
  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }

  // function _syncPauseAndPlayRecording() {
  //   if (sound != null) {
  //     if (playingStatus === "playing") {
  //       sound.pauseAsync();
  //       console.log("Pausing");
  //       setPlayingStatus("pausing");
  //     } else {
  //       setPlayingStatus("playing");
  //       sound.playAsync();
  //     }
  //   }
  // }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <View style={styles.container}>
      <Text>MyTracks</Text>
      <View>
        {songs.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => playSound(index)}>
            {/* <Text
              style={
                indexNow === index ? { color: "blue" } : { color: "white" }
              }
            > */}

            <View style={styles.trackContainer}>
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

                  <Text></Text>
                </ImageBackground>
              </View>
              <View
                style={{ alignItems: "center", marginTop: 4, marginRight: 15 }}
              >
                <Text style={{ color: "white" }}>{item.title}</Text>
                <Text style={{ color: "white" }}>{item.artist}</Text>
              </View>
              <View style={{ marginRight: 20, marginTop: 12 }}>
                <Entypo name="dots-three-horizontal" size={20} color="white" />
              </View>
            </View>

            {/* </Text> */}
          </TouchableOpacity>
        ))}
        {/* <Image
          source={require("../../../../assets/Equalizer/oie_291440432hibyr30.gif")}
          style={{ width: 45, height: 45, borderRadius: 5 }}
        /> */}
      </View>
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
    justifyContent: "space-between",
    // display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default MyTracks;
