import { CategoriesState, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const categoriesState = {
  categoriesList: [],
  loadingState: [],
  selectedCategory: null
};

export const categoriesActions: ActionTree<CategoriesState, RootState> = {
  getCategories: ({ commit, dispatch, rootState }) => {
    commit("addToLoadingState", "getting user categories...");
    return axios
      .get(
        `${process.env.VUE_APP_API_HOST}/categories/${rootState.user.user!._id}`
      )
      .then((resp: AxiosResponse) => {
        commit("setCategoriesList", resp.data.categories);
        commit("removeFromLoadingState", "getting user categories...");
      })
      .catch((err) => {
        console.info(err.config);
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "getting user categories...");
        throw new Error(err);
      });
  },
  createCategory: ({ commit, dispatch, rootState }, payload) => {
    commit("addToLoadingState", "creating new category...");
    return axios
      .post(
        `${process.env.VUE_APP_API_HOST}/categories/${
          rootState.user.user!._id
        }`,
        payload
      )
      .then(() => {
        dispatch("getCategories");
        dispatch(
          "snackbar/successStatus",
          "Successfully created a new category!",
          { root: true }
        );
        commit("removeFromLoadingState", "creating new category...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "creating new category...");
        throw new Error(err);
      });
  },
  updateCategory: ({ commit, dispatch, rootState }, payload) => {
    commit("addToLoadingState", "updating category...");
    return axios
      .put(
        `${process.env.VUE_APP_API_HOST}/categories/${
          rootState.user.user!._id
        }/${payload._id}`,
        payload
      )
      .then(() => {
        dispatch("snackbar/successStatus", "Successfully updated category!", {
          root: true
        });
        commit("removeFromLoadingState", "updating category...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "updating category...");
        throw new Error(err);
      });
  },
  deleteCategory: ({ commit, dispatch, rootState }, categoryId) => {
    commit("addToLoadingState", "deleting category...");
    return axios
      .delete(
        `${process.env.VUE_APP_API_HOST}/categories/${
          rootState.user.user!._id
        }/${categoryId}`
      )
      .then(() => {
        dispatch("snackbar/successStatus", "Successfully deleted category!", {
          root: true
        });
        commit("removeFromLoadingState", "deleting category...");
      })
      .catch(err => {
        dispatch("snackbar/errorStatus", err.response.data.message, {
          root: true
        });
        commit("removeFromLoadingState", "deleting category...");
        throw new Error(err);
      });
  },
  handleResetCategoriesState: ({ commit }) => {
    commit("resetCategoriesState");
  }
};

export const categoriesMutations: MutationTree<CategoriesState> = {
  addToLoadingState: (state: CategoriesState, message: string) => {
    state.loadingState.push(message);
  },
  removeFromLoadingState: (state: CategoriesState, message: string) => {
    state.loadingState = state.loadingState.filter(
      loadMessages => loadMessages !== message
    );
  },
  setCategoriesList: (state: CategoriesState, categories) => {
    state.categoriesList = categories;
  },
  resetCategoriesState: (state: CategoriesState) => {
    state.categoriesList = [];
    state.loadingState = [];
    state.selectedCategory = null;
  }
};

export default {
  name: "categories",
  namespaced: true,
  state: categoriesState,
  actions: categoriesActions,
  mutations: categoriesMutations
};
