// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/HomeLoggedView.vue'),
  },
  {
    path: '/edit',
    component: () => import('@/views/EditView.vue'),
  },
  
  {
    path: '/edit/:mapId',
    component: () => import('@/views/EditView.vue'),
  },

  {
    path: '/play',
    component: () => import('@/views/PlayView.vue'),
  },
  {
    path: '/play/:mapId',
    component: () => import('@/views/PlayView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
