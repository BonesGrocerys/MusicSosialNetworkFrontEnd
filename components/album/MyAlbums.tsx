import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import Album from "./Album";
import { IAlbum } from "../../Interfaces/Album";
import { IOperationResult } from "../../Interfaces/OperationResult";
import { useAuth } from "../../providers/AuthProvider";
import { API_URL } from "../../providers/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { IMusicians } from "../../Interfaces/Tracks";
import { truncate } from "lodash";

const MyAlbums: FC = () => {
  const [myAlbums, setMyAlbums] = useState<IAlbum[]>();
  const { user } = useAuth();
  const navigation = useNavigation();
  const GetMyAlbums = async () => {
    try {
      const { data } = await axios.get<IOperationResult<IAlbum[]>>(
        `${API_URL}/Album/get-all-added-albums-by-personId?personId=${user?.id}`
      );
      if (data.success) {
        setMyAlbums(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    GetMyAlbums();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.AlbumsContainer}>
          {myAlbums?.map((album: IAlbum) => (
            <TouchableOpacity
              style={{ marginTop: 5 }}
              onPress={() => navigation.navigate("AlbumPage", { ...album })}
            >
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${album?.cover}`,
                }}
                style={{ width: 150, height: 150 }}
              />
              <Text style={{ color: "white" }}>{album?.albumTitle}</Text>
              <Text style={{ color: "white" }}>
                <Text style={{ color: "grey" }}>
                  {truncate(
                    album?.musicians
                      ?.map((musician: IMusicians) => musician.nickname)
                      .join(" "),
                    { length: 18, separator: " " }
                  )}
                </Text>
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
});

export default MyAlbums;
