import { RootState, StoriesState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const storyState = {
  storiesList: [],
  loadingState: [],
  selectedStory: null
};

export const storyActions: ActionTree<StoriesState, RootState> = {
  getStories: ({ commit, dispatch, rootState }) => {
    commit("addToLoadingState", "getting user stories...");
    return axios
      .get(
        `${process.env.VUE_APP_API_HOST}/stories/${rootState.user.user!._id}`
      )
      .then((resp: AxiosResponse) => {
        commit("setStoriesList", resp.data.stories);
        commit("removeFromLoadingState", "getting user stories...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "getting user stories...");
        throw new Error(err);
      });
  },
  createStory: ({ commit, dispatch, rootState }, payload) => {
    commit("addToLoadingState", "creating new story...");
    return axios
      .post(
        `${process.env.VUE_APP_API_HOST}/stories/${rootState.user.user!._id}`,
        payload
      )
      .then(() => {
        dispatch("getStories");
        dispatch(
          "snackbar/successStatus",
          "Successfully created a new story!",
          { root: true }
        );
        commit("removeFromLoadingState", "creating new story...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "creating new story...");
        throw new Error(err);
      });
  },
  updateStory: ({ commit, dispatch, rootState }, payload) => {
    commit("addToLoadingState", "updating story...");
    return axios
      .post(
        `${process.env.VUE_APP_API_HOST}/stories/${
          rootState.user.user!._id
        }/story/${payload._id}`,
        payload
      )
      .then(() => {
        dispatch("getStories");
        dispatch("snackbar/successStatus", "Successfully updated story!", {
          root: true
        });
        commit("removeFromLoadingState", "updating story...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "updating story...");
        throw new Error(err);
      });
  },
  deleteStory: ({ commit, dispatch, rootState }, storyId) => {
    commit("addToLoadingState", "deleting story...");
    return axios
      .delete(
        `${process.env.VUE_APP_API_HOST}/stories/${
          rootState.user.user!._id
        }/story/${storyId}`
      )
      .then(() => {
        dispatch("getStories");
        dispatch("snackbar/successStatus", "Successfully deleted story!", {
          root: true
        });
        commit("removeFromLoadingState", "deleting story...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "deleting story...");
        throw new Error(err);
      });
  },
  handleResetStoriesState: ({ commit }) => {
    commit("resetStoriesState");
  }
};

export const storyMutations: MutationTree<StoriesState> = {
  addToLoadingState: (state: StoriesState, message: string) => {
    state.loadingState.push(message);
  },
  removeFromLoadingState: (state: StoriesState, message: string) => {
    state.loadingState = state.loadingState.filter(
      loadMessages => loadMessages !== message
    );
  },
  resetStoriesState: (state: StoriesState) => {
    state.storiesList = [];
    state.loadingState = [];
    state.selectedStory = null;
  },
  setStoriesList: (state: StoriesState, stories) => {
    state.storiesList = stories;
  }
};

export default {
  name: "stories",
  namespaced: true,
  state: storyState,
  actions: storyActions,
  mutations: storyMutations
};
