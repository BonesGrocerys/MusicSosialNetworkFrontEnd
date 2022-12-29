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
import { IMusicians } from "../Interfaces/Tracks";
import axios from "axios";
import { API_URL } from "./api";
import { IOperationResult } from "../Interfaces/OperationResult";
interface IContext {
  activeMiniPlayer: boolean;
  setActiveMiniPlayer: Dispatch<SetStateAction<boolean>>;
  songs: ITrack[];
  albums: IAlbum[];
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
  indexNow: number;
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
  getTracks: () => void;
  getAllTracks: () => void;
  tracks: ITrack[] | undefined;
  calculateSeekBar: any;
  setDuration: any;
  getAllTracksHome: () => void;
  tracksHome: ITrack[] | undefined;
  key: string;
  currentPlaylist: ITrack[];
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
  const [indexNow, setIndexNow] = useState<number | null>();
  const [nextTrack, setNextTrack] = useState<any>();
  // const [itemNow, setItemNow] = useState<any>();
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
      setTrackIndexNow(playbackStatus.playableDurationMillis);
      console.log(playbackStatus);

      // console.log(playbackStatus);

      // if (playbackStatus.didJustFinish === true) {
      //   await NextTrack();
      // }

      // console.log(playbackStatus.didJustFinish);
      // const status = playbackStatus.positionMillis;

      // console.log(status, " -status");
      // console.log(duration);

      // console.log(playbackStatus);
      // console.log(playbackDuration);
      // console.log(playbackPosition);
      // console.log(playbackDuration);
      // console.log(playbackStatus);
      // console.log(playbackDuration);
      // console.log(indexNow);

      // console.log(itemNow);

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

  const [currentPlaylist, setCurrentPlaylist] = useState<ITrack[]>();

  async function playSound(item: any, index: any) {
    setCurrentPlaylist(item);
    console.log(currentPlaylist);
    setIsLooping(false);
    if (item === undefined) return 0;
    if (item[index].url !== key) {
      // setFullDuration(0);
      // setDuration(0);
      // setPlaybackPositionNow(0);

      console.log(index, "-index");
      setSongsNow(item);
      setIndexNow(index);
      console.log(indexNow, "-indexNow");
      setKey(item[index].url);
      setActiveMiniPlayer(true);
      console.log("Loading Sound");
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const url = item[index].url;
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: false, progressUpdateIntervalMillis: 500 }
      );
      console.log(item[index].url);
      await sound.playFromPositionAsync(0);
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
    setIsLooping(false);
    await setDuration(0);
    setPlaybackPositionNow(0);
    setSound(null);
    setKey(-1);
    await playSound(songsNow, indexNow! + 1);
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
    await playSound(indexNow, songsNow);
    // await playSound(songsNow, itemNow, indexNow + 1);
    // }

    // console.log(indexNow, "NextTrack");
  }

  const PreviousTrack = async () => {
    if (playbackPositionNow > 5000) {
      await sound?.setPositionAsync(1);
    } else {
      setIsLooping(false);
      await setDuration(0);
      setPlaybackPositionNow(0);
      setSound(null);
      setKey(-1);
      playSound(songsNow, indexNow! - 1);
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
    // setItemNow(null);
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

  const albums: IAlbum[] = [
    {
      artist: "Shacys",
      atwork: "test",
      title: "testtimtle",
      id: 1,
      status: "Новинки",
      url: "url",
    },
    {
      artist: "Shacys",
      atwork: "test",
      title: "testtimtle",
      id: 2,
      status: "Новинки",
      url: "url",
    },
    {
      artist: "Shacys",
      atwork: "test",
      title: "testtimtle",
      id: 3,
      status: "Редакция",
      url: "url",
    },
    {
      artist: "Shacys",
      atwork: "test",
      title: "testtimtle",
      id: 4,
      status: "Редакция",
      url: "url",
    },
    {
      artist: "Shacys",
      atwork: "test",
      title: "testtimtle",
      id: 5,
      status: "Новинки",
      url: "url",
    },
  ];

  ///////////////////////////////////////////////
  // Запрос всех треков
  ///////////////////////////////////////////////

  // const [tracks, setTracks] = useState<ITrack[]>();

  // const getAllTracks = async () => {
  //   try {
  //     console.log("НАЧАЛО МЕТОДА");

  //     const { data } = await axios
  //       .get<IOperationResult<ITrack[]>>(`${API_URL}/Tracks/get-tracks`)
  //       .then((x) => {
  //         console.log(x);
  //         return x;
  //       });
  //     setTracks(data.result);
  //     console.log(data);
  //   } catch (e) {
  //     console.log("ОШИБКА");
  //     console.log(e);
  //   } finally {
  //   }
  // };

  ///////////////////////////////////////////////
  // Запрос моих треков для Home
  ///////////////////////////////////////////////
  // const [tracksHome, setTracksHome] = useState<any>();

  // const getAllTracksHome = async () => {
  //   try {
  //     console.log("НАЧАЛО МЕТОДА");

  //     const { data } = await axios
  //       .get<IOperationResult<ITrack[]>>(
  //         `${API_URL}/Tracks/get-all-added-tracks-person/1`
  //       )
  //       .then((x) => {
  //         console.log(x);
  //         return x;
  //       });
  //     setTracks(data.result);
  //     console.log(data);
  //   } catch (e) {
  //     console.log("ОШИБКА");
  //     console.log(e);
  //   } finally {
  //   }
  // };

  const [test, setTest] = useState<any>();
  const getTracks = async () => {
    try {
      console.log("НАЧАЛО МЕТОДА");

      const { data } = await axios

        .get<any>(`${API_URL}/Tracks/get-track-file/2.mp3`)

        .then((x) => {
          console.log(x);
          return x;
        });
      setTest(data);
      console.log(data);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
    } finally {
    }
  };

  const songs: ITrack[] = [
    {
      id: 1,
      title: "21:10",
      author: "SHPACKYOU$",
      atwork: require("../assets/image/NEMESIS_FINAL_2.jpg"),
      url: "http://192.168.0.105:5205/api/Tracks/get-track-file/4.mp3",
      musicians: [
        {
          id: 1,
          nickname: "SHPACKYOU$",
          email: "email@mail.ru",
        },
      ],
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
      // itemNow,
      // setItemNow,
      PreviousTrack,
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
      albums,
      getTracks,
      // getAllTracks,
      // tracks,
      calculateSeekBar,
      setDuration,
      // getAllTracksHome,
      // tracksHome,
      key,
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
      // itemNow,
      // setItemNow,
      PreviousTrack,
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
      albums,
      getTracks,
      // getAllTracks,
      // tracks,
      calculateSeekBar,
      setDuration,
      // getAllTracksHome,
      // tracksHome,
      key,
      currentPlaylist,
    ]
  );
  return (
    <MusicContext.Provider
      // value={value}
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
        // itemNow,
        // setItemNow,
        PreviousTrack,
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
        albums,
        getTracks,
        // getAllTracks,
        // tracks,
        calculateSeekBar,
        setDuration,
        // getAllTracksHome,
        // tracksHome,
        key,
        currentPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);

// export default MusicProvider;
