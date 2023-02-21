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

// const { songs } = useMusic();
// const setupPlayer = async () => {
//   await TrackPlayer.setupPlayer();
//   await TrackPlayer.add(songs); // Добавление моих треков в проигрыватель
// };

// const togglePlayback = async (playbackState: State) => {
//   const currentTrack = await TrackPlayer.getCurrentTrack();
//   if (currentTrack !== null)
//     if (playbackState == State.Paused) {
//       await TrackPlayer.play();
//     } else {
//       await TrackPlayer.pause();
//     }
// };

const PlayerModal: FC = () => {
  const { ModalizeRef } = useMusic();

  // const playbackState = usePlaybackState();

  // const ModalizeRef = useRef(null);

  // function onOpen() {
  //   ModalizeRef.current?.open();
  // }
  {
    /* <MiniPlayer onIsOpen={onOpen} /> */
  }
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
