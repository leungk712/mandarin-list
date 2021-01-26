// ===== App Interfaces ===== //

export interface PostPayload {
  character: string;
  english: string;
  examples?: Example[];
  pinyin: string;
  starred: boolean;
  date: Date;
}

export interface SelectedCharacter {
  __v: number;
  _id: string;
  character: string;
  createdAt: string;
  date: string;
  english: string;
  examples: Example[];
  pinyin: string;
  starred: boolean;
  updatedAt: string;
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
  loadingState: string[];
  mandarinList: [];
  selectedMandarin: {};
}
