import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { FC, useState } from "react";
import MiniPlayer from "./MiniPlayer";
import MusicPlayer from "./MusicPlayer";
import { Pressable } from "react-native";
import PlayerModal from "./PlayerModal";
import { MusicProvider } from "../../../providers/MusicProvider";
import { useMusic } from "../../../providers/MusicProvider";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../../navigation/types";
// interface IPlayerMenuBottom {
//   onPress: () => void;
// }
type PlayerMenuBottomProps = {
  navigation: NavigationProp<TypeRootStackParamList>;
};

const PlayerMenuBottom: FC<PlayerMenuBottomProps> = ({ navigation }) => {
  // const navigation = useNavigation();
  const { activeMiniPlayer } = useMusic();

  return activeMiniPlayer ? <PlayerModal navigation={navigation} /> : <></>;
};

export default PlayerMenuBottom;
