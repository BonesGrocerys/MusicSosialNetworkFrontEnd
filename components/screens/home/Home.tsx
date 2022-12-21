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

const Home: FC = () => {
  const { playSound } = useMusic();

  const [tracks, setTracks] = useState<ITrack[]>();

  const getAllTracksHome = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios
        .get<IOperationResult<ITrack[]>>(
          `${API_URL}/Tracks/get-all-added-tracks-person/1`
        )
        .then((x) => {
          console.log(x);
          return x;
        });
      setTracks(data.result);
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    getAllTracksHome();
  }, []);

  return (
    <View style={styles.container}>
      {tracks?.map((item: any, index: any) => (
        <View>
          <TouchableOpacity
            key={index}
            onPress={() => playSound(tracks, index)}
          >
            <View style={{ height: 50, alignItems: "center" }}>
              <Text style={{ color: "white" }}>{item.title}</Text>
              <Text style={{ color: "grey" }}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
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
