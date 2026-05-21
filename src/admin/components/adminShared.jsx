// Shared UI primitives used across admin pages
import { Eye, CheckCheck, Archive } from 'lucide-react'

// ── Date helpers ──────────────────────────────────────────────────────────────

export function fmt(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function fmtDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

// ── Status ────────────────────────────────────────────────────────────────────

export const STATUS_TABS = ['all', 'new', 'read', 'replied', 'archived']

export const STATUS_BADGE = {
  new:      'bg-blue-50 text-blue-700 border-blue-200',
  read:     'bg-slate-100 text-slate-600 border-slate-200',
  replied:  'bg-green-50 text-green-700 border-green-200',
  archived: 'bg-slate-50 text-slate-400 border-slate-200',
}

export function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 capitalize ${STATUS_BADGE[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

// ── Table primitives ──────────────────────────────────────────────────────────

export function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
      {children}
    </th>
  )
}

export function IconBtn({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-botanical/5 transition-all"
    >
      {children}
    </button>
  )
}

export function PagBtn({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm border border-heritage-gold-soft/60 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
    >
      {children}
    </button>
  )
}

// ── Detail panel primitives ───────────────────────────────────────────────────

export function ActionBtn({ icon, label, loading, onClick, variant }) {
  const base = 'flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary:   'bg-primary text-secondary hover:bg-primary-dark',
    secondary: 'border border-botanical/40 text-primary hover:bg-botanical/5',
    danger:    'border border-red-200 text-red-600 hover:bg-red-50',
  }
  return (
    <button onClick={onClick} disabled={loading} className={`${base} ${variants[variant]}`}>
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : icon}
      {label}
    </button>
  )
}

export function DetailPanelActions({ inquiry, actioning, onAction }) {
  return (
    <>
      {inquiry.status === 'new' && (
        <ActionBtn
          icon={<Eye className="w-4 h-4" />}
          label="Mark as Read"
          loading={actioning === 'mark-read'}
          onClick={() => onAction('mark-read')}
          variant="secondary"
        />
      )}
      {inquiry.status !== 'replied' && inquiry.status !== 'archived' && (
        <ActionBtn
          icon={<CheckCheck className="w-4 h-4" />}
          label="Mark as Replied"
          loading={actioning === 'mark-replied'}
          onClick={() => onAction('mark-replied')}
          variant="primary"
        />
      )}
      {inquiry.status !== 'archived' && (
        <ActionBtn
          icon={<Archive className="w-4 h-4" />}
          label="Archive"
          loading={actioning === 'archive'}
          onClick={() => onAction('archive')}
          variant="danger"
        />
      )}
    </>
  )
}
