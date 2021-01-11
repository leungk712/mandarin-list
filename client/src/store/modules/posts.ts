import { PostState, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const postState: PostState = {
  mandarin: false
};

export const postActions: ActionTree<PostState, RootState> = {
  getMandarinList: ({ commit, dispatch }, payload) => {
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/api/posts`)
      .then((resp: AxiosResponse) => {
        console.log("response", resp);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const postMutations: MutationTree<PostState> = {};

export default {
  name: "posts",
  namespaced: true,
  state: postState,
  actions: postActions,
  mutations: postMutations
};
