import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../../navigation/types";
import { useMusic } from "../../../providers/MusicProvider";
import { IPlaylist } from "../../../Interfaces/Playlist";
import { RouteProp } from "@react-navigation/native";
import Loader from "../../ui/Loader";
interface IAddTrackInPlaylist {
  navigation: AddTrackInPlaylistNavigationProp;
  route: AddTrackInPlaylistRouteProp;
}
type AddTrackInPlaylistNavigationProp =
  StackNavigationProp<TypeRootStackParamList>;

type AddTrackInPlaylistRouteProp = RouteProp<TypeRootStackParamList>;

const AddTrackInPlaylist: FC<IAddTrackInPlaylist> = ({ navigation, route }) => {
  const handleBackButtonPress = async (item: IPlaylist) => {
    await AddTrackToPlaylist(route?.params?.modalizeItem.id, item.id);
    await navigation.goBack();
  };

  const { GetPlaylistByPersonId, playlistsByPersonId, AddTrackToPlaylist } =
    useMusic();

  useEffect(() => {
    GetPlaylistByPersonId();
  }, []);
  return (
    <View style={styles.mainContainer}>
      {/* {playlistsByPersonId?.map((playlist: IPlaylist) => (
        <Text onPress={() => handleBackButtonPress(playlist)}>
          {playlist.name}
        </Text>
      ))} */}
      <ScrollView>
        {playlistsByPersonId ? (
          <View>
            {playlistsByPersonId?.map((playlist: IPlaylist) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 10,
                  alignContent: "center",
                  alignItems: "center",
                }}
                onPress={() => handleBackButtonPress(playlist)}
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
            ))}
            <View style={{ height: 100 }}></View>
          </View>
        ) : (
          <Loader />
        )}
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
  container: {
    height: 45,
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderBottomColor: "#1b1b1b",
  },
});

export default AddTrackInPlaylist;
