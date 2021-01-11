// ===== App Interfaces ===== //

export interface PostPayload {
  character: string;
  pinyin: string;
  english: string;
  examples?: Example[];
  starred?: boolean;
  date: Date;
}

export interface Example {
  id: number;
  sentence: string;
}

// ===== Store Interfaces ===== //

export interface RootState {
  posts: PostState;
}

export interface PostsState {
  mandarinList: [];
}
