import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";
import Field from "../../../ui/Field";
import { ICreatePlaylistRequest } from "../../../../Interfaces/Playlist";
import axios, { AxiosError } from "axios";
import { IOperationResult } from "../../../../Interfaces/OperationResult";
import { API_URL } from "../../../../providers/api";
import { useAuth } from "../../../../providers/AuthProvider";

const PlaylistsCreatedByMe: FC = () => {
  const [imageData, setImageData] = useState<{
    uri: string;
    name: string | null | undefined;
    type: string | undefined;
  } | null>(null);
  const [image, setImage] = useState<string>();
  const [name, setName] = useState<string>("");

  const handleNameChange = (text: string) => {
    setName(text);
  };
  const { user } = useAuth();
  // РАБОЧИЙ КОД
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setImage(result.uri);

  //     const data = new FormData();
  //     const response = await fetch(result.uri);
  //     const blob = await response.blob();
  //     data.append("image", blob);

  //     console.log(result.uri);
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };

  // const CreatePlaylist = async () => {
  //   console.log("НАЧАЛО МЕТОДА");

  //   try {
  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("personId", String(user?.id));
  //     // formData.append("playlistImage", image);
  //     const { data } = await axios.post<IOperationResult<any>>(
  //       `${API_URL}/Playlist/create-playlist`,
  //       { formData },
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           // Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log(formData);

  //     return data;
  //   } catch (e) {
  //     const error = e as AxiosError<IOperationResult<any> | null | undefined>;

  //     if (error.response?.status === 400) {
  //       alert(error.response?.data?.message);
  //     }

  //     return error.response?.data!;
  //   } finally {
  //   }
  // };

  const formData = new FormData();
  formData.append("name", name);
  formData.append("personId", String(user?.id));
  if (imageData) {
    formData.append("playlistImage", {
      // uri: imageData.uri,
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageData({
        uri: result.uri,
        name: result.fileName,
        type: result.type,
      });
    }
  };
  return (
    <View>
      <Text style={{ color: "black" }}>PlaylistsCreatedByMe</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button title="Выбрать фото" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <TextInput
        value={name}
        onChangeText={handleNameChange}
        placeholder="Название"
      />
      <TouchableOpacity
        onPress={() => CreatePlaylist()}
        style={{ alignItems: "center", marginTop: 30 }}
      >
        <Text style={{ fontSize: 30 }}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaylistsCreatedByMe;
