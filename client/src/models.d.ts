// ===== App Interfaces ===== //

export interface Category {
  __v?: number;
  _id?: string;
  createdAt?: string;
  name?: string;
  updatedAt?: string;
  user?: string;
}

export interface CategoryPayload {
  name: string;
  user: string;
}

export interface Example {
  id: number;
  sentence: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PostPayload {
  categories: Category[];
  character: string;
  english: string;
  examples?: Example[];
  pinyin: string;
  starred: boolean;
  date: Date | string;
  user?: string;
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
  categories: Category[];
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

export interface Stories {
  __v: number;
  _id: string;
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  user: string;
}

export interface StoryPayload {
  title: string;
  content: string;
  user?: string;
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
  categories: CategoriesState;
  posts: PostState;
  stories: StoriesState;
  user: UserState;
}

export interface CategoriesState {
  categoriesList: Category[];
  loadingState: string[];
  selectedCategory: null;
}

export interface PostsState {
  loadingState: string[];
  mandarinList: SelectedCharacter[];
  selectedMandarin?: null | SelectedCharacter;
}

export interface StoriesState {
  storiesList: Stories[];
  loadingState: string[];
  selectedStory: null;
}

export interface UserState {
  accessToken: string;
  avatarColor: string;
  isLoggedIn: boolean;
  loadingState: string[];
  user: UserData | null;
}
