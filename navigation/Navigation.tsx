import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import React, { FC } from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LibraryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={Library}></Stack.Screen>
      <Stack.Screen name="MyTracks" component={MyTracks}></Stack.Screen>
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
            component={Search}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="search1" color={color} size={30} />
              ),
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
