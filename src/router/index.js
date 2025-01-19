import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

import Home from '../views/Home.vue'
import Documentation from '../views/Documentation.vue'
import DomainArchitecture from '../views/docs/DomainArchitecture.vue'
import DevelopmentOverview from '../views/docs/DevelopmentOverview.vue'
import DevelopmentFlow from '../views/docs/DevelopmentFlow.vue'
import DeploymentFlow from '../views/docs/DeploymentFlow.vue'
import SpaceMeetings from '../views/docs/SpaceMeetings.vue'
import CSMCLSpace from '../views/CSMCLSpace.vue'
import LoginView from '../views/LoginView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ProfileRequest from '../views/ProfileRequest.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminRequestsView from '../views/AdminRequestsView.vue'
import AdminNotifications from '../views/AdminNotifications.vue'
import ComponentShowcase from '../views/showcase/ComponentShowcase.vue'
import ShowcaseOverview from '../views/showcase/ShowcaseOverview.vue'
import ShowcaseLayoutDemo from '../views/showcase/ShowcaseLayoutDemo.vue'
import ShowcaseComponents from '../views/showcase/ShowcaseComponents.vue'
import ShowcasePatterns from '../views/showcase/ShowcasePatterns.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/features',
      name: 'Features',
      component: () => import('../views/Features.vue')
    },
    {
      path: '/docs',
      name: 'Documentation',
      component: Documentation,
    },
    {
      path: '/docs/architecture/domain',
      name: 'DomainArchitecture',
      component: DomainArchitecture,
    },
    {
      path: '/docs/development/overview',
      name: 'DevelopmentOverview',
      component: DevelopmentOverview,
    },
    {
      path: '/docs/development/flow',
      name: 'DevelopmentFlow',
      component: DevelopmentFlow,
    },
    {
      path: '/docs/deployment/flow',
      name: 'DeploymentFlow',
      component: DeploymentFlow,
    },
    {
      path: '/docs/features/space-meetings',
      name: 'SpaceMeetings',
      component: SpaceMeetings,
    },
    {
      path: '/csmcl',
      name: 'CSMCL',
      component: CSMCLSpace
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView
    },
    {
      path: '/profile/request',
      name: 'ProfileRequest',
      component: ProfileRequest,
      meta: { requiresAuth: true }
    },
    // Admin Routes
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/mission-control',
      name: 'MissionControl',
      component: AdminRequestsView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/notifications',
      name: 'AdminNotifications',
      component: AdminNotifications,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    // Redirects for old routes
    {
      path: '/admin/requests',
      redirect: '/admin/mission-control'
    },
    {
      path: '/notifications',
      redirect: '/admin/notifications'
    },
    // Showcase routes
    {
      path: '/showcase',
      component: ComponentShowcase,
      children: [
        {
          path: '',
          name: 'ShowcaseOverview',
          component: ShowcaseOverview
        },
        {
          path: 'layout',
          name: 'ShowcaseLayout',
          component: ShowcaseLayoutDemo
        },
        {
          path: 'components',
          name: 'ShowcaseComponents',
          component: ShowcaseComponents
        },
        {
          path: 'patterns',
          name: 'ShowcasePatterns',
          component: ShowcasePatterns
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
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
