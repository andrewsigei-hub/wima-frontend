import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import adminApi from '../lib/adminApi'

export default function LoginPage() {
  const { token, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('')

  // Already logged in → redirect
  useEffect(() => {
    if (token) navigate('/admin/dashboard', { replace: true })
  }, [token, navigate])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const data = await adminApi.post('/auth/login', {
        email: form.email.trim(),
        password: form.password,
      })
      login(data.token, data.user)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Login failed. Please try again.')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-heritage-gold-soft/60 bg-[#fbf8ef] focus:ring-2 focus:ring-botanical focus:border-botanical outline-none transition-all px-4 py-3 text-slate-800'

  return (
    <div className="min-h-screen bg-[#F7F5EE] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4 shadow-lg">
            <Leaf className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl text-primary font-bold">WIMA</h1>
          <p className="text-sm text-slate-500 mt-1 tracking-widest uppercase">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-heritage-gold-soft/40 p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Sign in to continue</h2>

          {status === 'error' && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="admin@wimaserenity.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-12`}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          WIMA Serenity Gardens &mdash; Staff Access Only
        </p>
      </div>
    </div>
  )
}
