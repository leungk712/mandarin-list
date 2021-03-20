import {
  LoginPayload,
  RegisterPayload,
  RootState,
  UserData,
  UserState
} from "@/models";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";
import { avatarColors } from "@/helpers/avatar-colors";

function generateAvatarColor() {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}

export const userState = {
  accessToken: sessionStorage.getItem("access_token") || "",
  avatarColor: "",
  isLoggedIn: false,
  loadingState: [],
  user: null
};

export const userActions: ActionTree<UserState, RootState> = {
  handleAvatarColor: ({ commit }) => {
    commit("setAvatarColor", generateAvatarColor());
  },

  login: ({ commit, dispatch }, payload: LoginPayload) => {
    commit("addToLoadingState", "attemping to log in...");
    return axios
      .post(`${process.env.VUE_APP_API_HOST}/users/login`, payload)
      .then((resp: AxiosResponse) => {
        commit("setUser", resp.data.user);
        commit("setLoginSuccess", resp.data);
        dispatch("handleAvatarColor");
        dispatch("posts/getMandarinList", resp.data.user._id, { root: true });
        commit("removeFromLoadingState", "attemping to log in...");
      })
      .catch(err => {
        dispatch("alert/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "attempting to log in...");
        throw new Error(err);
      });
  },

  logout: ({ commit }) => {
    commit("setLogout");
  },

  register: ({ commit, dispatch }, payload: RegisterPayload) => {
    commit("addToLoadingState", "registering user...");
    return axios
      .post(`${process.env.VUE_APP_API_HOST}/users/register`, payload)
      .then(() => {
        dispatch(
          "alert/successStatus",
          "Successfully registered! You can now log in!",
          { root: true }
        );
        commit("removeFromLoadingState", "registering user...");
      })
      .catch(err => {
        dispatch("alert/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "registering user...");
        throw new Error(err);
      });
  }
};

export const userMutations: MutationTree<UserState> = {
  addToLoadingState: (state: UserState, message: string) => {
    state.loadingState.push(message);
  },
  removeFromLoadingState: (state: UserState, message: string) => {
    state.loadingState = state.loadingState.filter(
      loadMessages => loadMessages !== message
    );
  },
  setAvatarColor: (state: UserState, color: string) => {
    state.avatarColor = color;
  },
  setLoginSuccess: (state: UserState, resp) => {
    const bearerToken = `Bearer ${resp.token}`;
    state.accessToken = bearerToken;
    sessionStorage.setItem("access_token", bearerToken);
    state.isLoggedIn = true;
    axios.defaults.headers.common.Authorization = bearerToken;
  },
  setLogout: (state: UserState) => {
    state.accessToken = "";
    state.user = null;
    state.isLoggedIn = false;
    sessionStorage.removeItem("access_token");
    sessionStorage.clear();
    axios.defaults.headers.common.Authorization = null;
  },
  setUser: (state: UserState, user: UserData) => {
    state.user = user;
  }
};

export const userGetters: GetterTree<UserState, RootState> = {
  isAuthenticated: (state: UserState) => {
    return !!state.accessToken;
  }
};

export default {
  name: "user",
  namespaced: true,
  state: userState,
  actions: userActions,
  getters: userGetters,
  mutations: userMutations
};
