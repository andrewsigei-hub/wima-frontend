import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Star, StarOff, Power, PowerOff, AlertCircle, X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import adminApi from '../lib/adminApi'

const ROOM_TYPES = ['premier', 'cottage', 'double', 'standard', 'deluxe', 'executive', 'family']

const EMPTY_FORM = {
  name: '',
  slug: '',
  type: 'standard',
  description: '',
  capacity: '',
  price_per_night: '',
  breakfast_included: true,
  is_featured: false,
  is_active: true,
  amenities: [],
  images: [],
}

function slugify(str) {
  return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function RoomModal({ room, onClose, onSaved, token }) {
  const isEdit = Boolean(room)
  const [form, setForm] = useState(
    room
      ? {
          name: room.name || '',
          slug: room.slug || '',
          type: room.type || 'standard',
          description: room.description || '',
          capacity: room.capacity ?? '',
          price_per_night: room.price_per_night ?? '',
          breakfast_included: room.breakfast_included ?? true,
          is_featured: room.is_featured ?? false,
          is_active: room.is_active ?? true,
          amenities: Array.isArray(room.amenities) ? [...room.amenities] : [],
          images: Array.isArray(room.images) ? [...room.images] : [],
        }
      : { ...EMPTY_FORM }
  )
  const [amenityInput, setAmenityInput] = useState('')
  const [imageInput, setImageInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleNameChange = (e) => {
    const val = e.target.value
    set('name', val)
    if (!isEdit) set('slug', slugify(val))
  }

  const addAmenity = () => {
    const val = amenityInput.trim()
    if (val && !form.amenities.includes(val)) {
      set('amenities', [...form.amenities, val])
    }
    setAmenityInput('')
  }

  const removeAmenity = (a) => set('amenities', form.amenities.filter((x) => x !== a))

  const addImage = () => {
    const val = imageInput.trim()
    if (val && !form.images.includes(val)) {
      set('images', [...form.images, val])
    }
    setImageInput('')
  }

  const removeImage = (url) => set('images', form.images.filter((x) => x !== url))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const payload = {
      ...form,
      capacity: parseInt(form.capacity, 10),
      price_per_night: parseInt(form.price_per_night, 10),
    }

    try {
      if (isEdit) {
        await adminApi.patch(`/admin/rooms/${room.id}`, payload, token)
      } else {
        await adminApi.post('/admin/rooms', payload, token)
      }
      onSaved()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Failed to save room')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-heritage-gold-soft/60 bg-[#fbf8ef] focus:ring-2 focus:ring-botanical focus:border-botanical outline-none transition-all px-4 py-2.5 text-slate-800 text-sm'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">{isEdit ? 'Edit Room' : 'Add New Room'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {status === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Name *</Label>
              <input
                className={inputClass}
                value={form.name}
                onChange={handleNameChange}
                placeholder="Premier Room"
                required
              />
            </div>

            <div className="col-span-2">
              <Label>Slug *</Label>
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) => set('slug', slugify(e.target.value))}
                placeholder="premier-room"
                required
              />
            </div>

            <div>
              <Label>Type *</Label>
              <select
                className={inputClass}
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
                required
              >
                {ROOM_TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Capacity *</Label>
              <input
                type="number"
                className={inputClass}
                value={form.capacity}
                onChange={(e) => set('capacity', e.target.value)}
                min={1}
                max={20}
                required
              />
            </div>

            <div className="col-span-2">
              <Label>Price per Night (KSh) *</Label>
              <input
                type="number"
                className={inputClass}
                value={form.price_per_night}
                onChange={(e) => set('price_per_night', e.target.value)}
                min={0}
                required
              />
            </div>

            <div className="col-span-2">
              <Label>Description *</Label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-5">
            <Checkbox
              id="breakfast"
              checked={form.breakfast_included}
              onChange={(v) => set('breakfast_included', v)}
              label="Breakfast Included"
            />
            <Checkbox
              id="featured"
              checked={form.is_featured}
              onChange={(v) => set('is_featured', v)}
              label="Featured"
            />
            {isEdit && (
              <Checkbox
                id="active"
                checked={form.is_active}
                onChange={(v) => set('is_active', v)}
                label="Active"
              />
            )}
          </div>

          {/* Amenities */}
          <div>
            <Label>Amenities</Label>
            <div className="flex gap-2 mb-2">
              <input
                className={inputClass}
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="e.g. WiFi"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addAmenity() }
                }}
              />
              <button
                type="button"
                onClick={addAmenity}
                className="px-3 py-2 rounded-lg bg-botanical/10 text-primary text-sm font-medium hover:bg-botanical/20 transition-all flex-shrink-0"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((a) => (
                <span key={a} className="flex items-center gap-1 bg-botanical/10 text-primary text-xs rounded-full px-3 py-1">
                  {a}
                  <button type="button" onClick={() => removeAmenity(a)} className="hover:text-red-500 transition-colors ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <Label>Image URLs</Label>
            <div className="flex gap-2 mb-2">
              <input
                className={inputClass}
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://…"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addImage() }
                }}
              />
              <button
                type="button"
                onClick={addImage}
                className="px-3 py-2 rounded-lg bg-botanical/10 text-primary text-sm font-medium hover:bg-botanical/20 transition-all flex-shrink-0"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {form.images.map((url) => (
                <div key={url} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5 text-xs">
                  <span className="flex-1 truncate text-slate-600">{url}</span>
                  <button type="button" onClick={() => removeImage(url)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="room-form"
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="px-5 py-2 rounded-lg bg-primary text-secondary text-sm font-semibold hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Saving…
              </span>
            ) : isEdit ? 'Save Changes' : 'Create Room'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Label({ children }) {
  return <label className="block text-xs font-medium text-slate-600 mb-1">{children}</label>
}

function Checkbox({ id, checked, onChange, label }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-heritage-gold-soft accent-primary"
      />
      {label}
    </label>
  )
}

function IconBtn({ children, onClick, title, danger }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-all ${
        danger
          ? 'text-slate-400 hover:text-red-500 hover:bg-red-50'
          : 'text-slate-400 hover:text-primary hover:bg-botanical/5'
      }`}
    >
      {children}
    </button>
  )
}

export default function RoomsPage() {
  const { token, user } = useAuth()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editRoom, setEditRoom] = useState(null)   // room object for edit
  const [showCreate, setShowCreate] = useState(false)
  const [actioning, setActioning] = useState(null) // id of room being actioned

  const fetchRooms = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await adminApi.get('/admin/rooms?include_inactive=true', token)
      setRooms(data.rooms)
    } catch (err) {
      setError(err.message || 'Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchRooms() }, [fetchRooms])

  const toggleFeatured = async (room) => {
    setActioning(room.id)
    try {
      await adminApi.post(`/admin/rooms/${room.id}/toggle-featured`, {}, token)
      await fetchRooms()
    } catch (err) {
      console.error(err)
    } finally {
      setActioning(null)
    }
  }

  const toggleActive = async (room) => {
    setActioning(room.id)
    try {
      if (room.is_active) {
        await adminApi.del(`/admin/rooms/${room.id}`, token)
      } else {
        await adminApi.post(`/admin/rooms/${room.id}/activate`, {}, token)
      }
      await fetchRooms()
    } catch (err) {
      console.error(err)
    } finally {
      setActioning(null)
    }
  }

  const isManager = user?.role === 'manager' || user?.role === 'admin'
  const isAdmin = user?.role === 'admin'

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Rooms</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage accommodation listings</p>
        </div>
        {isManager && (
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-secondary text-sm font-semibold hover:bg-primary-dark transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Room
          </button>
        )}
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
            Loading rooms…
          </div>
        ) : rooms.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">
            No rooms found. Add one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Price / Night</Th>
                  <Th>Capacity</Th>
                  <Th>Featured</Th>
                  <Th>Active</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className={`hover:bg-slate-50/50 transition-colors ${!room.is_active ? 'opacity-50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800 whitespace-nowrap">{room.name}</p>
                      <p className="text-slate-400 text-xs whitespace-nowrap">{room.slug}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-600 whitespace-nowrap">{room.type}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">
                      KSh {Number(room.price_per_night).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{room.capacity} guests</td>
                    <td className="px-4 py-3">
                      {room.is_featured ? (
                        <span className="text-xs font-medium bg-gold/20 text-gold border border-gold/30 rounded-full px-2.5 py-0.5">
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {room.is_active ? (
                        <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200 rounded-full px-2.5 py-0.5">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {isManager && (
                          <IconBtn title="Edit" onClick={() => setEditRoom(room)}>
                            <Pencil className="w-4 h-4" />
                          </IconBtn>
                        )}
                        <IconBtn
                          title={room.is_featured ? 'Remove from featured' : 'Mark as featured'}
                          onClick={() => toggleFeatured(room)}
                          danger={false}
                        >
                          {actioning === room.id ? (
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                          ) : room.is_featured ? (
                            <StarOff className="w-4 h-4" />
                          ) : (
                            <Star className="w-4 h-4" />
                          )}
                        </IconBtn>
                        {(isAdmin || isManager) && (
                          <IconBtn
                            title={room.is_active ? 'Deactivate' : 'Activate'}
                            onClick={() => toggleActive(room)}
                            danger={room.is_active}
                          >
                            {room.is_active ? (
                              <PowerOff className="w-4 h-4" />
                            ) : (
                              <Power className="w-4 h-4" />
                            )}
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
      </div>

      {/* Create modal */}
      {showCreate && (
        <RoomModal
          room={null}
          token={token}
          onClose={() => setShowCreate(false)}
          onSaved={() => { setShowCreate(false); fetchRooms() }}
        />
      )}

      {/* Edit modal */}
      {editRoom && (
        <RoomModal
          room={editRoom}
          token={token}
          onClose={() => setEditRoom(null)}
          onSaved={() => { setEditRoom(null); fetchRooms() }}
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
