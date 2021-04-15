import { RootState } from "@/models";
import axios from "axios";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "@/router";
import { userActions } from "@/store/modules/user";
import store from "@/store";

// ===== Module Imports ===== //
import AlertModule from "@/store/modules/alert";
import CategoryModule from "@/store/modules/categories";
import PostModule from "@/store/modules/posts";
import SnackbarModule from "@/store/modules/snackbar";
import StoryModule from "@/store/modules/stories";
import UserModule from "@/store/modules/user";

Vue.use(Vuex);

export const rootStore: StoreOptions<RootState> = {
  plugins: [createPersistedState()],
  modules: {
    alert: AlertModule,
    categories: CategoryModule,
    posts: PostModule,
    snackbar: SnackbarModule,
    stories: StoryModule,
    user: UserModule
  }
};

export default new Vuex.Store<RootState>(rootStore);

const accessToken = sessionStorage.getItem("access_token");

if (accessToken) {
  axios.defaults.headers.common.Authorization = accessToken;
}

axios.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const { response: { status } } = error;
  if(!error.response || status === 403) {
    await router.push({ name: "ErrorPage" });
    store.dispatch("user/logout", null, { root: true });
  }

  return Promise.reject(error);
});

// ===== Axios Setup ===== //
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
