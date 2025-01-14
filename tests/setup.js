import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'

// Clean up after each test
afterEach(() => {
  cleanup()
  localStorage.clear()
})
