import { useState, useEffect, useCallback } from 'react'
import {
  ChevronLeft, ChevronRight, X, CheckCheck, MessageSquareDot,
  Archive, AlertCircle, Eye,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import adminApi from '../lib/adminApi'

const STATUS_TABS = ['all', 'new', 'read', 'replied', 'archived']
const EVENT_TYPES = ['all', 'wedding', 'corporate', 'birthday', 'reunion', 'graduation', 'other']
const LIMIT = 20

const STATUS_BADGE = {
  new:      'bg-blue-50 text-blue-700 border-blue-200',
  read:     'bg-slate-100 text-slate-600 border-slate-200',
  replied:  'bg-green-50 text-green-700 border-green-200',
  archived: 'bg-slate-50 text-slate-400 border-slate-200',
}

const VENUE_LABELS = {
  field_1: 'Main Event Field',
  field_2: 'Garden Terrace',
}

function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 capitalize ${STATUS_BADGE[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

function DetailPanel({ inquiry, onClose, onAction }) {
  const [actioning, setActioning] = useState('')

  const action = async (type) => {
    setActioning(type)
    await onAction(inquiry.id, type)
    setActioning('')
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Event Inquiry Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <StatusBadge status={inquiry.status} />
          <span className="text-xs text-slate-400"># {inquiry.id}</span>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <Field label="Name" value={inquiry.name} />
          <Field label="Email" value={inquiry.email} />
          <Field label="Phone" value={inquiry.phone} />
          <Field label="Event Type" value={inquiry.event_type} />
          <Field label="Event Date" value={fmt(inquiry.event_date)} />
          <Field label="Guest Count" value={inquiry.guest_count ? `${inquiry.guest_count} guests` : '—'} />
          <Field
            label="Venue Preference"
            value={inquiry.venue_preference ? VENUE_LABELS[inquiry.venue_preference] || inquiry.venue_preference : 'No preference'}
          />
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Message</p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 rounded-lg p-3">
              {inquiry.message}
            </p>
          </div>
          <Field label="Received" value={fmtDate(inquiry.created_at)} />
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex flex-col gap-2">
          {inquiry.status === 'new' && (
            <ActionBtn
              icon={<Eye className="w-4 h-4" />}
              label="Mark as Read"
              loading={actioning === 'mark-read'}
              onClick={() => action('mark-read')}
              variant="secondary"
            />
          )}
          {inquiry.status !== 'replied' && inquiry.status !== 'archived' && (
            <ActionBtn
              icon={<CheckCheck className="w-4 h-4" />}
              label="Mark as Replied"
              loading={actioning === 'mark-replied'}
              onClick={() => action('mark-replied')}
              variant="primary"
            />
          )}
          {inquiry.status !== 'archived' && (
            <ActionBtn
              icon={<Archive className="w-4 h-4" />}
              label="Archive"
              loading={actioning === 'archive'}
              onClick={() => action('archive')}
              variant="danger"
            />
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-slate-800 capitalize">{value || '—'}</p>
    </div>
  )
}

function ActionBtn({ icon, label, loading, onClick, variant }) {
  const base = 'flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-secondary hover:bg-primary-dark',
    secondary: 'border border-botanical/40 text-primary hover:bg-botanical/5',
    danger: 'border border-red-200 text-red-600 hover:bg-red-50',
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

function fmt(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function fmtDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function EventInquiriesPage() {
  const { token } = useAuth()

  const [inquiries, setInquiries] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ limit: LIMIT, offset })
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (typeFilter !== 'all') params.set('event_type', typeFilter)

    try {
      const data = await adminApi.get(`/admin/event-inquiries?${params}`, token)
      setInquiries(data.event_inquiries)
      setTotal(data.total)
    } catch (err) {
      setError(err.message || 'Failed to load event inquiries')
    } finally {
      setLoading(false)
    }
  }, [token, offset, statusFilter, typeFilter])

  useEffect(() => { fetchInquiries() }, [fetchInquiries])
  useEffect(() => { setOffset(0) }, [statusFilter, typeFilter])

  const handleAction = async (id, actionType) => {
    try {
      const statusMap = { 'mark-read': 'read', 'mark-replied': 'replied', 'archive': 'archived' }
      await adminApi.patch(`/admin/event-inquiries/${id}`, { status: statusMap[actionType] }, token)
      await fetchInquiries()
      setSelected((prev) => {
        if (!prev || prev.id !== id) return prev
        const updated = { ...prev }
        if (actionType === 'mark-read') updated.status = 'read'
        else if (actionType === 'mark-replied') updated.status = 'replied'
        else if (actionType === 'archive') updated.status = 'archived'
        return updated
      })
    } catch (err) {
      console.error(err)
    }
  }

  const totalPages = Math.ceil(total / LIMIT)
  const currentPage = Math.floor(offset / LIMIT) + 1

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-primary">Event Inquiries</h1>
        <p className="text-slate-500 mt-1 text-sm">Weddings, corporate events, and more</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-heritage-gold-soft/40 p-4 mb-5 flex flex-wrap gap-4 items-center">
        <div className="flex gap-1 flex-wrap">
          {STATUS_TABS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                statusFilter === s
                  ? 'bg-primary text-secondary'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="ml-auto text-sm border border-heritage-gold-soft/60 rounded-lg px-3 py-1.5 bg-[#fbf8ef] text-slate-700 focus:outline-none focus:ring-2 focus:ring-botanical"
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm mb-5">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-heritage-gold-soft/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-500 px-6 py-10 text-sm">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading event inquiries…
          </div>
        ) : inquiries.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">
            No event inquiries found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <Th>Name</Th>
                  <Th>Contact</Th>
                  <Th>Event Type</Th>
                  <Th>Date / Guests</Th>
                  <Th>Venue</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{inq.name}</td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 whitespace-nowrap">{inq.email}</p>
                      <p className="text-slate-400 text-xs whitespace-nowrap">{inq.phone}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600 whitespace-nowrap">{inq.event_type}</td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 whitespace-nowrap">{fmt(inq.event_date)}</p>
                      <p className="text-slate-400 text-xs whitespace-nowrap">{inq.guest_count} guests</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                      {inq.venue_preference ? VENUE_LABELS[inq.venue_preference] || inq.venue_preference : '—'}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={inq.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <IconBtn title="View" onClick={() => setSelected(inq)}>
                          <MessageSquareDot className="w-4 h-4" />
                        </IconBtn>
                        {inq.status === 'new' && (
                          <IconBtn title="Mark Read" onClick={() => handleAction(inq.id, 'mark-read')}>
                            <Eye className="w-4 h-4" />
                          </IconBtn>
                        )}
                        {inq.status !== 'replied' && inq.status !== 'archived' && (
                          <IconBtn title="Mark Replied" onClick={() => handleAction(inq.id, 'mark-replied')}>
                            <CheckCheck className="w-4 h-4" />
                          </IconBtn>
                        )}
                        {inq.status !== 'archived' && (
                          <IconBtn title="Archive" onClick={() => handleAction(inq.id, 'archive')}>
                            <Archive className="w-4 h-4" />
                          </IconBtn>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && total > LIMIT && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Page {currentPage} of {totalPages} &bull; {total} total
            </p>
            <div className="flex gap-2">
              <PagBtn
                onClick={() => setOffset((o) => Math.max(0, o - LIMIT))}
                disabled={offset === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </PagBtn>
              <PagBtn
                onClick={() => setOffset((o) => o + LIMIT)}
                disabled={offset + LIMIT >= total}
              >
                Next <ChevronRight className="w-4 h-4" />
              </PagBtn>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <DetailPanel
          inquiry={selected}
          onClose={() => setSelected(null)}
          onAction={handleAction}
        />
      )}
    </div>
  )
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
      {children}
    </th>
  )
}

function IconBtn({ children, onClick, title }) {
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

function PagBtn({ children, onClick, disabled }) {
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
