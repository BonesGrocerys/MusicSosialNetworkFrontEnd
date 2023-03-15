import { View, Text, ScrollView } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import React, { FC, useRef, Dispatch, SetStateAction } from "react";
import MiniPlayer from "./MiniPlayer";
import { Modalize } from "react-native-modalize";
import MusicPlayer from "./MusicPlayer";
import { useMusic } from "../../../providers/MusicProvider";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../../navigation/types";

type PlayerModalProps = {
  navigation: NavigationProp<TypeRootStackParamList>;
};
const PlayerModal: FC<PlayerModalProps> = ({ navigation }) => {
  const { ModalizeRef } = useMusic();

  return (
    <View>
      <MiniPlayer />

      <Modalize ref={ModalizeRef} scrollViewProps={{ scrollEnabled: false }}>
        <MusicPlayer navigation={navigation} />
      </Modalize>
    </View>
  );
};

export default PlayerModal;
