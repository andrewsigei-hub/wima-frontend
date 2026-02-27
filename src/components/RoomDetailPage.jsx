import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'
import BookingModal from './BookingModal'

const TAG_MAP = {
  standard:  { tag: 'Value',     tagColor: 'bg-[#f2ecda] text-botanical' },
  double:    { tag: 'Value',     tagColor: 'bg-[#f2ecda] text-botanical' },
  premier:   { tag: 'Popular',   tagColor: 'bg-gold text-white' },
  executive: { tag: 'Executive', tagColor: 'bg-gold text-white' },
  cottage:   { tag: 'Private',   tagColor: 'bg-[#f2ecda] text-botanical' },
  deluxe:    { tag: 'Deluxe',    tagColor: 'bg-gold text-white' },
  family:    { tag: 'Family',    tagColor: 'bg-[#f2ecda] text-botanical' },
}

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
  // Case-insensitive partial match
  const key = Object.keys(AMENITY_ICON_MAP).find(
    k => label.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(label.toLowerCase())
  )
  return key ? AMENITY_ICON_MAP[key] : 'check'
}

function formatPrice(n) {
  return Number(n).toLocaleString()
}

export default function RoomDetailPage() {
  const { slug } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    api.get(`/rooms/${slug}`)
      .then(data => setRoom(data.room))
      .catch(err => {
        if (err.message?.includes('404') || err.message?.toLowerCase().includes('not found')) {
          setNotFound(true)
        } else {
          setNotFound(true) // treat any fetch error as not found on detail page
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  const { tag, tagColor } = (room && TAG_MAP[room.type]) || { tag: 'Room', tagColor: 'bg-[#f2ecda] text-botanical' }
  const amenities = Array.isArray(room?.amenities) ? room.amenities : []
  const images = Array.isArray(room?.images) ? room.images : []

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading room…
        </div>
      </div>
    )
  }

  // ── Not Found ──────────────────────────────────────────────────────────────
  if (notFound || !room) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex flex-col items-center justify-center px-6 text-center">
        <span className="material-symbols-outlined text-6xl text-botanical/30 mb-4">hotel</span>
        <h1 className="font-display text-3xl text-botanical mb-2">Room not found</h1>
        <p className="text-slate-500 mb-6">The room you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-botanical text-secondary font-semibold hover:bg-primary transition-all"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to All Rooms
        </Link>
      </div>
    )
  }

  // ── Detail ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-heritage-gold-soft/40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-1.5 text-botanical font-medium text-sm hover:underline"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          All Rooms
        </Link>
        <button
          onClick={() => setBookingOpen(true)}
          className="px-5 py-2 rounded-lg bg-botanical text-secondary text-sm font-semibold hover:bg-primary transition-all"
        >
          Book Now
        </button>
      </div>

      {/* Hero image */}
      <div className="h-64 md:h-80 w-full bg-linear-to-br from-primary-light to-primary overflow-hidden">
        {images[0] ? (
          <img src={images[0]} alt={room.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-secondary/50 text-sm">Photo coming soon</span>
          </div>
        )}
      </div>

      {/* Thumbnail strip (only when 2+ images) */}
      {images.length > 1 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.slice(1).map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${room.name} ${i + 2}`}
              className="h-16 w-24 object-cover rounded-lg flex-shrink-0 border border-heritage-gold-soft/40"
            />
          ))}
        </div>
      )}

      {/* Content grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* Left — main info */}
        <div className="md:col-span-2">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full font-semibold ${tagColor}`}>
              {tag}
            </span>
            {room.breakfast_included && (
              <span className="flex items-center gap-1 text-xs text-botanical bg-botanical/10 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">restaurant</span>
                Breakfast included
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl text-botanical mb-2">{room.name}</h1>

          <p className="text-slate-500 text-sm mb-6">
            <span className="material-symbols-outlined text-base align-middle mr-1">group</span>
            Up to <span className="font-semibold text-botanical">{room.capacity}</span> guests
          </p>

          <p className="text-slate-700 leading-relaxed mb-8">{room.description}</p>

          {amenities.length > 0 && (
            <div>
              <h2 className="font-display text-xl text-botanical mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white rounded-lg border border-heritage-gold-soft/40 px-3 py-2.5 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-botanical text-base flex-shrink-0">
                      {amenityIcon(amenity)}
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — price card */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-white rounded-2xl border border-heritage-gold-soft/40 p-6 shadow-sm">
            <div className="mb-4">
              <span className="font-display text-3xl text-botanical font-bold">
                KSh {formatPrice(room.price_per_night)}
              </span>
              <span className="text-sm text-slate-500"> /night</span>
            </div>

            {room.breakfast_included && (
              <p className="text-xs text-botanical/70 mb-5 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">check</span>
                Breakfast included
              </p>
            )}

            <button
              onClick={() => setBookingOpen(true)}
              className="w-full bg-botanical text-secondary py-3 rounded-lg font-bold hover:bg-primary transition-all mb-3"
            >
              Book Now
            </button>

            <a
              href="/#contact"
              className="flex items-center justify-center gap-1 text-sm text-botanical hover:underline"
            >
              or enquire via contact form
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      {bookingOpen && (
        <BookingModal
          room={room}
          isPackage={false}
          onClose={() => setBookingOpen(false)}
        />
      )}
    </div>
  )
}
