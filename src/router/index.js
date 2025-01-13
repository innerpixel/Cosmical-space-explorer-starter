import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import Home from '../views/Home.vue'
import ProfileRequestView from '../views/ProfileRequestView.vue'
import AdminRequestsView from '../views/AdminRequestsView.vue'
import Documentation from '../views/Documentation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile/request',
      name: 'ProfileRequest',
      component: ProfileRequestView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/requests',
      name: 'AdminRequests',
      component: AdminRequestsView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/docs',
      name: 'Documentation',
      component: Documentation
    }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
