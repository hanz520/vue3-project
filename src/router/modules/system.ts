import type { RouteRecordRaw } from 'vue-router'
// const system: RouteRecordRaw = {
//   path: '/system-m',
//   name: 'systemM',
//   meta: { middleware: true, title: '系统管理', icon: 'icon-appstore' },
//   redirect: '/user',
//   // component: () => import('@/layout/middleware/Middleware.vue'),
//   children: [
//     {
//       path: 'user',
//       name: 'user',
//       component: () => import('@/views/user/User.vue'),
//       meta: { title: '用户管理', icon: 'icon-appstore' }
//     },
//     {
//       path: 'user/:userId',
//       name: 'userAdd',
//       hide: true,
//       component: () => import('@/views/user/User.vue'),
//       meta: { title: '新增用户', icon: 'icon-appstore' }
//     },
//     {
//       path: 'role',
//       name: 'role',
//       component: () => import('@/views/role/Role.vue'),
//       meta: { title: '角色管理', icon: 'icon-appstore' }
//     },
//     {
//       path: 'auth',
//       name: 'auth',
//       component: () => import('@/views/auth/Auth.vue'),
//       meta: { title: '权限管理', icon: 'icon-appstore' }
//     }
//   ]
// }

const system: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/user/User.vue'),
    meta: { title: '用户管理', icon: 'icon-appstore' }
  },
  {
    path: 'user/:userId',
    name: 'userAdd',
    hide: true,
    component: () => import('@/views/user/User.vue'),
    meta: { title: '新增用户', icon: 'icon-appstore' }
  },
  {
    path: 'role',
    name: 'role',
    component: () => import('@/views/role/Role.vue'),
    meta: { title: '角色管理', icon: 'icon-appstore' }
  },
  {
    path: 'auth',
    name: 'auth',
    component: () => import('@/views/auth/Auth.vue'),
    meta: { title: '权限管理', icon: 'icon-appstore' }
  }
]

export default system
