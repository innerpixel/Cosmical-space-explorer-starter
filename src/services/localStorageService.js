import { encryptData, decryptData } from './crypto'

const STORAGE_KEYS = {
  USER: 'user_data',
  AUTH: 'auth_token',
  SETTINGS: 'user_settings'
}

class LocalStorageService {
  setItem(key, value) {
    try {
      const encryptedValue = encryptData(value)
      if (encryptedValue) {
        localStorage.setItem(key, encryptedValue)
        return true
      }
      return false
    } catch (error) {
      console.error('Error setting encrypted item:', error)
      return false
    }
  }

  getItem(key) {
    try {
      const encryptedValue = localStorage.getItem(key)
      if (!encryptedValue) return null
      return decryptData(encryptedValue)
    } catch (error) {
      console.error('Error getting encrypted item:', error)
      return null
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing item:', error)
      return false
    }
  }

  clear() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => this.removeItem(key))
      return true
    } catch (error) {
      console.error('Error clearing storage:', error)
      return false
    }
  }
}

export const storageService = new LocalStorageService()
export { STORAGE_KEYS }
