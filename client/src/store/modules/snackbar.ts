import { RootState, SnackbarState } from "@/models";
import { ActionTree, MutationTree } from "vuex";
import { AxiosError } from "axios";
import { userActions } from "@/store/modules/user";

export const processErrorMessage = (error: AxiosError | string) => {
  let errorMessage = "Uh oh! An error occurred.";
  if (
    typeof error !== "string" &&
    error &&
    error.response &&
    error.response.data.message
  ) {
    errorMessage = error.response.data.message;
  } else if (typeof error === "string" && error !== "") {
    errorMessage = error;
  }
  return errorMessage;
};

export const snackbarState = {
  display: false,
  message: "",
  type: ""
};

export const snackbarActions: ActionTree<SnackbarState, RootState> = {
  clearSnackbarMessage: ({ commit }) => {
    commit("resetSnackbarState");
  },
  errorStatus: ({ commit }, error: AxiosError | string) => {
    commit("setMessage", processErrorMessage(error));
    commit("setType", "error");
    commit("displaySnackbar");
  },

  successStatus: ({ commit }, status: string) => {
    commit("setMessage", status);
    commit("setType", "success");
    commit("displaySnackbar");
  }
};

export const snackbarMutations: MutationTree<SnackbarState> = {
  resetSnackbarState: (state: SnackbarState) => {
    state.message = "";
    state.display = false;
    state.type = "";
  },
  displaySnackbar: (state: SnackbarState) => {
    state.display = true;
  },
  setMessage: (state: SnackbarState, message: string) => {
    state.message = message;
  },
  setType: (state: SnackbarState, type: string) => {
    state.type = type;
  }
};

export default {
  name: "snackbar",
  namespaced: true,
  state: snackbarState,
  actions: snackbarActions,
  mutations: snackbarMutations
};
