import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Statistiques from "../views/Statistiques";
import Boutique from "../views/Boutique";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Agartha | Accueil"
    }
  },
  {
    path: "/statistiques",
    component: Statistiques,
    meta: {
      title: "Agartha | Statistiques"
    }
  },
  {
    path: "/boutique",
    component: Boutique,
    meta: {
      title: "Agartha | Boutique"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
