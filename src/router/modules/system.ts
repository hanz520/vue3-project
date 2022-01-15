import type { RouteRecordRaw } from 'vue-router'
const system: RouteRecordRaw = {
  path: '/system-m',
  name: 'systemM',
  component: () => import('@/layout/middleware/Middleware.vue'),
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/User.vue'),
      meta: { title: '用户管理' }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/role/Role.vue'),
      meta: { title: '角色管理' }
    },
    {
      path: 'auth',
      name: 'auth',
      component: () => import('@/views/auth/Auth.vue'),
      meta: { title: '权限管理' }
    }
  ]
}

export default system
