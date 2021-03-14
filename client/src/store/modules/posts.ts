import { PostsState, SelectedCharacter, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const postState: PostsState = {
  loadingState: [],
  mandarinList: [],
  selectedMandarin: null
};

export const postActions: ActionTree<PostsState, RootState> = {
  getMandarinList: ({ commit, dispatch }, userId) => {
    commit("addToLoadingState", "retrieving list of mandarin characters...");
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/posts/${userId}`)
      .then((resp: AxiosResponse) => {
        commit("setMandarinList", resp.data);
        commit("removeFromLoadingState", "retrieving list of mandarin characters...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err, { root: true });
        commit("removeFromLoadingState", "retrieving list of mandarin characters...");
        throw new Error(err);
      });
  },

  getIndividualCharacter: ({ commit, dispatch }, payload) => {
    commit("addToLoadingState", "retrieving mandarin character...");
    return axios
      .get(
        `${process.env.VUE_APP_API_HOST}/posts/${payload.userId}/post/${payload._id}`
      )
      .then((resp: AxiosResponse) => {
        commit("setSelectedMandarin", resp.data);
        commit("removeFromLoadingState", "retrieving mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err, { root: true });
        commit("removeFromLoadingState", "retrieving mandarin character...");
        throw new Error(err);
      });
  },

  submitMandarinCharacter: ({ commit, dispatch }, payload) => {
    commit("addToLoadingState", "submitting mandarin character...");
    return axios
      .post(`${process.env.VUE_APP_API_HOST}/posts/${payload.user}`, payload)
      .then(() => {
        dispatch("getMandarinList", payload.user);
        dispatch("snackbar/successStatus", "Successfully created a new character!", { root: true });
        commit("removeFromLoadingState", "submitting mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err, { root: true });
        commit("removeFromLoadingState", "submitting mandarin character...");
        throw new Error(err);
      });
  },

  updateMandarinCharacter: ({ commit, dispatch }, payload) => {
    commit("addToLoadingState", "updating mandarin character...");
    return axios
      .put(
        `${process.env.VUE_APP_API_HOST}/posts/${payload.user}/post/${payload._id}`,
        payload
      )
      .then(() => {
        dispatch("getMandarinList", payload.user);
        dispatch("snackbar/successStatus", "Successfully updated character!", { root: true });
        commit("removeFromLoadingState", "updating mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err, { root: true });
        commit("removeFromLoadingState", "updating mandarin character...");
        throw new Error(err);
      });
  },

  deleteMandarinCharacter: ({ commit, dispatch }, payload) => {
    commit("addToLoadingState", "deleting mandarin character...");
    return axios
      .delete(
        `${process.env.VUE_APP_API_HOST}/posts/${payload.user}/post/${payload._id}`
      )
      .then(() => {
        dispatch("getMandarinList", payload.user);
        dispatch("snackbar/successStatus", "Successfully deleted character!", { root: true });
        commit("removeFromLoadingState", "deleting mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err, { root: true });
        commit("removeFromLoadingState", "deleting mandarin character...");
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
    state.selectedMandarin = null;
  },
  setMandarinList: (state, list) => {
    state.mandarinList = list;
  },
  setSelectedMandarin: (state, character: SelectedCharacter) => {
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
