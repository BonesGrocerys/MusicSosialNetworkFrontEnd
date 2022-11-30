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

// interface IPlayerMenuBottom {
//   onPress: () => void;
// }

const PlayerMenuBottom: FC = () => {
  const { activeMiniPlayer } = useMusic();
  return activeMiniPlayer ? <PlayerModal /> : <></>;
};

export default PlayerMenuBottom;
