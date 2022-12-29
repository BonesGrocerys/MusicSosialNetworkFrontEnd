import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import MusicPlayer from "./components/screens/musicPlayer/MusicPlayer";
import Navigation from "./navigation/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MiniPlayer from "./components/screens/musicPlayer/MiniPlayer";
import { useState, useEffect } from "react";
import PlayerMenuBottom from "./components/screens/musicPlayer/PlayerMenuBottom";
import PlayerModal from "./components/screens/musicPlayer/PlayerModal";
import { useMusic, MusicProvider } from "./providers/MusicProvider";
import { AuthProvider } from "./providers/AuthProvider";

export default function App() {
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <AuthProvider>
        <MusicProvider>
          <Navigation />

          <PlayerMenuBottom />
        </MusicProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
});
