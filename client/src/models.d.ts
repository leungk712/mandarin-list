// ===== App Interfaces ===== //

export interface PostPayload {
  character: string;
  pinyin: string;
  english: string;
  examples?: [];
  starred?: boolean;
}

// ===== Store Interfaces ===== //

export interface RootState {
  posts: PostState;
}

export interface PostsState {
  mandarinList: [];
}
