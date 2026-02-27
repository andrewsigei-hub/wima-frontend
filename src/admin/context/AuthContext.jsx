import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  const [token, setToken] = useState(() => localStorage.getItem('wima_admin_token'))
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('wima_admin_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem('wima_admin_token', newToken)
    localStorage.setItem('wima_admin_user', JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('wima_admin_token')
    localStorage.removeItem('wima_admin_user')
    setToken(null)
    setUser(null)
    navigate('/admin/login')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
