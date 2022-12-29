import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { MusicContext, useMusic } from "../../../providers/MusicProvider";
import axios from "axios";
import { API_URL } from "../../../providers/api";
import { IOperationResult } from "../../../Interfaces/OperationResult";
import { ITrack } from "../../../Interfaces/Tracks";
import { IAlbum } from "../../../Interfaces/Album";
import { useAuth } from "../../../providers/AuthProvider";
import { AntDesign } from "@expo/vector-icons";

const Home: FC = () => {
  const { playSound } = useMusic();
  const { user, logout, getToken, token } = useAuth();

  const [tracks, setTracks] = useState<ITrack[]>();

  const getAllTracksHome = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios
        .get<IOperationResult<ITrack[]>>(`${API_URL}/Tracks/get-tracks`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        })
        .then((x) => {
          console.log(x);
          return x;
        });
      setTracks(data.result);
      console.log(data);
      // console.log(token);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
      // console.log(`Bearer ${token}`);
    } finally {
    }
  };

  useEffect(() => {
    getAllTracksHome();
  }, []);

  return (
    <View style={styles.container}>
      {tracks?.map((item: any, index: any) => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            key={index}
            onPress={() => playSound(tracks, index)}
          >
            <View style={{ height: 50, alignItems: "center" }}>
              <Text style={{ color: "white" }}>{item.title}</Text>
              <Text style={{ color: "grey" }}>
                SHPACKYOU$
                {/* {item.musicians[1].nickname} */}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <AntDesign name="plus" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <View>
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: "white" }}>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "black",

    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginVertical: "50%",
  },
});

export default Home;
