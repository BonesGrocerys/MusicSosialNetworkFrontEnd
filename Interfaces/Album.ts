import { IMusicians, ITrack } from "./Tracks";

export interface IAlbum {
  id: number;
  albumTitle: string;
  status: string;
  genreId: number;
  genreTitle: string;
  auditionsCount: number;
  cover: string;
  musicians: IMusicians[];
  tracks: ITrack[];
}
