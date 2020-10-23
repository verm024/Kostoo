import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import DashboardInvestor from "../views/Dashboard/Investor";
import DashboardDesa from "../views/Dashboard/Desa";
import CariDesa from "../views/CariDesa";
import Proyek from "../views/Proyek";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,

    children: [
      {
        path: "investor",
        component: DashboardInvestor
      },
      {
        path: "desa",
        component: DashboardDesa
      },
      {
        path: "cari-desa",
        component: CariDesa
      },
      {
        path: "proyek",
        component: Proyek
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
