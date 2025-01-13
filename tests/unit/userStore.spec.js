import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../src/stores/userStore'

describe('userStore', () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia())
    
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('initializes with default state', () => {
    const store = useUserStore()
    
    expect(store.user).toBeNull()
    expect(store.profiles).toEqual([])
    expect(store.currentProfile).toBeNull()
    expect(store.pendingRequests).toEqual([])
    expect(store.isAuthenticated).toBe(false)
    expect(store.error).toBe('')
    expect(store.token).toBeNull()
  })

  it('successfully logs in as admin', async () => {
    const store = useUserStore()
    
    await store.login({
      username: 'admin',
      password: 'admin'
    })
    
    expect(store.isAuthenticated).toBe(true)
    expect(store.user).toEqual({
      id: 1,
      username: 'admin',
      email: 'admin@example.com'
    })
    expect(store.token).toBe('mock-jwt-token')
    expect(store.profiles[0].type).toBe('admin')
    expect(store.error).toBe('')
  })

  it('fails to login with invalid credentials', async () => {
    const store = useUserStore()
    
    await expect(store.login({
      username: 'wrong',
      password: 'wrong'
    })).rejects.toThrow('Invalid credentials')
    
    expect(store.error).toBe('Invalid credentials')
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
  })

  it('successfully logs out', async () => {
    const store = useUserStore()
    
    // First login
    await store.login({
      username: 'admin',
      password: 'admin'
    })
    
    // Then logout
    store.logout()
    
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
    expect(store.profiles).toEqual([])
    expect(store.currentProfile).toBeNull()
    expect(store.pendingRequests).toEqual([])
    expect(store.token).toBeNull()
  })

  it('correctly identifies admin status', async () => {
    const store = useUserStore()
    
    // Not admin initially
    expect(store.isAdmin).toBe(false)
    
    // Login as admin
    await store.login({
      username: 'admin',
      password: 'admin'
    })
    
    // Should be admin now
    expect(store.isAdmin).toBe(true)
  })

  it('handles profile requests correctly', async () => {
    const store = useUserStore()
    
    // Login first
    await store.login({
      username: 'admin',
      password: 'admin'
    })
    
    const profileData = {
      type: 'developer'
    }
    
    const request = await store.requestNewProfile(profileData)
    
    expect(request.type).toBe('developer')
    expect(request.status).toBe('pending')
    expect(request.userId).toBe(1)
    expect(store.pendingRequests).toHaveLength(1)
  })

  it('prevents profile requests when not authenticated', async () => {
    const store = useUserStore()
    
    await expect(store.requestNewProfile({
      type: 'developer'
    })).rejects.toThrow('Must be authenticated to request a profile')
    
    expect(store.pendingRequests).toHaveLength(0)
  })

  it('allows admin to approve profile requests', async () => {
    const store = useUserStore()
    
    // Login as admin
    await store.login({
      username: 'admin',
      password: 'admin'
    })
    
    // Create a request
    const request = await store.requestNewProfile({
      type: 'developer'
    })
    
    // Approve the request
    const profile = await store.approveProfileRequest(request.id)
    
    expect(profile.type).toBe('developer')
    expect(store.pendingRequests).toHaveLength(0)
    expect(store.profiles).toHaveLength(2) // Admin profile + new profile
  })

  it('prevents non-admin from approving requests', async () => {
    const store = useUserStore()
    
    await expect(store.approveProfileRequest(1))
      .rejects.toThrow('Must be admin to approve requests')
  })

  it('persists state to localStorage', async () => {
    const store = useUserStore()
    
    await store.login({
      username: 'admin',
      password: 'admin'
    })
    
    expect(localStorage.setItem).toHaveBeenCalled()
    
    const savedState = JSON.parse(localStorage.setItem.mock.calls[0][1])
    expect(savedState.isAuthenticated).toBe(true)
    expect(savedState.user.username).toBe('admin')
    expect(savedState.token).toBe('mock-jwt-token')
  })
})
