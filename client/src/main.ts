import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuetifyConfig from "@/plugins/vuetify";
import Vuetify from "vuetify";
import "@/helpers/vee-validate-rules";
import { ValidationObserver, ValidationProvider } from "vee-validate";

Vue.use(Vuetify);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify: new Vuetify(VuetifyConfig),
  render: h => h(App)
}).$mount("#app");
