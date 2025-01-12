import { render } from '@testing-library/vue'
import { vi } from 'vitest'

// Mock PWA registration
vi.mock('virtual:pwa-register', () => ({
  registerSW: () => ({
    onNeedRefresh: vi.fn(),
    onOfflineReady: vi.fn(),
    updateServiceWorker: vi.fn()
  })
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Custom render function with common wrappers/providers
export function renderWithSetup(Component, options = {}) {
  return render(Component, {
    ...options,
  })
}

// Mock navigator online status
export function mockNavigatorOnline(isOnline = true) {
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    value: isOnline
  })
}
