import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {layout: 'MainLayout'},
    component: Main
  },
  {
    path: '/board/:id',
    name: 'Board',
    meta: {layout: 'MainLayout'},
    component: () => import('../views/Boards.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
