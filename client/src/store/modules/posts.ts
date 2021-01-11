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
        throw err;
      });
  },

  getIndividualExample: ({ commit }, id) => {
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/api/posts/${id}`)
      .then((resp: AxiosResponse) => {
        console.log(id);
      })
      .catch(err => {
        console.log(err);
      })
  },

  submitMandarinExample: ({ dispatch }, payload) => {
    return axios
      .post(`${process.env.VUE_APP_API_HOST}/api/posts`, payload)
      .then((resp: AxiosResponse) => {
        dispatch("getMandarinList");
      })
      .catch(err => {
        throw err;
      });
  },

  updateMandarinExample: ({ dispatch }, payload) => {
    return axios
      .put(`${process.env.VUE_APP_API_HOST}/api/posts/${payload._id}`, payload)
      .then((resp: AxiosResponse) => {
        console.log("update payload", payload);
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteMandarinExample: ({ dispatch }, id) => {
    return axios
      .delete(`${process.env.VUE_APP_API_HOST}/api/posts/${id}`)
      .then(() => {
        dispatch("getMandarinList");
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
