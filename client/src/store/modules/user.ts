import {
  LoginPayload,
  RegisterPayload,
  RootState,
  UserData,
  UserState
} from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const userState = {
    loadingState: [],
    user: null
};

export const userActions: ActionTree<UserState, RootState> = {
  login: ({ commit }, payload: LoginPayload) => {
    commit("addToLoadingState", "attemping to log in...");
    return axios.post(`${process.env.VUE_APP_API_HOST}/users/login`, payload)
      .then((resp: AxiosResponse) => {
        commit("setUser", resp.data.user);
        localStorage.setItem('token', resp.data.token);
        commit("removeFromLoadingState", "attemping to log in...");
      })
      .catch(err => {
        commit("removeFromLoadingState", "attempting to log in...");
        throw new Error(err);
      });
  },

  register: ({ commit }, payload: RegisterPayload) => {
    commit("addToLoadingState", "registering user...");
    return axios.post(`${process.env.VUE_APP_API_HOST}/users/register`, payload)
      .then((resp: AxiosResponse) => {
        commit("removeFromLoadingState", "registering user...");
      })
      .catch((err) => {
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
  setUser: (state: UserState, user: UserData) => {
    state.user = user;
  }
};

export default {
  name: "user",
  namespaced: true,
  state: userState,
  actions: userActions,
  mutations: userMutations
};
