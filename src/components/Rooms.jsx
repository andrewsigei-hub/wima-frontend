import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import BookingModal from './BookingModal'

// Map room type → tag label & colour (display-only)
const TAG_MAP = {
  standard: { tag: 'Value',   tagColor: 'bg-cream text-primary' },
  double:   { tag: 'Value',   tagColor: 'bg-cream text-primary' },
  premier:  { tag: 'Popular', tagColor: 'bg-gold text-white' },
  executive:{ tag: 'Executive', tagColor: 'bg-gold text-white' },
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
          <Link
            to="/rooms"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-[#efe6cd] text-botanical border border-heritage-gold-soft px-5 py-2.5 rounded-lg font-semibold hover:bg-[#e6d8b2] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
          >
            View All Rooms
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
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
                      className="px-5 py-2 bg-botanical text-secondary rounded-lg text-sm font-semibold hover:bg-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
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
                      className="inline-block bg-botanical text-secondary px-8 py-3 rounded-lg font-bold hover:bg-primary transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
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
