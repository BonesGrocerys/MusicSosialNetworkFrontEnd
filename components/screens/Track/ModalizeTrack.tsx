import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { FC } from "react";
import { IMusicians, ITrack } from "../../../Interfaces/Tracks";
import { Modalize } from "react-native-modalize";
import Navigation from "../../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TypeRootStackParamList } from "../../../navigation/types";
import AddTrackInPlaylist from "./AddTrackInPlaylist";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useMusic } from "../../../providers/MusicProvider";
interface IModalizeTrack {
  modalizeItem: ITrack;
  ModalizeTrackRef: any;
  navigation: ModalizeTrackNavigationProp;
  //   route: ModalizeTrackRouteProp;
  trackIsAdded: any;
}

type ModalizeTrackNavigationProp = StackNavigationProp<TypeRootStackParamList>;

// type ModalizeTrackRouteProp = RouteProp<TypeRootStackParamList>;
const ModalizeTrack: FC<IModalizeTrack> = ({
  modalizeItem,
  ModalizeTrackRef,
  navigation,
  trackIsAdded,
}) => {
  const { DeleteTrackFromPerson, AddTrackToPersonPages } = useMusic();
  return (
    <Modalize snapPoint={350} ref={ModalizeTrackRef}>
      <View style={styles.ModalContainer}>
        <View style={styles.ModalContent}>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderBottomColor: "#1b1b1b",
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: `data:image/jpeg;base64,${modalizeItem?.cover}`,
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 20,
                marginBottom: 10,
              }}
            />
            <Text style={{ color: "white", marginLeft: 20 }}>
              {modalizeItem?.title}
            </Text>
            {trackIsAdded === true ? (
              <View style={{ marginLeft: "12%" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 40,
                  }}
                  onPress={() => DeleteTrackFromPerson(modalizeItem)}
                >
                  <AntDesign name="heart" size={35} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginLeft: "12%" }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 40,
                  }}
                  onPress={() => AddTrackToPersonPages(modalizeItem)}
                >
                  <AntDesign name="hearto" size={35} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {modalizeItem?.musicians?.map((musician: IMusicians) => (
            <TouchableOpacity
              style={styles.ModalBlock}
              onPress={() => navigation.push("MusicianPage", { ...musician })}
            >
              <Text style={{ color: "white" }}>{musician.nickname}&nbsp;</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.ModalBlock}
            onPress={() => navigation.navigate("AddTrackInPlaylist")}
          >
            <Text style={{ color: "white" }}>Добавить в плейлист</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  ModalContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#0f0f0f",
    flex: 1,

    alignItems: "center",
  },
  ModalContent: {
    marginTop: 10,
    height: Dimensions.get("window").height,
    width: "90%",
    backgroundColor: "black",
    borderRadius: 20,
    alignItems: "center",
  },
  ModalBlock: {
    height: "6%",
    width: "100%",
    borderBottomWidth: 0.3,
    borderBottomColor: "#1b1b1b",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ModalizeTrack;
