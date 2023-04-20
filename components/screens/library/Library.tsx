import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../../providers/AuthProvider";

// interface IRoomMain {
//   route: any;
// }

const Library: FC = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const { user } = useAuth();
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          alignItems: "center",
          borderBottomWidth: 0.3,
          borderBottomColor: "#1b1b1b",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: 10,
            }}
            source={require("../../../assets/image/Anemone.jpg")}
          />
          <Text style={{ color: "white" }}>
            {user?.Name ? user?.Name : "Имя профиля"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("MyTracks")}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Ionicons name="musical-notes-outline" size={24} color="grey" />
            <Text style={styles.text}>Мои треки</Text>
          </View>
          <AntDesign style={styles.icons} name="right" size={24} color="grey" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyAlbums")}>
        <View style={styles.container}>
          <View style={styles.text}>
            <MaterialIcons name="album" size={24} color="grey" />
            <Text style={styles.text}>Мои Альбомы</Text>
          </View>
          <AntDesign style={styles.icons} name="right" size={24} color="grey" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyPlaylists")}>
        <View style={styles.container}>
          <View style={styles.text}>
            <MaterialCommunityIcons
              name="playlist-music"
              size={24}
              color="grey"
            />
            <Text style={styles.text}>Мои плейлисты</Text>
          </View>
          <AntDesign style={styles.icons} name="right" size={24} color="grey" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.text}>
            <FontAwesome5 name="guitar" size={24} color="grey" />
            <Text style={styles.text}>Артисты</Text>
          </View>
          <AntDesign style={styles.icons} name="right" size={24} color="grey" />
        </View>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: "red", fontSize: 16, marginTop: 10 }}>
            Выйти
          </Text>
        </TouchableOpacity>
      </View>
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
  container: {
    height: 45,
    width: Dimensions.get("window").width,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 0.3,
    borderBottomColor: "#1b1b1b",
  },
  text: {
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    fontSize: 16.5,
  },
  icons: {
    marginTop: 10,
    marginRight: 10,
  },
});

export default Library;
