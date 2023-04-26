import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { FC, useState } from "react";
import { TypeRootStackParamList } from "../../../../navigation/types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import { API_URL } from "../../../../providers/api";
import axios from "axios";
import { useAuth } from "../../../../providers/AuthProvider";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import Field from "../../../ui/Field";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
interface IPlaylistUpdate {
  navigation: PlaylistUpdateNavigationProp;
  route: PlaylistUpdateRouteProp;
}
type PlaylistUpdateNavigationProp = StackNavigationProp<TypeRootStackParamList>;

type PlaylistUpdateRouteProp = RouteProp<TypeRootStackParamList>;
const PlaylistUpdate: FC<IPlaylistUpdate> = ({ navigation, route }) => {
  const [name, setName] = useState<string>(route?.params?.playlist?.name);
  const [image, setImage] = useState<string>();
  const [imageData, setImageData] = useState<{
    uri: string;
    name: string | null | undefined;
    type: string | undefined;
  } | null>(null);
  const formData = new FormData();
  formData.append("id", route?.params?.playlist?.id);
  formData.append("name", name);
  if (imageData) {
    formData.append("playlistImage", {
      uri: imageData.uri,
      name: imageData.name,
      type: imageData.type!,
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.type);

      setImage(result.uri);
      setImageData({
        uri: result.uri,
        name: result.fileName,
        type: result.type,
      });
    }
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const HandleUpdate = async () => {
    await UpdatePlaylistName();
    if (imageData) {
      UpdatePlaylistImage();
    }
    // navigation.goBack();
  };

  const UpdatePlaylistName = async () => {
    axios
      .put<IOperationResult<any>>(
        `${API_URL}/Playlist/update-playlist-name`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        // if (response?.data?.errorCode === 1) {
        //   //   navigation.goBack();
        // }
      });
  };

  const UpdatePlaylistImage = async () => {
    axios
      .put<IOperationResult<any>>(
        `${API_URL}/Playlist/update-playlist-image`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        // if (response?.data?.errorCode === 1) {
        //   //   navigation.goBack();
        // }
      });
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  return (
    <View>
      <Text style={{ color: "black" }}>{route?.params?.playlist?.name}</Text>
      <TouchableOpacity style={styles.button} onPress={HandleUpdate}>
        <Text style={styles.buttonText}>Обновить</Text>
      </TouchableOpacity>
      <Field
        onChange={handleNameChange}
        value={name}
        placeholder="Название"
        isSecure={false}
      />
      {imageData ? (
        <Image
          source={{ uri: image }}
          style={{ width: 150, height: 150, marginTop: 10 }}
        />
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <ImageBackground
            source={{
              uri: `data:image/jpeg;base64,${route?.params?.playlist?.playlistImage}`,
            }}
            style={{ width: 150, height: 150 }}
          ></ImageBackground>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 45,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default PlaylistUpdate;
