import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";

import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
