import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { FC } from "react";
import { useMusic } from "../providers/MusicProvider";
import { ITrack } from "../Interfaces/Tracks";
import { IAlbum } from "../Interfaces/Album";

interface IAlbums{
  albums: IAlbum[]
}

const Albums: FC<IAlbums> = ({ albums }) => {
  // const { songs } = useMusic();
  return (
    <View>
      <ScrollView horizontal={true}>
        {albums.map((item) => (
          <View style={{ flexDirection: "row", backgroundColor: 'red' }}>
            <View style={{ flexDirection: "column", backgroundColor: 'red' }}>
              <Image source={item.atwork} style={{ width: 100, height: 100 }} />
              <Text>{item.title} </Text>
            </View>
          </View>
      ))}
      
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

export default Albums;
