export interface ITrack {
  title: string;
  author: string;
  atwork: string;
  url: string;
  id: number;
  musicians: IMusicians[];
}

export interface IMusicians {
  id: number;
  nickname: string;
  email: string;
}
