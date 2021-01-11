import { RootState } from "@/models";
import axios from "axios";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

// ===== Module Imports ===== //
import PostModule from "@/store/modules/posts";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    posts: PostModule
  }
};

export default new Vuex.Store<RootState>(store);

// ===== Axios Setup ===== //
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
