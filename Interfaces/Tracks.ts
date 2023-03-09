export interface ITracks {
  title: string;
  author: string;
  atwork: string;
  url: string;
  id: number;
  cover: string;
  musicians: IMusicians[];
}
interface ITrack {
  [index: number]: ITrack;
}

export interface IMusicians {
  id: number;
  nickname: string;
  email: string;
}
