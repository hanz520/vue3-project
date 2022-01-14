import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workbench',
    meta: { title: '主页' },
    component: () => import('@/layout/Layout.vue'),
    hide: false,
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/Workbench.vue'),
        meta: { title: '工作台' },
        hide: false
      },
      {
        path: '/system-m',
        name: 'systemM',
        component: () => import('@/layout/middleware/Middleware.vue'),
        children: [
          {
            path: 'user',
            name: 'user',
            component: () => import('@/views/user/User.vue')
          },
          {
            path: 'role',
            name: 'role',
            component: () => import('@/views/role/Role.vue')
          },
          {
            path: 'auth',
            name: 'auth',
            component: () => import('@/views/auth/Auth.vue')
          }
        ]
      },
      {
        path: '/product-m',
        name: 'productM',
        component: () => import('@/layout/middleware/middleware.vue'),
        children: []
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
    meta: { title: '登录' },
    hide: true
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/layout/redirect/Redirect.vue'),
    hide: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/notFound/NotFound.vue'),
    meta: { title: '404' },
    hide: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { logged } = useUserStore()
  // 如果是前往登录页，或者没找到登录信息，跳转登录页
  if (to.name !== 'login' && !logged) {
    next({ name: 'login' })
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
