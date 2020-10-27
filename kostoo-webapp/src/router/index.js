import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "../firebase";
import store from "../store";
import Home from "../views/Home.vue";
import DashboardInvestor from "../views/Dashboard/Investor";
import DashboardDesa from "../views/Dashboard/Desa";
import CariDesa from "../views/CariDesa";
import Proyek from "../views/Proyek";
import DetailDesa from "../views/DetailDesa";
import FormKerjasama from "../views/FormKerjasama";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,

    children: [
      {
        path: "investor",
        component: DashboardInvestor,
        meta: {
          requiresLogin: true,
          allowedRole: "investor"
        }
      },
      {
        path: "desa",
        component: DashboardDesa,
        meta: {
          requiresLogin: true,
          allowedRole: "desa"
        }
      },
      {
        path: "cari-desa",
        component: CariDesa,
        meta: {
          requiresLogin: true,
          allowedRole: "investor+desa"
        }
      },
      {
        path: "proyek",
        component: Proyek,
        meta: {
          requiresLogin: true,
          allowedRole: "investor"
        }
      },
      {
        path: "desa/:id",
        component: DetailDesa,
        meta: {
          requiresLogin: true,
          allowedRole: "investor"
        }
      },
      {
        path: "form-kerjasama",
        component: FormKerjasama,
        meta: {
          requiresLogin: true,
          allowedRole: "investor+desa"
        }
      },
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "register",
        name: "Register",
        component: Register
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth.currentUser;
  let requiresLogin = to.matched.some(x => x.meta.requiresLogin);
  if (currentUser) {
    if (requiresLogin) {
      if (to.meta.allowedRole.includes(store.state.userProfile.role)) {
        next();
      } else {
        next("/" + store.state.userProfile.role);
      }
    } else {
      if (to.name == "Register" || to.name == "Login") {
        next("/");
      } else {
        next();
      }
    }
  } else {
    if (requiresLogin) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
