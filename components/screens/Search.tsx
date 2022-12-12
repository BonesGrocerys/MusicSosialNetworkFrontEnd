import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { FC } from "react";
import { useMusic } from "../../providers/MusicProvider";
import Album from "../Album";

const Search: FC = () => {
  const { songs } = useMusic();
  return (
    <View>
      <ScrollView>
        <Album />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  album: {
    width: 100,
    height: 100,
  },
});

export default Search;
