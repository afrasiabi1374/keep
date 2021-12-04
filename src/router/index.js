import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index'
import Archive from '../views/Archive'
import ByTag from '../views/ByTag'
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/archive',
    name: 'archive',
    component: Archive
  },
  {
    path: '/byTag/:id',
    name: 'byTag',
    component: ByTag
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
