import { IUser } from './IUser';

export class IMusic {
  musicId?: string;
  musicName: string;
  musicUrl: string;
  musicPosterUrl: string;
  musicArtist: string;
  musicAlbum: string;
  like?: {
    id: string;
    likedUser: IUser[];
    noOfLike: number;
  };
}
