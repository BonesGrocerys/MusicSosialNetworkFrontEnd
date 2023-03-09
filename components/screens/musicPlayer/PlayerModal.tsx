import { View, Text, ScrollView } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import React, { FC, useRef, Dispatch, SetStateAction } from "react";
import MiniPlayer from "./MiniPlayer";
import { Modalize } from "react-native-modalize";
import MusicPlayer from "./MusicPlayer";
import { useMusic } from "../../../providers/MusicProvider";

interface IPlayerModal {
  playbackState: any;
  togglePlayback: any;
  onIsOpen: any;
}

const PlayerModal: FC = () => {
  const { ModalizeRef } = useMusic();

  return (
    <View>
      <MiniPlayer />

      <Modalize ref={ModalizeRef} scrollViewProps={{ scrollEnabled: false }}>
        <MusicPlayer />
      </Modalize>
    </View>
  );
};

export default PlayerModal;
