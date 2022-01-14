import type { RouteRecordRaw } from 'vue-router'
const system: RouteRecordRaw = {
  path: '/',
  redirect: '/workbench',
  component: () => import('@/layout/Layout.vue')
  // children: []
}
