import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss"; // global css

import VueScrollTo from "vue-scrollto";
import Divider from "@/components/Divider";
Vue.component("Divider", Divider);
import MySkeleton from "@/components/skeleton";
Vue.use(MySkeleton);

Vue.use(VueScrollTo);
import * as filters from "./filters"; // global filters
// register global utility filters 注册全局公用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
import "@chanwingwah/my-vue-component/dist/myComponent.css"; // 导入样式
import { message, wave, MyImage } from "@chanwingwah/my-vue-component";
Vue.use(message);
Vue.use(wave);
Vue.use(MyImage);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

store.dispatch("app/getCounts");
