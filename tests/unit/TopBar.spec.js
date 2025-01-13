import { describe, it, expect, beforeEach } from 'vitest'
import { renderWithSetup } from '../utils/test-utils'
import TopBar from '../../src/components/TopBar.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '../../src/stores/userStore'
import { nextTick } from 'vue'

describe('TopBar.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createTestingPinia({
      initialState: {
        user: {
          user: null,
          profiles: [],
          currentProfile: null,
          isAuthenticated: false,
          error: '',
          token: null
        }
      },
      stubActions: false
    })
  })

  it('renders the logo and title', async () => {
    const { container, getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    // Check logo
    const logo = container.querySelector('img')
    expect(logo).toBeTruthy()
    expect(logo.getAttribute('src')).toContain('logo.svg')
    expect(logo.classList.contains('h-12')).toBe(true)
    expect(logo.classList.contains('w-12')).toBe(true)
    
    // Check title
    expect(getByText('CSMCL SPACE')).toBeTruthy()
  })

  it('renders public navigation links when not authenticated', async () => {
    const { getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    // Public links should be visible
    expect(getByText('Home')).toBeTruthy()
    expect(getByText('Documentation')).toBeTruthy()
    
    // Protected links should not be visible
    expect(() => getByText('Request Profile')).toThrow()
    expect(() => getByText('Admin')).toThrow()
  })

  it('shows sign in button when not authenticated', async () => {
    const { getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    expect(getByText('Sign In')).toBeTruthy()
    expect(() => getByText('Sign Out')).toThrow()
  })

  it('shows profile request link when authenticated', async () => {
    const { getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    const store = useUserStore()
    store.isAuthenticated = true
    await nextTick()
    
    expect(getByText('Request Profile')).toBeTruthy()
  })

  it('shows admin link when user is admin', async () => {
    const { getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    const store = useUserStore()
    store.isAuthenticated = true
    store.currentProfile = { type: 'admin' }
    await nextTick()
    
    expect(getByText('Admin')).toBeTruthy()
  })

  it('shows username and sign out button when authenticated', async () => {
    const { getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    const store = useUserStore()
    store.isAuthenticated = true
    store.user = { username: 'testuser' }
    await nextTick()
    
    const usernameElement = getByText('testuser')
    expect(usernameElement).toBeTruthy()
    expect(getByText('Sign Out')).toBeTruthy()
    expect(() => getByText('Sign In')).toThrow()
  })

  it('handles navigation to login page', async () => {
    const { getByText, router } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    const signInButton = getByText('Sign In')
    await signInButton.click()
    await router.isReady()
    
    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('handles logout', async () => {
    const { getByText } = await renderWithSetup(TopBar, {
      global: {
        plugins: [pinia]
      }
    })
    
    const store = useUserStore()
    store.isAuthenticated = true
    store.user = { username: 'testuser' }
    await nextTick()
    
    const signOutButton = getByText('Sign Out')
    await signOutButton.click()
    await nextTick()
    
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
  })
})
