import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { TypeRootStackParamList } from "../../../navigation/types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IAlbum } from "../../../Interfaces/Album";
import { IMusicians } from "../../../Interfaces/Tracks";
import { truncate } from "lodash";

interface IMusicianAlbumPage {
  route: RouteProp<TypeRootStackParamList, "MusicianAlbumPage">;
}

const MusicianAlbumPage: FC<IMusicianAlbumPage> = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.AlbumsContainer}>
          {route?.params?.albums?.map((album: IAlbum) => (
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

export default MusicianAlbumPage;
