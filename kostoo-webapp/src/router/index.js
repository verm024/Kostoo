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
    path: "",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      navCategory: "proyek"
    },

    children: [
      {
        path: "investor",
        component: DashboardInvestor,
        name: "Dashboard Investor",
        meta: {
          requiresLogin: true,
          allowedRole: "investor",
          title: "Dashboard",
          navCategory: "proyek"
        }
      },
      {
        path: "desa",
        component: DashboardDesa,
        name: "Dashboard",
        meta: {
          requiresLogin: true,
          allowedRole: "desa",
          title: "Dashboard Desa",
          navCategory: "proyek"
        }
      },
      {
        path: "cari-desa",
        component: CariDesa,
        name: "Cari Desa",
        meta: {
          requiresLogin: true,
          allowedRole: "investor",
          title: "Cari Desa",
          navCategory: "cari"
        }
      },
      {
        path: "proyek",
        component: Proyek,
        name: "Proyek",
        meta: {
          requiresLogin: true,
          allowedRole: "investor",
          title: "Proyek",
          navCategory: "proyek"
        }
      },
      {
        path: "proyek/:id",
        component: Proyek,
        name: "Detail Proyek",
        meta: {
          requiresLogin: true,
          allowedRole: "investor+desa",
          title: "Detail Proyek",
          navCategory: "proyek"
        }
      },
      {
        path: "desa/:id",
        component: DetailDesa,
        name: "Detail Desa",
        meta: {
          requiresLogin: true,
          allowedRole: "investor+desa",
          title: "Detail Desa",
          navCategory: "cari+portofolio"
        }
      },
      {
        path: "form-kerjasama/:id",
        component: FormKerjasama,
        name: "Form Kerjasama",
        meta: {
          requiresLogin: true,
          allowedRole: "investor",
          title: "Ajukan Kerjasama",
          navCategory: "cari"
        }
      }
    ]
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
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
        next("/" + store.state.userProfile.role);
      } else if(to.name == "Home"){
        next("/" + store.state.userProfile.role);
      } else {
        next();
      }
    }
  } else {
    if (requiresLogin) {
      next("/login");
    } else {
      if(to.name == "Home"){
        next("/login")
      }
      else{
        next()
      }
    }
  }
});

export default router;
