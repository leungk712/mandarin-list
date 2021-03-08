import { CategoriesState, RootState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import axios, { AxiosResponse } from "axios";

export const categoriesState = {
    categoriesList: [],
    loadingState: [],
    selectedCategory: null
};

export const categoriesActions: ActionTree<CategoriesState, RootState> = {
    getCategories: ({ commit, rootState }) => {
        commit("addToLoadingState", "getting user categories...");
        return axios
            .get(`${process.env.VUE_APP_API_HOST}/categories/${rootState.user.user!._id}`)
            .then((resp: AxiosResponse) => {
                commit("setCategoriesList", resp.data);
                commit("removeFromLoadingState", "getting user categories...");
            })
            .catch(err => {
                commit("removeFromLoadingState", "getting user categories...");
                throw new Error(err);
            });
    },
    createCategory: ({ commit, dispatch, rootState }, payload) => {
        commit("addToLoadingState", "creating new category...");
        return axios
            .post(`${process.env.VUE_APP_API_HOST}/categories/${rootState.user.user!._id}`, payload)
            .then(() => {
                dispatch("getCategories");
                commit("removeFromLoadingState", "creating new category...");
            })
            .catch(err => {
                commit("removeFromLoadingState", "creating new category...");
                throw new Error(err);
            });
    },
    deleteCategory: ({ commit, dispatch, rootState }, categoryId) => {
        commit("addToLoadingState", "deleting category...");
        return axios
            .delete(`${process.env.VUE_APP_API_HOST}/categories/${rootState.user.user!._id}/${categoryId}`)
            .then(() => {
                commit("removeFromLoadingState", "deleting category...");
            })
            .catch(err => {
                commit("removeFromLoadingState", "deleting category...");
                throw new Error(err);
            })
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
    }
};

export default {
name: "categories",
namespaced: true,
state: categoriesState,
actions: categoriesActions,
mutations: categoriesMutations
};
