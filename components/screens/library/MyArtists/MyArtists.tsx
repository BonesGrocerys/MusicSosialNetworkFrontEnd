import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import { API_URL } from "../../../../providers/api";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import { IMusicians } from "../../../../Interfaces/Tracks";
import { useAuth } from "../../../../providers/AuthProvider";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../ui/Loader";

const MyArtists: FC = () => {
  const [musician, setMusician] = useState<IMusicians[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const navigation = useNavigation();
  const GetMusicians = async () => {
    try {
      setLoading(true);
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios.get<IOperationResult<IMusicians[]>>(
        `${API_URL}/Musician/get-all-subscribed-musician?personId=${user?.id}`
      );
      if (data.success) {
        setMusician(data.result);
        return true;
      }
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetMusicians();
  }, []);
  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          {musician?.map((musician) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MusicianPage", { ...musician })
              }
            >
              <View
                style={{
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <ImageBackground
                  style={{ width: 200, height: 200 }}
                  imageStyle={{ borderRadius: 100 }}
                  source={{
                    uri: `data:image/jpeg;base64,${musician?.musicianCover}`,
                  }}
                ></ImageBackground>
                <Text style={{ color: "white" }}>{musician?.nickname}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
export default MyArtists;
