// ===== App Interfaces ===== //

export interface PostPayload {
  character: string;
  english: string;
  examples?: Example[];
  pinyin: string;
  starred: boolean;
  date: Date | string;
}

export interface SelectedCharacter {
  __v: number;
  _id: string;
  character: string;
  createdAt: Date | string;
  date: Date | string;
  english: string;
  examples: Example[];
  pinyin: string;
  starred: boolean;
  updatedAt: Date | string;
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
  mandarinList: SelectedCharacter[];
  selectedMandarin?: null | SelectedCharacter;
}
