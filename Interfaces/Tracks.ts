export interface ITrack {
  title: string;
  author: string;
  atwork: string;
  url: string;
  id: number;
  cover: string;
  auditionsCount: number;
  musicians: IMusicians[];
  [index: number]: ITrack;
}

export interface IMusicians {
  id: number;
  nickname: string;
  email: string;
  musicianCover: string;
  monthlyListeners: number;
}
