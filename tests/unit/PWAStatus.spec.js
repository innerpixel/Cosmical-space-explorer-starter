import { describe, it, expect, beforeEach } from 'vitest'
import { renderWithSetup, mockNavigatorOnline } from '../utils/test-utils'
import PWAStatus from '../../src/components/PWAStatus.vue'

describe('PWAStatus.vue', () => {
  beforeEach(() => {
    // Reset navigator online status before each test
    mockNavigatorOnline(true)
  })

  it('shows online status when navigator is online', () => {
    const { getByText } = renderWithSetup(PWAStatus)
    expect(getByText('Online')).toBeTruthy()
  })

  it('shows offline status when navigator is offline', () => {
    mockNavigatorOnline(false)
    const { getByText } = renderWithSetup(PWAStatus)
    expect(getByText('Offline')).toBeTruthy()
  })

  it('shows "Ready for offline" when offline ready', async () => {
    const { getByText } = renderWithSetup(PWAStatus)
    // Wait for component to mount and process offline ready status
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(getByText('Ready for offline')).toBeTruthy()
  })
})
