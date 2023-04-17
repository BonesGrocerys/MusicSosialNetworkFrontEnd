import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { IMusicians } from "../../../Interfaces/Tracks";
import Loader from "../../ui/Loader";
import Navigation from "../../../navigation/Navigation";
import { useNavigation } from "@react-navigation/native";
import { truncate } from "lodash";

interface ISearchContentMusician {
  allMusician: IMusicians[];
  searchText: string;
}
const SearchContentMusician: FC<ISearchContentMusician> = ({
  allMusician,
  searchText,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      {allMusician ? (
        <View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {allMusician?.length === 0 ? (
              <Text style={{ color: "white", marginLeft: 20 }}>
                Музыканты не найдены
              </Text>
            ) : (
              <Text style={{ color: "white", marginLeft: 20 }}>Музыканты:</Text>
            )}
            {allMusician?.length > 4 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SearchMusician", { searchText })
                }
              >
                <Text style={{ color: "white", marginRight: 20 }}>
                  Показать всех &ensp;
                  <Text style={{ color: "yellow" }}>{allMusician?.length}</Text>
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <ScrollView horizontal={true}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              {allMusician?.slice(0, 4).map((musician) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MusicianPage", { ...musician })
                  }
                >
                  <View>
                    <View
                      style={{
                        alignItems: "center",
                        paddingLeft: 20,
                      }}
                    >
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${musician?.musicianCover}`,
                        }}
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 100,
                        }}
                      />

                      <Text style={{ color: "white" }}>
                        {truncate(musician.nickname, {
                          length: 10,
                          separator: " ",
                        })}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <Loader />
        // <Text style={{ color: "white" }}>Музыканты не найдены</Text>
      )}
    </View>
  );
};

export default SearchContentMusician;
