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
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./AuthProvider";

interface IContext {
  activeMiniPlayer: boolean;
  setActiveMiniPlayer: Dispatch<SetStateAction<boolean>>;
  albums: IAlbum[];
  sound: any;
  setSound: any;
  playSound: any;
  playingStatus: string;
  stopPlaying: any;
  duration: any;
  PlayPause: any;
  ModalizeRef: any;
  NextTrack: any;
  trackPlayNow: any;
  songsNow: ITrack | null | undefined;
  setSongsNow: React.Dispatch<React.SetStateAction<ITrack | null | undefined>>;
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
  currentPlaylist: ITrack[] | undefined;
  infinityTracksStatus: boolean;
  getRandomTrack: any;
  infinityTracks: any;
  setKey: any;
  setInfinityTracks: any;
  setInfinityTracksStatus: React.Dispatch<React.SetStateAction<boolean>>;
  ListenTrack: any;
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
  const ModalizeRef = useRef<any>(null);
  const [trackPlayNow, setTrackPlayNow] = useState<any>();
  const [songsNow, setSongsNow] = useState<ITrack | null>();
  const [indexNow, setIndexNow] = useState<number | null>();
  const [nextTrack, setNextTrack] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [trackIndexNow, setTrackIndexNow] = useState<any>();
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [infinityTracksStatus, setInfinityTracksStatus] =
    useState<boolean>(false);
  const [infinityTracks, setInfinityTracks] = useState<any>();
  const calculateSeekBar = (
    playbackPosition: number,
    playbackDuration: number
  ) => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  const { user } = useAuth();

  const ListenTrack = async (item: ITrack, index: number) => {
    try {
      console.log("ПРОСЛУШИВАНИЕ ТРЕКА");
      console.log("ТРЕК", item?.[index]?.id);
      console.log("ПОЛЬЗОВАТЕЛЬ", user?.id);
      const { data } = await axios
        .post(
          `${API_URL}/Tracks/listen-track?trackId=${item?.[index]?.id}&personId=${user?.id}`
        )
        .then((x) => {
          console.log(x);
          return x;
        });
      console.log("Успешно");
      console.log(data);
      // console.log(token);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
      // console.log(`Bearer ${token}`);
    } finally {
    }
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
      console.log(index, "-index");
      setSongsNow(item);
      setIndexNow(index);
      console.log(indexNow, "-indexNow");
      setKey(item[index].url);
      setActiveMiniPlayer(true);
      console.log("Loading Sound");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

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
      ListenTrack(item, index);
      return sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate);
    } else {
      ModalizeRef.current?.open();
    }
  }

  async function NextTrack() {
    if (infinityTracksStatus === true) {
      console.log(infinityTracksStatus, "NEXT TRACK");

      await getRandomTrack(), setKey(-1);
      await playSound(infinityTracks, 0);
    } else {
      setIsLooping(false);
      await setDuration(0);
      setPlaybackPositionNow(0);
      setSound(null);
      setKey(-1);
      await playSound(songsNow, indexNow! + 1);
    }
  }

  async function LoopingTrack() {
    setPlaybackPositionNow(0);
    setSound(null);
    setKey(-1);
    await playSound(indexNow, songsNow);
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
    setInfinityTracksStatus(false);
    console.log(infinityTracksStatus, "INFINITY STOP");
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

  const getRandomTrack = async () => {
    try {
      // console.log("GET RANDOM TRACKS//////////////");

      const { data } = await axios
        .get<IOperationResult<ITrack[]>>(`${API_URL}/Tracks/get-random-track`, {
          // headers: {
          //   Authorization: `Bearer  ${token}`,
          // },
        })
        .then((x) => {
          console.log(x);
          return x;
        });
      setInfinityTracks(data.result);
      // setTracks(data.result);
      console.log("data", infinityTracks);
      // console.log(token);
    } catch (e) {
      console.log("ОШИБКА");
      console.log(e);
      // console.log(`Bearer ${token}`);
    } finally {
    }
  };

  const value = useMemo(
    () => ({
      activeMiniPlayer,
      setActiveMiniPlayer,
      playSound,
      sound,
      setSound,
      playingStatus,
      stopPlaying,
      duration,
      PlayPause,
      ModalizeRef,
      NextTrack,
      trackPlayNow,
      songsNow,
      setSongsNow,
      indexNow,
      setIndexNow,
      nextTrack,
      setNextTrack,
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
      calculateSeekBar,
      setDuration,
      key,
      infinityTracksStatus,
      getRandomTrack,
      infinityTracks,
      setKey,
      setInfinityTracks,
      setInfinityTracksStatus,
      currentPlaylist,
      ListenTrack,
    }),
    [
      activeMiniPlayer,
      setActiveMiniPlayer,
      playSound,
      sound,
      setSound,
      playingStatus,
      stopPlaying,
      duration,
      PlayPause,
      ModalizeRef,
      NextTrack,
      trackPlayNow,
      songsNow,
      setSongsNow,
      indexNow,
      setIndexNow,
      nextTrack,
      setNextTrack,
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
      indexNow,
      calculateSeekBar,
      setDuration,
      key,
      currentPlaylist,
      infinityTracksStatus,
      getRandomTrack,
      infinityTracks,
      setKey,
      setInfinityTracks,
      setInfinityTracksStatus,
      ListenTrack,
    ]
  );
  return (
    <MusicContext.Provider
      value={{
        activeMiniPlayer,
        setActiveMiniPlayer,
        playSound,
        sound,
        setSound,
        playingStatus,
        stopPlaying,
        duration,
        PlayPause,
        ModalizeRef,
        NextTrack,
        trackPlayNow,
        songsNow,
        setSongsNow,
        indexNow,
        setIndexNow,
        nextTrack,
        setNextTrack,
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
        calculateSeekBar,
        setDuration,
        key,
        infinityTracksStatus,
        getRandomTrack,
        infinityTracks,
        setKey,
        setInfinityTracks,
        setInfinityTracksStatus,
        currentPlaylist,
        ListenTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);

// export default MusicProvider;
