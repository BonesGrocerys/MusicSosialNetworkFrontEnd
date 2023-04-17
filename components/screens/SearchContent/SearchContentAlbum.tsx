import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { FC } from "react";
import { IAlbum } from "../../../Interfaces/Album";
import Navigation from "../../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../ui/Loader";

interface ISearchContentAlbum {
  allAlbums: IAlbum[];
  searchText: string;
}

const SearchContentAlbum: FC<ISearchContentAlbum> = ({
  allAlbums,
  searchText,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {allAlbums?.length === 0 ? (
          <Text style={{ color: "white", marginLeft: 20 }}>
            Альбомы не найдены
          </Text>
        ) : allAlbums?.length > 0 ? (
          <Text style={{ color: "white", marginLeft: 20 }}>Альбомы:</Text>
        ) : (
          <></>
        )}
        {allAlbums?.length > 2 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchAlbum", { searchText })}
          >
            <Text style={{ color: "white", marginRight: 20 }}>
              Показать все &ensp;
              <Text style={{ color: "yellow" }}>{allAlbums?.length}</Text>
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      {allAlbums ? (
        <View style={styles.AlbumsContainer}>
          {allAlbums?.slice(0, 2).map((album: IAlbum, index) => (
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
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  AlbumsContainer: {
    width: Dimensions.get("window").width,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
});
export default SearchContentAlbum;
