import { PostsState, PostPayload, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const postState: PostsState = {
  loadingState: [],
  mandarinList: [],
  selectedMandarin: {}
};

export const postActions: ActionTree<PostsState, RootState> = {
  getMandarinList: ({ commit }) => {
    commit("addToLoadingState", "retrieving list of mandarin characters...");
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/api/posts`)
      .then((resp: AxiosResponse) => {
        commit("setMandarinList", resp.data);
        commit(
          "removeFromLoadingState",
          "retrieving list of mandarin characters..."
        );
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  getIndividualCharacter: ({ commit }, characterId) => {
    commit("addToLoadingState", "retrieving mandarin character...");
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/api/posts/${characterId}`)
      .then((resp: AxiosResponse) => {
        commit("setSelectedMandarin", resp.data);
        commit("removeFromLoadingState", "retrieving mandarin character...");
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  submitMandarinCharacter: ({ commit, dispatch }, payload) => {
    commit("addToLoadingState", "submitting mandarin character...");
    return axios
      .post(`${process.env.VUE_APP_API_HOST}/api/posts`, payload)
      .then(() => {
        dispatch("getMandarinList");
        commit("removeFromLoadingState", "submitting mandarin character...");
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  updateMandarinCharacter: ({ commit, dispatch }, payload) => {
    commit("addToLoadingState", "updating mandarin character...");
    return axios
      .put(`${process.env.VUE_APP_API_HOST}/api/posts/${payload._id}`, payload)
      .then(() => {
        console.log("update payload", payload);
        commit("removeFromLoadingState", "updating mandarin character...");
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  deleteMandarinCharacter: ({ commit, dispatch }, id) => {
    commit("addToLoadingState", "deleting mandarin character...");
    return axios
      .delete(`${process.env.VUE_APP_API_HOST}/api/posts/${id}`)
      .then(() => {
        dispatch("getMandarinList");
        commit("removeFromLoadingState", "deleting mandarin character...");
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  clearSelectedMandarin: ({ commit }) => {
    commit("resetSelectedMandarin");
  }
};

export const postMutations: MutationTree<PostsState> = {
  addToLoadingState: (state: PostsState, message: string) => {
    state.loadingState.push(message);
  },
  removeFromLoadingState: (state: PostsState, message: string) => {
    state.loadingState = state.loadingState.filter(
      loadMessages => loadMessages !== message
    );
  },
  resetSelectedMandarin: state => {
    state.selectedMandarin = {};
  },
  setMandarinList: (state, list) => {
    state.mandarinList = list;
  },
  setSelectedMandarin: (state, character: PostPayload) => {
    state.selectedMandarin = character;
  }
};

export default {
  name: "posts",
  namespaced: true,
  state: postState,
  actions: postActions,
  mutations: postMutations
};
