import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProfileView from '../views/ProfileView.vue'
import SalePlttnView from '../views/sale/PlttnView.vue'
import SaleFrmhsView from '../views/sale/FrmhsView.vue'
import SaleFormView from '../views/sale/FormView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
  ,{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    component: AboutView
  }
  ,{
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }
  ,{
    path: '/salePlttn',
    name: 'salePlttn',
    component: SalePlttnView
  }
  ,{
    path: '/saleFrmhs',
    name: 'saleFrmhs',
    component: SaleFrmhsView
  }
  ,{
    path: '/saleForm',
    name: 'saleForm',
    component: SaleFormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
