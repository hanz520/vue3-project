import type { RouteRecordRaw } from 'vue-router'
const product: RouteRecordRaw = {
  path: '/product-m',
  name: 'productM',
  component: () => import('@/layout/middleware/Middleware.vue'),
  children: [
    {
      path: 'classify',
      name: 'classify',
      component: () => import('@/views/classify/Classify.vue')
    },
    {
      path: 'product',
      name: 'product',
      component: () => import('@/views/product/Product.vue')
    },
    {
      path: 'product-set',
      name: 'productSet',
      component: () => import('@/layout/middleware/Middleware.vue'),
      children: [
        {
          path: 'product-set-a',
          name: 'productSetA',
          component: () => import('@/views/productSet/ProductSet.vue')
        },
        {
          path: 'product-set-b',
          name: 'productSetB',
          component: () => import('@/views/productSet/ProductSet.vue')
        }
      ]
    }
  ]
}

export default product
