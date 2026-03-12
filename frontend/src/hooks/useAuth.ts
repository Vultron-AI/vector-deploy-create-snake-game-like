/**
 * Auth State Hook
 *
 * DO NOT MODIFY THIS FILE - It is a protected boilerplate file.
 *
 * Provides authentication state and actions for the UGA frontend.
 * Points to Vector's hosted login page which handles all auth methods.
 *
 * Auth state is managed via HttpOnly cookies (not localStorage).
 * The hook checks auth status by calling /api/accounts/me/ since
 * HttpOnly cookies cannot be read from JavaScript.
 *
 * Usage:
 *   const { isAuthenticated, user, logout, loginUrl, signupUrl } = useAuth()
 */

import { useState, useEffect, useCallback } from 'react'
import { api } from '@/services/api'

interface AuthUser {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  picture: string
}

const AUTH_PROXY_URL = import.meta.env.VITE_AUTH_PROXY_URL || ''
const APP_ID = import.meta.env.VITE_APP_ID || ''
const APP_VERSION_ID = import.meta.env.VITE_APP_VERSION_ID || ''

function buildAuthUrl(mode: 'login' | 'signup'): string {
  const redirectUri = `${window.location.origin}/auth/callback`
  const params = new URLSearchParams({
    app_id: APP_ID,
    app_version_id: APP_VERSION_ID,
    redirect_uri: redirectUri,
    mode,
  })
  return `${AUTH_PROXY_URL}/login?${params}`
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [authVersion, setAuthVersion] = useState(0)

  // Listen for auth_complete messages from popup windows (iframe auth flow)
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'auth_complete') {
        setAuthVersion((v) => v + 1)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Check auth state via server — cannot read HttpOnly cookies from JS
  useEffect(() => {
    setLoading(true)
    api
      .get<AuthUser>('/api/accounts/me/')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [authVersion])

  const isAuthenticated = user !== null

  const logout = useCallback(() => {
    api.post('/api/accounts/logout/').finally(() => {
      setUser(null)
      window.location.href = '/'
    })
  }, [])

  const loginUrl = buildAuthUrl('login')
  const signupUrl = buildAuthUrl('signup')

  return { isAuthenticated, user, loading, logout, loginUrl, signupUrl }
}
