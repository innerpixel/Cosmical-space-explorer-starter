import { render } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

// Create a custom render function that includes router and store
export function renderWithSetup(Component, options = {}) {
  // Create fresh instances of router and store for each test
  const router = createRouter({
    history: createWebHistory(),
    routes: options.routes || []
  })

  const pinia = createPinia()

  return render(Component, {
    global: {
      plugins: [router, pinia],
      ...options.global
    },
    ...options
  })
}

// Helper to create a mock user
export const createMockUser = (overrides = {}) => ({
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  ...overrides
})

// Helper to create mock API responses
export const createMockApiResponse = (data, status = 200) => ({
  data,
  status,
  ok: status >= 200 && status < 300
})
