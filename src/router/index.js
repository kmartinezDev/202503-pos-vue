import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '@/views/ShopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'productos',
          name: 'admin-products',
          component: () => import('@/views/admin/ProductsView.vue'),
        },
        {
          path: 'productos/nuevo',
          name: 'admin-new-product',
          component: () => import('@/views/admin/NewProductView.vue'),
        },
        {
          path: 'ventas',
          name: 'admin-sales',
          component: () => import('@/views/admin/SalesView.vue'),
        }
      ],
    }
  ],
})

export default router
