import { PostsState, SelectedCharacter, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const postState: PostsState = {
  loadingState: [],
  mandarinList: [],
  selectedMandarin: null,
  selectedMandarinExamples: []
};

export const postActions: ActionTree<PostsState, RootState> = {
  getMandarinList: ({ commit, dispatch }, userId) => {
    commit("addToLoadingState", "retrieving list of mandarin characters...");
    return axios
      .get(`${process.env.VUE_APP_API_HOST}/posts/${userId}`)
      .then((resp: AxiosResponse) => {
        commit("setMandarinList", resp.data.posts);
        commit(
          "removeFromLoadingState",
          "retrieving list of mandarin characters..."
        );
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit(
          "removeFromLoadingState",
          "retrieving list of mandarin characters..."
        );
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
        commit("setSelectedMandarin", resp.data.post);
        commit("setSelectedMandarinExamples", resp.data.post.examples);
        commit("removeFromLoadingState", "retrieving mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
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
        dispatch(
          "snackbar/successStatus",
          "Successfully created a new character!",
          { root: true }
        );
        commit("removeFromLoadingState", "submitting mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
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
        dispatch("snackbar/successStatus", "Successfully updated character!", {
          root: true
        });
        commit("removeFromLoadingState", "updating mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
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
        dispatch("snackbar/successStatus", "Successfully deleted character!", {
          root: true
        });
        commit("removeFromLoadingState", "deleting mandarin character...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "deleting mandarin character...");
        throw new Error(err);
      });
  },
  handleAddMandarinExample: ({ commit }) => {
    commit("createMandarinExample");
  },
  handleDeleteMandarinExample: ({ commit }, id: number) => {
    commit("deleteMandarinExample", id);
  },
  handleResetPostsState: ({ commit }) => {
    commit("resetPostsState");
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
  createMandarinExample: (state: PostsState) => {
    const example = {
      id: Math.floor(Math.random() * 1000),
      sentence: ""
    };
    state.selectedMandarinExamples.push(example);
  },
  deleteMandarinExample: (state: PostsState, id: number) => {
    state.selectedMandarinExamples = state.selectedMandarinExamples.filter(examples => examples.id !== id);
  },
  resetSelectedMandarin: (state: PostsState) => {
    state.selectedMandarin = null;
    state.selectedMandarinExamples = [];
  },
  setMandarinList: (state: PostsState, list) => {
    state.mandarinList = list;
  },
  setSelectedMandarin: (state: PostsState, character: SelectedCharacter) => {
    state.selectedMandarin = character;
  },
  setSelectedMandarinExamples: (state: PostsState, examples) => {
    state.selectedMandarinExamples = examples;
  },
  resetPostsState: (state: PostsState) => {
    state.loadingState = [];
    state.mandarinList = [];
    state.selectedMandarin = null;
    state.selectedMandarinExamples = [];
  }
};

export default {
  name: "posts",
  namespaced: true,
  state: postState,
  actions: postActions,
  mutations: postMutations
};
