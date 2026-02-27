import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, CalendarDays, BedDouble, TrendingUp, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import adminApi from '../lib/adminApi'

function StatCard({ icon: Icon, iconBg, title, main, mainLabel, sub, subLabel, accent }) {
  return (
    <div className="bg-white rounded-xl border border-heritage-gold-soft/40 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {accent !== undefined && (
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5">
            {accent} new
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-0.5">{main ?? '—'}</p>
        {mainLabel && <p className="text-xs text-slate-400 mt-0.5">{mainLabel}</p>}
      </div>
      {sub !== undefined && (
        <div className="pt-3 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{sub}</span> {subLabel}
          </p>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi
      .get('/admin/dashboard', token)
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [token])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-slate-500 mt-1 text-sm">Overview of inquiries and property status</p>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-slate-500">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading…
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {stats && (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard
              icon={MessageSquare}
              iconBg="bg-primary"
              title="Room Inquiries"
              main={stats.inquiries?.total}
              accent={stats.inquiries?.new}
              sub={stats.inquiries?.replied}
              subLabel="replied"
            />
            <StatCard
              icon={CalendarDays}
              iconBg="bg-heritage-gold"
              title="Event Inquiries"
              main={stats.event_inquiries?.total}
              accent={stats.event_inquiries?.new}
              sub={stats.event_inquiries?.last_7_days}
              subLabel="in last 7 days"
            />
            <StatCard
              icon={BedDouble}
              iconBg="bg-sage"
              title="Rooms"
              main={stats.rooms?.total}
              mainLabel="total rooms"
              sub={stats.rooms?.featured}
              subLabel="featured"
            />
            <StatCard
              icon={TrendingUp}
              iconBg="bg-primary-light"
              title="This Week"
              main={(stats.inquiries?.last_7_days ?? 0) + (stats.event_inquiries?.last_7_days ?? 0)}
              mainLabel="new inquiries"
              sub={stats.inquiries?.read}
              subLabel="marked read"
            />
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-heritage-gold-soft/40 p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/inquiries"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-secondary text-sm font-medium hover:bg-primary-dark transition-all"
              >
                View Inquiries <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin/event-inquiries"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-botanical/40 text-primary text-sm font-medium hover:bg-botanical/5 transition-all"
              >
                View Events <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin/rooms"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-botanical/40 text-primary text-sm font-medium hover:bg-botanical/5 transition-all"
              >
                Manage Rooms <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
