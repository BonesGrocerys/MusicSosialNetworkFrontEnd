import { View, Text } from "react-native";
import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { TypeRootStackParamList } from "../../../navigation/types";
interface ISearchMusician {
  route: RouteProp<TypeRootStackParamList, "SearchTracks">;
}
const SearchMusician: FC<ISearchMusician> = ({ route }) => {
  return (
    <View>
      <Text style={{ color: "black" }}>{route?.params?.searchText}</Text>
    </View>
  );
};

export default SearchMusician;
