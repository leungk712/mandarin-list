import {
    RootState,
    AlertState
  } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import { AxiosError } from "axios";

// export const processErrorMessage = (err: AxiosError | string) => {
//   let errorMessage = "Invalid"
// };

export const alertState = {
  display: false,
  message: "",
  type: ""
};

export const alertActions: ActionTree<AlertState, RootState> = {
  clearAlert: ({ commit }) => {
    commit("resetAlert")
  },
  errorStatus: ({ commit }, errorMessage: AxiosError | string) => {
    commit("setMessage", errorMessage);
    commit("setType", "error");
    commit("displayAlert");
  },

  successStatus: ({ commit }, successMessage: string) => {
    commit("setMessage", successMessage);
    commit("setType", "success");
    commit("displayAlert");
  }
};

export const alertMutations: MutationTree<AlertState> = {
  resetAlert: (state: AlertState) => {
    state.message = "";
    state.display = false;
    state.type = "";
  },
  displayAlert: (state: AlertState) => {
    state.display = true;
  },
  setMessage: (state: AlertState, message: string) => {
    state.message = message;
  },
  setType: (state: AlertState, type: string ) => {
    state.type = type;
  }
};

export default {
  name: "alert",
  namespaced: true,
  state: alertState,
  actions: alertActions,
  mutations: alertMutations
};
  