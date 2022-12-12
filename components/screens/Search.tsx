import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { FC, useEffect } from "react";
import { useMusic } from "../../providers/MusicProvider";
import Albums from "../Albums";

const Search: FC = () => {
  const statuses = ["Новинки", "Редакция"]
  const { albums, getTracks } = useMusic();
  const test = [1, 2, 3]
  useEffect(() => {
    console.log("TESTTEST");
    
    const p = getTracks();
  }, [])
  return (
    <View>
      <ScrollView style={{ height: "100%"}}>
        {statuses?.map(status => <View>
         <Text>{status}</Text>
          <Albums albums={albums.filter(album => album.status ===  status)}/>
        </View>)}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    
  },

});

export default Search;
