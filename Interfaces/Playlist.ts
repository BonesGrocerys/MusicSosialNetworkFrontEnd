export interface IPlaylist {
  id: number;
  name: string;
  creator: string;
  creatorId: number;
  playlistImage: string;
}

export interface ICreatePlaylistRequest {
  name: string;
  personId: number;
  playlistImage: File;
}
