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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
