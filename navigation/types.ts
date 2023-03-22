import { IAlbum } from "../Interfaces/Album";
import { IMusicians } from "../Interfaces/Tracks";

export type TypeRootStackParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  MyTracks: undefined;
  Auth: undefined;
  PlayerMenuBottom: undefined;
  PlayerModal: undefined;
  MusicPlayer: undefined;
  MusicianPage: IMusicians;
  MyAlbums: any;
  MusicianAlbumPage: any;
  AlbumPage: IAlbum;
  MusicianTracksPage: any;
  Profile: any;
};
