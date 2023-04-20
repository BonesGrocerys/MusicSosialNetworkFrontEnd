import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { FC, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker/src/ImagePicker";

const PlaylistsCreatedByMe: FC = () => {
  const [image, setImage] = useState<string>("");

  //   const pickImage = async () => {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status === "granted") {
  //       let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.All,
  //         allowsEditing: true,
  //         aspect: [4, 3],
  //         quality: 1,
  //       });

  //       if (!result.canceled) {
  //         setImage(result.assets[0].uri);
  //         console.log(image);
  //       }
  //     }
  //   };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      const data = new FormData();
      const response = await fetch(result.uri);
      const blob = await response.blob();
      data.append("image", blob);
      console.log(result.uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View>
      <Text style={{ color: "black" }}>PlaylistsCreatedByMe</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button title="Выбрать фото" onPress={pickImage} />
        {/* <TouchableOpacity onPress={pickImage}>
          <Text style={{ color: "black" }}>Выбрать</Text>
        </TouchableOpacity> */}
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </View>
  );
};

export default PlaylistsCreatedByMe;
