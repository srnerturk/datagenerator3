import Vue from 'vue';
import VueRouter from 'vue-router';
import WelcomePage from '../views/WelcomePage.vue';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: WelcomePage,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  base: process.env.BASE_URL,
  routes,
});

export default router;
