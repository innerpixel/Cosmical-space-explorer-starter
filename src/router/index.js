import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/ForgotPasswordView.vue')
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
    // Mission Control Center routes
    {
      path: '/admin/mission-control',
      name: 'MissionControl',
      component: () => import('../views/AdminRequestsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/requests',
      redirect: '/admin/mission-control' // Redirect old path to new
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: () => import('../views/AdminNotifications.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/showcase',
      component: () => import('../views/showcase/ComponentShowcase.vue'),
      children: [
        {
          path: '',
          name: 'ShowcaseOverview',
          component: () => import('../views/showcase/ShowcaseOverview.vue')
        },
        {
          path: 'layout',
          name: 'ShowcaseLayout',
          component: () => import('../views/showcase/ShowcaseLayoutDemo.vue')
        },
        {
          path: 'components',
          name: 'ShowcaseComponents',
          component: () => import('../views/showcase/ShowcaseComponents.vue')
        },
        {
          path: 'patterns',
          name: 'ShowcasePatterns',
          component: () => import('../views/showcase/ShowcasePatterns.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // Handle authentication
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ 
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } 
  // Handle admin routes
  else if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next({ path: '/' })
  } 
  // Allow navigation
  else {
    next()
  }
})

export default router
