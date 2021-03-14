import { RootState } from "@/models";
import axios from "axios";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";

// ===== Module Imports ===== //
import AlertModule from "@/store/modules/alert";
import CategoryModule from "@/store/modules/categories";
import PostModule from "@/store/modules/posts";
import SnackbarModule from "@/store/modules/snackbar";
import StoryModule from "@/store/modules/stories";
import UserModule from "@/store/modules/user";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
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

export default new Vuex.Store<RootState>(store);

if (sessionStorage.getItem("access_token")) {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem("access_token");
}

// ===== Axios Setup ===== //
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
