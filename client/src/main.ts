import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuetifyConfig from "@/plugins/vuetify";
import Vuetify from "vuetify";

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(VuetifyConfig),
  render: h => h(App)
}).$mount("#app");
