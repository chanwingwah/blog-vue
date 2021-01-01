import Vue from "vue";
import VueRouter from "vue-router";
/* Layout */
import Layout from "@/layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页" }
      },
      {
        path: "walking",
        name: "walking",
        component: () => import("@/views/walking/index"),
        meta: { title: "行博" }
      },
      {
        path: "book",
        name: "book",
        component: () => import("@/views/book/index"),
        meta: { title: "书单" }
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/index"),
        meta: { title: "首页" }
      }
    ]
  },
  {
    // 404 page must be placed at the end !!!
    path: "/404",
    component: () => import("@/views/404")
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404" } // 匹配不到任何路由 指向404
];

const router = new VueRouter({
  routes
});

export default router;
