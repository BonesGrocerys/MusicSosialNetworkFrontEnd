import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { FC } from "react";
import { useMusic } from "../providers/MusicProvider";

const Album: FC = () => {
  const { songs } = useMusic();
  return (
    <View>
      {songs.map((item) => (
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row" }}>
            <Image source={item.atwork} style={{ width: 100, height: 100 }} />
            <Text>{item.title} </Text>
          </View>
        </ScrollView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  album: {
    width: 100,
    height: 100,
  },
});

export default Album;
