import { useState } from 'react'
import api from '../lib/api'

const inputClass =
  'w-full rounded-lg border border-heritage-gold-soft/60 bg-[#fbf8ef] focus:ring-2 focus:ring-botanical focus:border-botanical outline-none transition-all px-4 py-3 text-slate-800'

const today = new Date().toISOString().split('T')[0]

export default function BookingModal({ room, isPackage, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    check_in: '', check_out: '',
    guests: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const guestsNote = isPackage && form.guests ? ` Guest count: ${form.guests}.` : ''
    const defaultMessage = isPackage
      ? `Booking inquiry for the entire property package.${guestsNote}`
      : `Booking inquiry for ${room?.name}.`

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      inquiry_type: 'booking',
      message: form.message.trim() || defaultMessage,
      ...(form.check_in  && { check_in: form.check_in }),
      ...(form.check_out && { check_out: form.check_out }),
      ...(!isPackage && form.guests && { guests: parseInt(form.guests, 10) }),
      ...(!isPackage && room?.id && { room_id: room.id }),
    }

    try {
      await api.post('/inquiries', payload)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const minCheckout = form.check_in
    ? new Date(new Date(form.check_in + 'T00:00:00').getTime() + 86400000).toISOString().split('T')[0]
    : today

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-xl font-bold text-primary">
            {isPackage ? 'Book Entire Property' : `Book ${room?.name}`}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
            <p className="text-lg font-semibold text-primary mb-2">Inquiry sent!</p>
            <p className="text-slate-600 mb-6">We&apos;ll be in touch with you shortly.</p>
            <button onClick={onClose} className="text-primary font-semibold underline underline-offset-2">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+254700000000" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Check-in</label>
                <input
                  name="check_in" type="date" value={form.check_in} onChange={handleChange}
                  min={today} className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Check-out</label>
                <input
                  name="check_out" type="date" value={form.check_out} onChange={handleChange}
                  min={minCheckout} className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Guests</label>
              <input
                name="guests" type="number" min="1"
                max={isPackage ? undefined : 10}
                value={form.guests} onChange={handleChange}
                placeholder="2" className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="3" placeholder="Any special requests or questions…" className={inputClass} />
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-secondary py-3 rounded-lg font-bold hover:bg-primary-light transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  Sending…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">send</span>
                  Send Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
