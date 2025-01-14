import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authService } from '../../../src/services/authService'

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
    // Reset all mocks
    vi.restoreAllMocks()
  })

  describe('login', () => {
    it('should store token on successful login', async () => {
      const mockToken = 'mock-jwt-token'
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      }

      // Mock the fetch function
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token: mockToken })
        })
      )

      await authService.login(credentials)

      // Verify fetch was called correctly
      expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      })

      // Verify token was stored
      expect(localStorage.getItem('auth_token')).toBe(mockToken)
    })

    it('should throw error on failed login', async () => {
      const credentials = {
        email: 'wrong@example.com',
        password: 'wrongpassword'
      }

      // Mock fetch to return error
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 401
        })
      )

      await expect(authService.login(credentials)).rejects.toThrow('Login failed')
    })
  })

  describe('logout', () => {
    it('should clear token from storage', () => {
      localStorage.setItem('auth_token', 'some-token')
      authService.logout()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })
})
