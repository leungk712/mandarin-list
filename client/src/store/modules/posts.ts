import { PostsState, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const postState: PostsState = {
  mandarinList: []
};

export const postActions: ActionTree<PostsState, RootState> = {
  getMandarinList: ({ commit }) => {
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/api/posts`)
      .then((resp: AxiosResponse) => {
        commit("setMandarinList", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const postMutations: MutationTree<PostsState> = {
  setMandarinList: (state, list) => {
    state.mandarinList = list;
  }
};

export default {
  name: "posts",
  namespaced: true,
  state: postState,
  actions: postActions,
  mutations: postMutations
};
