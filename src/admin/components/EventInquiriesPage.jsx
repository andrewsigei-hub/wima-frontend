import { useState, useEffect, useCallback } from 'react'
import {
  ChevronLeft, ChevronRight, X, CheckCheck, MessageSquareDot,
  Archive, ArchiveRestore, AlertCircle, Eye, EyeOff, Undo2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import adminApi from '../lib/adminApi'
import {
  fmt, fmtDate, STATUS_TABS, StatusBadge, VENUE_LABELS,
  Th, IconBtn, PagBtn, ActionBtn,
} from './adminShared'

const EVENT_TYPES = ['all', 'wedding', 'corporate', 'birthday', 'reunion', 'graduation', 'other']
const LIMIT = 20

// Status an item is restored to when "unarchived" — no prior status is tracked,
// so it lands back in the active inbox as "read" rather than re-flagged "new".
const UNARCHIVE_STATUS = 'read'

// Same reasoning applies to undoing a reply — it steps back to "read", not "new".
const UNDO_REPLY_STATUS = 'read'

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
          {inquiry.status === 'new' ? (
            <ActionBtn
              icon={<Eye className="w-4 h-4" />}
              label="Mark as Read"
              loading={actioning === 'mark-read'}
              onClick={() => action('mark-read')}
              variant="secondary"
            />
          ) : inquiry.status === 'read' ? (
            <ActionBtn
              icon={<EyeOff className="w-4 h-4" />}
              label="Mark as Unread"
              loading={actioning === 'mark-unread'}
              onClick={() => action('mark-unread')}
              variant="secondary"
            />
          ) : null}
          {inquiry.status === 'replied' ? (
            <ActionBtn
              icon={<Undo2 className="w-4 h-4" />}
              label="Undo Reply"
              loading={actioning === 'undo-reply'}
              onClick={() => action('undo-reply')}
              variant="secondary"
            />
          ) : inquiry.status !== 'archived' ? (
            <ActionBtn
              icon={<CheckCheck className="w-4 h-4" />}
              label="Mark as Replied"
              loading={actioning === 'mark-replied'}
              onClick={() => action('mark-replied')}
              variant="primary"
            />
          ) : null}
          {inquiry.status === 'archived' ? (
            <ActionBtn
              icon={<ArchiveRestore className="w-4 h-4" />}
              label="Unarchive"
              loading={actioning === 'unarchive'}
              onClick={() => action('unarchive')}
              variant="secondary"
            />
          ) : (
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
      const statusMap = {
        'mark-read': 'read',
        'mark-unread': 'new',
        'mark-replied': 'replied',
        'undo-reply': UNDO_REPLY_STATUS,
        archive: 'archived',
        unarchive: UNARCHIVE_STATUS,
      }
      await adminApi.patch(`/admin/event-inquiries/${id}`, { status: statusMap[actionType] }, token)
      await fetchInquiries()
      setSelected((prev) => {
        if (!prev || prev.id !== id) return prev
        return { ...prev, status: statusMap[actionType] ?? prev.status }
      })
    } catch {
      // silently ignore — table will stay in current state
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
          <AlertCircle className="w-5 h-5 shrink-0" />
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
                        {inq.status === 'new' ? (
                          <IconBtn title="Mark Read" onClick={() => handleAction(inq.id, 'mark-read')}>
                            <Eye className="w-4 h-4" />
                          </IconBtn>
                        ) : inq.status === 'read' ? (
                          <IconBtn title="Mark Unread" onClick={() => handleAction(inq.id, 'mark-unread')}>
                            <EyeOff className="w-4 h-4" />
                          </IconBtn>
                        ) : null}
                        {inq.status === 'replied' ? (
                          <IconBtn title="Undo Reply" onClick={() => handleAction(inq.id, 'undo-reply')}>
                            <Undo2 className="w-4 h-4" />
                          </IconBtn>
                        ) : inq.status !== 'archived' ? (
                          <IconBtn title="Mark Replied" onClick={() => handleAction(inq.id, 'mark-replied')}>
                            <CheckCheck className="w-4 h-4" />
                          </IconBtn>
                        ) : null}
                        {inq.status === 'archived' ? (
                          <IconBtn title="Unarchive" onClick={() => handleAction(inq.id, 'unarchive')}>
                            <ArchiveRestore className="w-4 h-4" />
                          </IconBtn>
                        ) : (
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
              <PagBtn onClick={() => setOffset((o) => Math.max(0, o - LIMIT))} disabled={offset === 0}>
                <ChevronLeft className="w-4 h-4" /> Prev
              </PagBtn>
              <PagBtn onClick={() => setOffset((o) => o + LIMIT)} disabled={offset + LIMIT >= total}>
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
