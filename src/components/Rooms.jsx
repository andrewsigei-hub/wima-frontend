import { useState, useEffect } from 'react'
import api from '../lib/api'

// Map room type → tag label & colour (display-only)
const TAG_MAP = {
  standard: { tag: 'Value',   tagColor: 'bg-cream text-primary' },
  double:   { tag: 'Value',   tagColor: 'bg-cream text-primary' },
  premier:  { tag: 'Popular', tagColor: 'bg-gold text-white' },
  cottage:  { tag: 'Private', tagColor: 'bg-secondary text-primary' },
  deluxe:   { tag: 'Deluxe',  tagColor: 'bg-gold text-white' },
}

// Map common amenity strings to Material Symbols icons
const AMENITY_ICON_MAP = {
  'Double Bed':    'bed',
  'King Bed':      'king_bed',
  'En-suite':      'shower',
  'Breakfast':     'restaurant',
  'WiFi':          'wifi',
  'TV':            'tv',
  'Standalone':    'cottage',
  'Garden View':   'local_florist',
  'AC':            'ac_unit',
  'Balcony':       'balcony',
  'Fireplace':     'fireplace',
}

function amenityIcon(label) {
  return AMENITY_ICON_MAP[label] || 'check'
}

// Format integer price as "5,500"
function formatPrice(n) {
  return Number(n).toLocaleString()
}

// Hardcoded fallbacks — used when the API is unreachable
const FALLBACK_ROOMS = [
  {
    id: null,
    name: 'Standard Double',
    type: 'standard',
    description: 'Comfortable room with double bed, perfect for couples or solo travelers.',
    price_per_night: 5500,
    amenities: ['Double Bed', 'En-suite', 'Breakfast'],
  },
  {
    id: null,
    name: 'Premier Room',
    type: 'premier',
    description: 'Spacious premier room with enhanced amenities and beautiful garden views.',
    price_per_night: 6500,
    amenities: ['King Bed', 'En-suite', 'Breakfast'],
  },
  {
    id: null,
    name: 'Garden Cottage',
    type: 'cottage',
    description: 'Secluded standalone cottage surrounded by our beautiful gardens.',
    price_per_night: 6500,
    amenities: ['Standalone', 'En-suite', 'Breakfast'],
  },
]

const FALLBACK_PKG = {
  id: null,
  name: 'Home Away From Home Package',
  tagline: 'One estate. All yours.',
  short_description:
    'Reserve the entire property exclusively for your group — all 7 rooms, the gardens, and complete privacy. Perfect for family reunions, group getaways, corporate retreats, and wedding parties.',
  price_per_night: 40000,
  original_price: 42500,
  savings: 2500,
  capacity: 20,
  rooms_included: [
    '3x Standard Double Rooms',
    '2x Premier Rooms',
    '1x Garden Cottage',
    '1x Family Room',
  ],
  benefits: [
    'Complete privacy — no other guests',
    'Breakfast for every guest, every morning',
    'Full garden & grounds access',
    'Free parking included',
    'Ideal for reunions, retreats & wedding parties',
  ],
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

const inputClass =
  'w-full rounded-lg border border-heritage-gold-soft/60 bg-[#fbf8ef] focus:ring-2 focus:ring-botanical focus:border-botanical outline-none transition-all px-4 py-3 text-slate-800'

const today = new Date().toISOString().split('T')[0]

function BookingModal({ room, isPackage, onClose }) {
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

    // For package bookings the /inquiries endpoint caps guests at 10 but the
    // package supports 20 — fold guest count into the message instead.
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
      // Only send guests for individual room bookings (backend caps at 10)
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

  // Check-out must be strictly after check-in (backend enforces check_out > check_in)
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
        {/* Header */}
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
              <input name="guests" type="number" min="1" max={isPackage ? undefined : 10} value={form.guests} onChange={handleChange} placeholder="2" className={inputClass} />
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

// ─── Main Component ───────────────────────────────────────────────────────────

const Rooms = () => {
  const [rooms, setRooms] = useState(FALLBACK_ROOMS)
  const [pkg, setPkg]     = useState(FALLBACK_PKG)
  const [bookingTarget, setBookingTarget] = useState(null) // { room, isPackage }

  useEffect(() => {
    api.get('/rooms/featured')
      .then(data => { if (data.rooms?.length) setRooms(data.rooms) })
      .catch(() => { /* silently use fallback */ })

    api.get('/packages/featured')
      .then(data => { if (data.packages?.length) setPkg(data.packages[0]) })
      .catch(() => { /* silently use fallback */ })
  }, [])

  const openRoomBooking    = (room)  => setBookingTarget({ room, isPackage: false })
  const openPackageBooking = ()      => setBookingTarget({ room: pkg, isPackage: true })
  const closeBooking       = ()      => setBookingTarget(null)

  return (
    <section id="rooms" className="py-20 md:py-28 bg-botanical">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <span className="text-sm font-semibold text-heritage-gold-soft uppercase tracking-widest mb-3 block">Accommodations</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-secondary leading-tight">
              Our <span className="font-script text-4xl md:text-5xl text-accent">Comfortable Rooms</span>
            </h2>
            <p className="text-heritage-gold-soft/80 mt-2">All rooms include breakfast</p>
          </div>
          <a href="#contact" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft rounded-md px-1">
            View All Rooms
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        {/* Room Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => {
            const { tag, tagColor } = TAG_MAP[room.type] || { tag: 'Room', tagColor: 'bg-cream text-primary' }
            const amenities = Array.isArray(room.amenities) ? room.amenities : []

            return (
              <div key={room.id ?? index} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
                <div className="h-52 bg-linear-to-br from-primary-light to-primary flex items-center justify-center relative">
                  <span className="text-accent/60 text-sm">Room photo coming soon</span>
                  <span className={`absolute top-4 left-4 ${tagColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-secondary mb-2">{room.name}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{room.description}</p>
                  <div className="flex flex-wrap gap-3 mb-5">
                    {amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="flex items-center gap-1 text-xs text-accent">
                        <span className="material-symbols-outlined text-sm">{amenityIcon(amenity)}</span>
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-5 border-t border-white/10">
                    <div>
                      <span className="font-display text-2xl font-semibold text-secondary">
                        KSh {formatPrice(room.price_per_night)}
                      </span>
                      <span className="text-xs text-slate-400">/night</span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Book ${room.name}`}
                      onClick={() => openRoomBooking(room)}
                      className="px-5 py-2 border border-heritage-gold-soft text-heritage-gold-soft rounded-lg text-sm font-semibold hover:bg-[#f2ecda] hover:text-botanical hover:border-[#f2ecda] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Home Away From Home — full-width package card */}
          <div className="md:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden border border-gold/30 bg-linear-to-r from-secondary/10 to-accent/20">
            <div className="p-8 md:p-10">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Best Value
                </span>
                {pkg.savings > 0 && (
                  <span className="text-secondary/70 text-sm">
                    Save KSh {formatPrice(pkg.savings)} vs. booking separately
                  </span>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left — name, tagline, rooms included */}
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-secondary mb-1">
                    {pkg.name}
                  </h3>
                  <p className="font-script text-2xl text-accent mb-5">{pkg.tagline}</p>

                  <p className="text-sm text-secondary/70 mb-6 leading-relaxed">
                    {pkg.short_description || pkg.long_description}
                  </p>

                  <p className="text-xs text-accent/80 uppercase tracking-widest font-semibold mb-3">What&apos;s included</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(pkg.rooms_included || []).map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-secondary/80">
                        <span className="material-symbols-outlined text-gold text-base">check_circle</span>
                        {r}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — benefits + pricing + CTA */}
                <div>
                  <p className="text-xs text-accent/80 uppercase tracking-widest font-semibold mb-3">Benefits</p>
                  <ul className="space-y-2 mb-8">
                    {(pkg.benefits || []).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary/80">
                        <span className="material-symbols-outlined text-gold text-base mt-0.5">star</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold text-secondary">
                          KSh {formatPrice(pkg.price_per_night)}
                        </span>
                        <span className="text-sm text-secondary/50">/night</span>
                      </div>
                      {pkg.original_price > 0 && (
                        <p className="text-sm text-secondary/40 line-through">
                          KSh {formatPrice(pkg.original_price)}
                        </p>
                      )}
                      <p className="text-xs text-secondary/50 mt-1">Up to {pkg.capacity} guests</p>
                    </div>
                    <button
                      type="button"
                      onClick={openPackageBooking}
                      className="inline-block bg-[#f2ecda] text-botanical px-8 py-3 rounded-lg font-bold hover:bg-heritage-gold-soft hover:text-botanical transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
                    >
                      Book Entire Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {bookingTarget && (
        <BookingModal
          room={bookingTarget.room}
          isPackage={bookingTarget.isPackage}
          onClose={closeBooking}
        />
      )}
    </section>
  )
}

export default Rooms
