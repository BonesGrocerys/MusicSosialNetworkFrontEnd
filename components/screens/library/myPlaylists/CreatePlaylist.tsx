import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { FC, useState } from "react";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import Field from "../../../ui/Field";
import axios, { AxiosError } from "axios";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import { API_URL } from "../../../../providers/api";
import { useAuth } from "../../../../providers/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const CreatePlaylist: FC = () => {
  const [imageData, setImageData] = useState<{
    uri: string;
    name: string | null | undefined;
    type: string | undefined;
  } | null>(null);

  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>("");
  const navigation = useNavigation();
  const handleNameChange = (text: string) => {
    setName(text);
  };
  const { user } = useAuth();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("personId", String(user?.id));
  if (imageData) {
    formData.append("playlistImage", {
      uri: imageData.uri,
      name: imageData.name,
      type: imageData.type!,
    });
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      // Authorization: `Bearer ${token}`,
    },
  };

  const CreatePlaylist = async () => {
    axios
      .post<IOperationResult<any>>(
        `${API_URL}/Playlist/create-playlist`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        if (response?.data?.errorCode === 1) {
          navigation.goBack();
        }
      });
  };

  const HandleCreatePlaylist = async () => {
    await CreatePlaylist();
  };

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
  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* <Button title="Выбрать фото" onPress={pickImage} /> */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, marginTop: 10 }}
          />
        )}
      </View>
      {image ? (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Выбрать другое фото</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Entypo name="image" size={100} color="white" />
        </TouchableOpacity>
      )}
      <View style={{ marginTop: 10 }}>
        <Field
          onChange={handleNameChange}
          value={name}
          placeholder="Название"
          isSecure={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={HandleCreatePlaylist}>
        <Text style={styles.buttonText}>Создать</Text>
      </TouchableOpacity>
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
export default CreatePlaylist;
