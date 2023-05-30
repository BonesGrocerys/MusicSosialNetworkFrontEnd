import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { IGenre } from "../../../Interfaces/Genres";
import axios from "axios";
import { API_URL } from "../../../providers/api";
import { IOperationResult } from "../../../Interfaces/OperationResult";

const SearchGenres: FC = () => {
  const [genres, setGenres] = useState<IGenre[]>();

  const navigation = useNavigation();
  const GetGenres = async () => {
    try {
      const { data } = await axios.get<IOperationResult<IGenre[]>>(
        `${API_URL}/Album/get-all-genres`
      );
      if (data.success) {
        setGenres(data.result);
        return true;
      }
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    GetGenres();
  }, []);
  return (
    <View>
      <View style={styles.GenreContainer}>
        {genres?.map((genre) => (
          <TouchableOpacity
            style={styles.Genre}
            onPress={() => navigation.navigate("GenresPage", { genre })}
          >
            <Text
              style={{
                textAlignVertical: "center",
                fontWeight: "400",
                fontSize: 20,
                color: "white",
              }}
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 70 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
    opacity: 0.93,
    flex: 1,
  },
  GenreContainer: {
    width: Dimensions.get("window").width,
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  Genre: {
    width: 160,
    height: 160,
    backgroundColor: "#67008c",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, red, blue)",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
  Scroll: {
    height: Dimensions.get("window").height,
  },
});

export default SearchGenres;
