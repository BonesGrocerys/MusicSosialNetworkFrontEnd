import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { FC, useState } from "react";
import PlaylistsCreatedByMe from "./PlaylistsCreatedByMe";
import AddedPlaylists from "./AddedPlaylists";

const MyPlaylists: FC = () => {
  const [active, setActive] = useState<boolean>(true);

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 40,
          width: "100%",
          marginTop: 10,
          // borderBottomWidth: 0.5,
          // borderBottomColor: "grey",
        }}
      >
        <TouchableOpacity
          onPress={() => setActive(true)}
          style={
            active === true
              ? {
                  borderBottomWidth: 2,
                  borderBottomColor: "yellow",
                  width: "50%",
                }
              : {
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  width: "50%",
                }
          }
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 14,
            }}
          >
            Мои
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActive(false)}
          style={
            active === false
              ? {
                  borderBottomWidth: 2,
                  borderBottomColor: "yellow",
                  width: "50%",
                }
              : {
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  width: "50%",
                }
          }
        >
          <Text style={{ fontSize: 14, color: "white", textAlign: "center" }}>
            Добавленные
          </Text>
        </TouchableOpacity>
      </View>
      {active === true ? <PlaylistsCreatedByMe /> : <AddedPlaylists />}
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
});

export default MyPlaylists;
