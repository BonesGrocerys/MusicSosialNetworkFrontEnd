import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useMusic } from "../../providers/MusicProvider";
import Albums from "../Albums";
import { IMusicians, ITrack } from "../../Interfaces/Tracks";
import { useNavigation } from "@react-navigation/native";
import Field from "../ui/Field";
import axios, { all } from "axios";
import { IOperationResult } from "../../Interfaces/OperationResult";
import { API_URL } from "../../providers/api";
import { Ionicons } from "@expo/vector-icons";
import Tracks from "./Track/SearchTracks";
import Loader from "../ui/Loader";

// interface ISearch {
//   allTracks: ITrack[];
// }

const Search: FC = () => {
  const navigation = useNavigation();
  const [allTracks, setAllTracks] = useState<ITrack[]>();
  const [searchText, setSearchText] = useState("");
  // useEffect(() => {
  //   console.log("TESTTEST");

  //   const p = getTracks();
  // }, []);

  const GetAllTracks = async (searchText?: string) => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<ITrack[]>>(
        `${API_URL}/Tracks/get-all-tracks?searchText=${
          searchText ? searchText : ""
        }`
      );
      if (data.success) {
        setAllTracks(data.result);
        console.log(allTracks);

        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const fetchData = () => {
    GetAllTracks(searchText);
  };

  const closeInput = () => {
    setSearchText("");
    setAllTracks(undefined);
    Keyboard.dismiss();
  };

  useEffect(() => {
    let debouncer = setTimeout(() => {
      if (searchText === "") {
        setAllTracks(undefined);
      } else {
        fetchData();
      }
    }, 200);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchText]);

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Field
          onChange={(value) => setSearchText(value)}
          value={searchText}
          placeholder="Поиск..."
          style={{ width: "80%" }}
          isSearch
        />
        <TouchableOpacity onPress={closeInput}>
          <Ionicons name="md-close-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {searchText ? (
        <View>
          {allTracks ? (
            <View>
              {allTracks.length > 0 ? (
                <Text style={{ color: "white" }}>Треки:</Text>
              ) : (
                <></>
              )}
              {allTracks?.slice(0, 5).map((track) => (
                <Text style={{ color: "white" }}> {track.title}</Text>
              ))}
              {allTracks.length === 0 && searchText.length > 1 ? (
                <View>
                  <Text style={{ color: "white" }}>Не найдено</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SearchTracks", { searchText })
                  }
                >
                  <Text style={{ color: "white" }}>Показать все треки</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
              <Text style={{ color: "white" }}>
                <Loader />
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>Введите запрос</Text>
        </View>
      )}
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
