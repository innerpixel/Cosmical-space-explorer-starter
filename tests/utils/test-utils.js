import { render } from '@testing-library/vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { vi } from 'vitest'
import { h } from 'vue'
import { routes } from '../../src/router'

// Mock PWA registration
vi.mock('virtual:pwa-register', () => ({
  registerSW: () => ({
    updateServiceWorker: () => Promise.resolve()
  })
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}

// Set up localStorage mock before tests
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

// Create router instance for testing with minimal routes
export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: { template: '<div>Home</div>' }
      },
      {
        path: '/docs',
        name: 'Documentation',
        component: { template: '<div>Documentation</div>' }
      },
      {
        path: '/profile/request',
        name: 'ProfileRequest',
        component: { template: '<div>Profile Request</div>' }
      },
      {
        path: '/admin/requests',
        name: 'AdminRequests',
        component: { template: '<div>Admin Requests</div>' }
      }
    ]
  })
}

// Custom router-link component for testing
const RouterLinkStub = {
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    custom: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return h('a', {
      href: this.to,
      onClick: (e) => e.preventDefault(),
      role: 'link',
      'data-testid': 'router-link'
    }, this.$slots.default?.())
  }
}

// Render with all necessary plugins and stubs
export async function renderWithSetup(component, options = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/login', component: { template: '<div>Login</div>' } },
      { path: '/docs', component: { template: '<div>Docs</div>' } },
      { path: '/profile/request', component: { template: '<div>Profile Request</div>' } },
      { path: '/admin/requests', component: { template: '<div>Admin Requests</div>' } }
    ]
  })

  const pinia = createPinia()

  await router.push('/')
  await router.isReady()

  const result = render(component, {
    global: {
      plugins: [router, pinia],
      stubs: {
        'router-link': {
          template: '<a :href="to"><slot /></a>',
          props: ['to']
        },
        ...options?.global?.stubs
      },
      ...options?.global
    },
    ...options
  })

  return {
    ...result,
    router
  }
}

// Mock navigator online status
export function mockNavigatorOnline(isOnline = true) {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    get: () => isOnline
  })
}
