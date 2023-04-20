import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import React, { FC } from "react";
import {
  NavigationContainer,
  TabActions,
  useNavigationContainerRef,
} from "@react-navigation/native";
import MusicPlayer from "../components/screens/musicPlayer/MusicPlayer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/screens/home/Home";
import Library from "../components/screens/library/Library";
import Search from "../components/screens/Search";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PlayerMenuBottom from "../components/screens/musicPlayer/PlayerMenuBottom";
import MyTracks from "../components/screens/library/myTracks/MyTracks";
import { useAuth } from "../providers/AuthProvider";
import Auth from "../components/screens/Auth/Auth";
import MusicianPage from "../components/screens/musicians/MusicianPage";
import PlayerModal from "../components/screens/musicPlayer/PlayerModal";
import MiniPlayer from "../components/screens/musicPlayer/MiniPlayer";
import MyAlbums from "../components/album/MyAlbums";
import MusicianAlbumPage from "../components/screens/musicians/MusicianAlbumPage";
import AlbumPage from "../components/album/AlbumPage";
import MusicianTracksPage from "../components/screens/musicians/MusicianTracksPage";
import Profile from "../components/screens/library/Profile/Profile";
import SearchTracks from "../components/screens/Track/SearchTracks";
import SearchMusician from "../components/screens/musicians/SearchMusician";
import SearchAlbum from "../components/album/SearchAlbum";
import AddTrackInPlaylist from "../components/screens/Track/AddTrackInPlaylist";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const LibraryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={Library}
        options={{ title: "Моя библиотека" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MyTracks"
        component={MyTracks}
        options={{ title: "Мои треки" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MusicianPage"
        component={MusicianPage}
        options={{ title: "Музыкант" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MyAlbums"
        component={MyAlbums}
        options={{ title: "Мои альбомы" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MusicianAlbumPage"
        component={MusicianAlbumPage}
        options={{ title: "Альбомы музыканта" }}
      ></Stack.Screen>
      <Stack.Screen
        name="AlbumPage"
        component={AlbumPage}
        options={{ title: "Альбом" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MusicianTracksPage"
        component={MusicianTracksPage}
        options={{ title: "Треки музыканта" }}
      ></Stack.Screen>
      <Stack.Screen
        name="PlayerMenuBottom"
        component={PlayerMenuBottom}
      ></Stack.Screen>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Мой профиль" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search}></Stack.Screen>
      <Stack.Screen
        name="MusicianPage"
        component={MusicianPage}
        options={{ title: "Музыкант" }}
      ></Stack.Screen>
      <Stack.Screen
        name="SearchTracks"
        component={SearchTracks}
        options={{ title: "Треки по запросу" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MusicianAlbumPage"
        component={MusicianAlbumPage}
        options={{ title: "Альбомы музыканта" }}
      ></Stack.Screen>
      <Stack.Screen
        name="AlbumPage"
        component={AlbumPage}
        options={{ title: "Альбом" }}
      ></Stack.Screen>
      <Stack.Screen
        name="MusicianTracksPage"
        component={MusicianTracksPage}
        options={{ title: "Треки музыканта" }}
      ></Stack.Screen>
      <Stack.Screen
        name="SearchMusician"
        component={SearchMusician}
        options={{ title: "Музыканты по запросу" }}
      ></Stack.Screen>
      <Stack.Screen
        name="SearchAlbum"
        component={SearchAlbum}
        options={{ title: "Альбомы по запросу" }}
      ></Stack.Screen>
      <Stack.Screen
        name="AddTrackInPlaylist"
        component={AddTrackInPlaylist}
        options={{ title: "Ваши плейлисты" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const Navigation: FC = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              height: "10%",
              paddingTop: 10,
              backgroundColor: "rgb(0,0,0)",
            },
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 10,
              marginBottom: 5,
              paddingBottom: 5,
            },
            tabBarActiveTintColor: "white",
            // headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-sharp" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="search1" color={color} size={30} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Library"
            component={LibraryStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="track-changes" color={color} size={30} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      ) : (
        <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
