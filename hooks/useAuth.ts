'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const isInitialLoad = useRef(true)

  useEffect(() => {
    // Initial load
    const stored = localStorage.getItem('admin-auth')
    if (stored === 'true') {
      setIsAdmin(true)
    }
    setLoading(false)
  }, [])

  // Listener für Änderungen (andere Tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-auth') {
        setIsAdmin(e.newValue === 'true')
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const loginAsAdmin = useCallback((password: string) => {
    const ADMIN_PASSWORD = 'admin654321'
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true')
      
      // 🔥 WICHTIG: Custom Event für EINEN Tab dispatchen
      window.dispatchEvent(new CustomEvent('admin-auth-changed', { 
        detail: { isAdmin: true } 
      }))
      
      setIsAdmin(true)
      return { success: true }
    }
    return { success: false, error: 'Falsches Passwort!' }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin-auth')
    
    // 🔥 Custom Event für EINEN Tab
    window.dispatchEvent(new CustomEvent('admin-auth-changed', { 
      detail: { isAdmin: false } 
    }))
    
    setIsAdmin(false)
  }, [])

  // 🔥 Listener für Custom Events (IMMER aktualisiert)
  useEffect(() => {
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsAdmin(customEvent.detail.isAdmin)
    }
    
    window.addEventListener('admin-auth-changed', handleAuthChange)
    return () => window.removeEventListener('admin-auth-changed', handleAuthChange)
  }, [])

  return { isAdmin, loading, loginAsAdmin, logout }
}
