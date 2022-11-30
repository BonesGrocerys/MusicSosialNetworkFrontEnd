import { View, Text } from "react-native";
import { Audio } from "expo-av";
import React, {
  FC,
  useState,
  useContext,
  createContext,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { ITrack } from "../Interfaces/Tracks";
import { IAlbum } from "../Interfaces/Album";
import { Modalize } from "react-native-modalize";
interface IContext {
  activeMiniPlayer: boolean;
  setActiveMiniPlayer: Dispatch<SetStateAction<boolean>>;
  songs: ITrack[];
  album: IAlbum[];
  sound: any;
  setSound: any;
  playSound: any;
  playingStatus: string;
  stopPlaying: any;
  duration: any;
  PlayPause: any;
  // onOpen: any;
  ModalizeRef: any;
  NextTrack: any;
  trackPlayNow: any;
  songsNow: any;
  setSongsNow: any;
  indexNow: any;
  setIndexNow: any;
  nextTrack: any;
  setNextTrack: any;
  itemNow: any;
  setItemNow: any;
  PreviousTrack: any;
  fullDuration: any;
  setFullDuration: any;
  convertTime: any;
  RenderCurrentTime: any;
  setCurrentPosition: number;
  setPlayingStatus: any;
  trackIndexNow: any;
  setTrackIndexNow: any;
  playbackPositionNow: any;
  OnPlaybackStatusUpdate: any;
  setPlaybackPositionNow: any;
  isLooping: boolean;
  setIsLooping: Dispatch<SetStateAction<boolean>>;
}

type Props = { children: ReactNode };

export const MusicContext = createContext<IContext>({} as IContext);

export const MusicProvider: FC<Props> = ({ children }) => {
  const [activeMiniPlayer, setActiveMiniPlayer] = useState(false);
  const [playingStatus, setPlayingStatus] = useState("nosound");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState<any>();
  const [fullDuration, setFullDuration] = useState<any>();
  const [playbackPositionNow, setPlaybackPositionNow] = useState<any>();
  const [key, setKey] = useState<any>("null");
  const ModalizeRef = useRef(null);
  const [trackPlayNow, setTrackPlayNow] = useState<any>();
  const [songsNow, setSongsNow] = useState<any>();
  const [indexNow, setIndexNow] = useState<any>();
  const [nextTrack, setNextTrack] = useState<any>();
  const [itemNow, setItemNow] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [trackIndexNow, setTrackIndexNow] = useState<any>();
  const [isLooping, setIsLooping] = useState<boolean>(false);

  const calculateSeekBar = (
    playbackPosition: number,
    playbackDuration: number
  ) => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  async function OnPlaybackStatusUpdate(playbackStatus: any) {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      const playbackPosition = playbackStatus.positionMillis;
      const playbackDuration = playbackStatus.durationMillis;
      setDuration(playbackPosition / playbackDuration);
      setFullDuration(playbackDuration);
      setPlaybackPositionNow(playbackPosition);
      setTrackIndexNow(playbackStatus);
      console.log(playbackStatus.didJustFinish);
      const status = playbackStatus.positionMillis;

      console.log(status, " -status");

      // console.log(playbackStatus);
      // console.log(playbackDuration);
      // console.log(playbackPosition);
      // console.log(playbackDuration);
      // console.log(playbackStatus);
      // console.log(playbackDuration);
      // console.log(indexNow);

      // console.log(itemNow);
      // if (playbackStatus.didJustFinish === true) {
      //   await NextTrack();
      // if (isLooping === true) {
      //   if (fullDuration - 100 < playbackPositionNow) {
      //     setFullDuration(101);
      //     LoopingTrack();
      //   }
      // }
    }
  }

  const RenderCurrentTime = () => {
    return convertTime(playbackPositionNow / 1000);
  };

  async function playSound(index: number) {
    if (songs[index].url !== key) {
      setDuration(0);
      setPlaybackPositionNow(0);
      console.log(index, "-index");
      setSongsNow(songs);
      setIndexNow(index);
      console.log(indexNow, "-indexNow");
      setKey(songs[index].url);
      setActiveMiniPlayer(true);
      console.log("Loading Sound");
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      // // const { sound } = await Audio.Sound.createAsync(
      const sound = new Audio.Sound();
      const url = songs[index].url;
      console.log(songs[index].url);
      await sound.loadAsync({ uri: url }, { shouldPlay: true });
      setSound(sound);
      setPlayingStatus("playing");
      console.log("Playing Sound");
      return sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate);
    } else {
      ModalizeRef.current?.open();
    }
  }

  async function NextTrack() {
    // if (songsNow[indexNow + 1].url === undefined) {
    //   setDuration(0);
    //   setSound(null);
    //   setKey(-1);
    //   await playSound(songsNow, itemNow, indexNow + 1);
    // } else {
    // setIndexNow(0);
    setPlaybackPositionNow(0);
    setSound(null);
    setKey(-1);
    await playSound(indexNow + 1);
    // await playSound(songsNow, itemNow, indexNow + 1);
    // }

    // console.log(indexNow, "NextTrack");
  }

  async function LoopingTrack() {
    // if (songsNow[indexNow + 1].url === undefined) {
    //   setDuration(0);
    //   setSound(null);
    //   setKey(-1);
    //   await playSound(songsNow, itemNow, indexNow + 1);
    // } else {
    // setIndexNow(0);
    setPlaybackPositionNow(0);
    setSound(null);
    setKey(-1);
    await playSound(indexNow);
    // await playSound(songsNow, itemNow, indexNow + 1);
    // }

    // console.log(indexNow, "NextTrack");
  }

  const PreviousTrack = () => {
    if (playbackPositionNow > 5000) {
      sound?.setPositionAsync(0);
    } else {
      setPlaybackPositionNow(0);
      setSound(null);
      setKey(-1);
      playSound(indexNow - 1);
    }
  };

  async function PlayPause() {
    if (sound !== null) {
      if (playingStatus === "playing") {
        const status = trackIndexNow;

        await sound.pauseAsync();
        console.log("Pausing");
        setPlayingStatus("pausing");
      } else {
        setPlayingStatus("playing");
        console.log("playing");
        await sound.playAsync();
        // sound.set;
      }
    }
  }

  const stopPlaying = () => {
    setSound(null);
    setKey(-1);
    setPlayingStatus("nosound");
    setActiveMiniPlayer(false);
    setIndexNow(null);
    setSongsNow(null);
    setItemNow(null);
  };

  useEffect(() => {
    console.log("ИНДЕКС", indexNow);
  }, [indexNow]);

  const convertTime = (minutes: number) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split(".")[0];
      const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);
      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (sec == 60) {
        return `${minute + 1}:00`;
      }

      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }

      if (sec < 10) {
        return `${minute}:0${sec}`;
      }

      return `${minute}:${sec}`;
    }
  };

  const songs: ITrack[] = [
    {
      title: "21:10",
      artist: "SHPACKYOU$",
      atwork: require("../assets/image/eternal_doom_final.jpg"),
      url: "https://www.mboxdrive.com/62.mp3",
      id: 1,
    },
    {
      title: "21:12",
      artist: "123213$",
      atwork: require("../assets/image/Anemone.jpg"),
      url: "https://www.mboxdrive.com/72.mp3",
      id: 2,
    },
    {
      title: "Lower World",
      artist: "SECAMMORY",
      atwork: require("../assets/image/LOWER_WORLD.jpg"),
      url: "https://www.mboxdrive.com/57.mp3",
      id: 3,
    },
    {
      title: "NEMESIS",
      artist: "SHPACKYOU$",
      atwork: require("../assets/image/NEMESIS_FINAL_2.jpg"),
      url: "https://www.mboxdrive.com/82p.mp3",
      id: 4,
    },
  ];

  const album: IAlbum[] = [
    {
      title: "3-ETERNAL",
      artist: "KUTE",
      atwork: require("../assets/image/NEMESIS_FINAL_2.jpg"),
      url: "https://www.mboxdrive.com/45.mp3",
      id: 3,
    },
  ];

  const value = useMemo(
    () => ({
      activeMiniPlayer,
      setActiveMiniPlayer,
      songs,
      playSound,
      sound,
      setSound,
      playingStatus,
      stopPlaying,
      duration,
      PlayPause,
      // onOpen,
      ModalizeRef,
      NextTrack,
      trackPlayNow,
      songsNow,
      setSongsNow,
      indexNow,
      setIndexNow,
      nextTrack,
      setNextTrack,
      itemNow,
      setItemNow,
      PreviousTrack,
      album,
      fullDuration,
      setFullDuration,
      convertTime,
      RenderCurrentTime,
      setCurrentPosition,
      setPlayingStatus,
      trackIndexNow,
      OnPlaybackStatusUpdate,
      setPlaybackPositionNow,
      isLooping,
      setIsLooping,
    }),
    [
      activeMiniPlayer,
      setActiveMiniPlayer,
      songs,
      playSound,
      sound,
      setSound,
      playingStatus,
      stopPlaying,
      duration,
      PlayPause,
      // onOpen,
      ModalizeRef,
      NextTrack,
      trackPlayNow,
      songsNow,
      setSongsNow,
      indexNow,
      setIndexNow,
      nextTrack,
      setNextTrack,
      itemNow,
      setItemNow,
      PreviousTrack,
      album,
      fullDuration,
      setFullDuration,
      convertTime,
      RenderCurrentTime,
      setCurrentPosition,
      setPlayingStatus,
      playbackPositionNow,
      trackIndexNow,
      OnPlaybackStatusUpdate,
      setPlaybackPositionNow,
      isLooping,
      setIsLooping,
    ]
  );
  return (
    <MusicContext.Provider
      value={{
        activeMiniPlayer,
        setActiveMiniPlayer,
        songs,
        playSound,
        sound,
        setSound,
        playingStatus,
        stopPlaying,
        duration,
        PlayPause,
        // onOpen,
        ModalizeRef,
        NextTrack,
        trackPlayNow,
        songsNow,
        setSongsNow,
        indexNow,
        setIndexNow,
        nextTrack,
        setNextTrack,
        itemNow,
        setItemNow,
        PreviousTrack,
        album,
        fullDuration,
        setFullDuration,
        convertTime,
        RenderCurrentTime,
        setPlayingStatus,
        playbackPositionNow,
        trackIndexNow,
        OnPlaybackStatusUpdate,
        setPlaybackPositionNow,
        isLooping,
        setIsLooping,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);

// export default MusicProvider;
