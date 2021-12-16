import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // redirect: '/home',
    component: () => import('@/layout/Layout.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/layout/Layout.vue')
  // }
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('@/views/home/Home.vue')
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { logged } = useUserStore()
  // 如果是前往登录页，或者没找到登录信息，跳转登录页
  if (to.name !== 'login' && !logged) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
