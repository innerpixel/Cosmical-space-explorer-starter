import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/pwa-Explorer-onboarding/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/docs',
      name: 'Documentation',
      component: () => import('../views/Documentation.vue')
    },
    {
      path: '/profile/request',
      name: 'ProfileRequest',
      component: () => import('../views/ProfileRequest.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/requests',
      name: 'AdminRequests',
      component: () => import('../views/AdminRequestsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    // Check if route requires admin privileges
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!userStore.isAdmin) {
        next({ path: '/' })
        return
      }
    }
  }
  
  next()
})

export default router
