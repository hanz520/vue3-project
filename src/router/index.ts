import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
  // {
  //   path: '/contextMenu',
  //   name: '右键菜单模板',
  //   component: () => import('@/component/baseDiagram/ContextMenu.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
