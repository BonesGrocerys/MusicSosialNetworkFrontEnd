import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { FC, useEffect } from "react";
import { useMusic } from "../../providers/MusicProvider";
import Albums from "../Albums";
import { IMusicians, ITrack } from "../../Interfaces/Tracks";
import { useNavigation } from "@react-navigation/native";
const Search: FC = () => {
  const statuses = ["Новинки", "Редакция"];
  const { songsNow, indexNow } = useMusic();
  const test = [1, 2, 3];
  const navigation = useNavigation();
  // useEffect(() => {
  //   console.log("TESTTEST");

  //   const p = getTracks();
  // }, []);

  return (
    <View style={styles.mainContainer}>
      <View></View>
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
});

export default Search;
