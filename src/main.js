import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Highlight from "vue-markdown-highlight";
import "highlight.js/scss/monokai-sublime.scss";
Vue.use(Highlight);

import "@/styles/index.scss"; // global css

import VueScrollTo from "vue-scrollto";
import Divider from "@/components/Divider";

Vue.use(VueScrollTo);
import * as filters from "./filters"; // global filters
// register global utility filters 注册全局公用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
Vue.component("Divider", Divider);
import { message } from "ant-design-vue";
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
