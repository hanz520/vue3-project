import type { RouteRecordRaw } from 'vue-router'
const product: RouteRecordRaw = {
  path: '/product-m',
  name: 'productM',
  meta: { title: '产品管理', icon: 'icon-appstore' },
  middleware: true,
  component: () => import('@/layout/middleware/Middleware.vue'),
  children: [
    {
      path: 'classify',
      name: 'classify',
      meta: { title: '分类管理', icon: 'icon-appstore' },
      component: () => import('@/views/classify/Classify.vue')
    },
    {
      path: 'product',
      name: 'product',
      meta: { title: '产品', icon: 'icon-appstore' },
      component: () => import('@/views/product/Product.vue')
    },
    {
      path: 'product-set',
      name: 'productSet',
      meta: { title: '产品集', icon: 'icon-appstore' },
      middleware: true,
      component: () => import('@/layout/middleware/Middleware.vue'),
      children: [
        {
          path: 'product-set-a',
          name: 'productSetA',
          meta: { title: '产品集A', icon: 'icon-appstore' },
          component: () => import('@/views/productSet/ProductSet.vue')
        },
        {
          path: 'product-set-b',
          name: 'productSetB',
          meta: { title: '产品集B', icon: 'icon-appstore' },
          component: () => import('@/views/productSet/ProductSet.vue')
        }
      ]
    }
  ]
}

export default product
