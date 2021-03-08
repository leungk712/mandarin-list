// ===== App Interfaces ===== //

export interface Example {
  id: number;
  sentence: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PostPayload {
  character: string;
  english: string;
  examples?: Example[];
  pinyin: string;
  starred: boolean;
  date: Date | string;
  user: string;
}

export interface RegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
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
  user: string;
}

export interface UserData {
  __v: number;
  _id: string;
  date: string;
  email: string;
  firstName: string;
  lastName: string;
}

// ===== Store Interfaces ===== //

export interface RootState {
  posts: PostState;
  user: UserState;
  categories: CategoriesState;
}

export interface CategoriesState {
  categoriesList: [];
  loadingState: string[];
  selectedCategory: null;
}

export interface UserState {
  accessToken: string;
  isLoggedIn: boolean;
  loadingState: string[];
  user: UserData | null;
}

export interface PostsState {
  loadingState: string[];
  mandarinList: SelectedCharacter[];
  selectedMandarin?: null | SelectedCharacter;
}
