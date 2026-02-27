import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import BookingModal from './BookingModal'

const FALLBACK_ROOMS = [
  {
    id: 'fallback-deluxe-1',
    name: 'Deluxe Room 1',
    slug: 'deluxe-room-1',
    type: 'deluxe',
    description: 'Comfortable deluxe room perfect for couples seeking a cozy retreat in Kericho. Features modern amenities, a double bed, and an en-suite bathroom with hot shower.',
    capacity: 2,
    price_per_night: 5000,
    amenities: ['Double bed', 'En-suite bathroom', 'Hot shower', 'WiFi', 'Garden view'],
    images: [],
  },
  {
    id: 'fallback-deluxe-2',
    name: 'Deluxe Room 2',
    slug: 'deluxe-room-2',
    type: 'deluxe',
    description: 'Well-appointed deluxe room offering excellent value and comfort for your Kericho stay. Perfect for business travelers or couples exploring the tea country.',
    capacity: 2,
    price_per_night: 5000,
    amenities: ['Double bed', 'En-suite bathroom', 'Hot shower', 'WiFi', 'Work desk'],
    images: [],
  },
  {
    id: 'fallback-deluxe-3',
    name: 'Deluxe Room 3',
    slug: 'deluxe-room-3',
    type: 'deluxe',
    description: 'Inviting deluxe room designed for maximum comfort and relaxation with modern conveniences and serene garden ambiance.',
    capacity: 2,
    price_per_night: 5000,
    amenities: ['Double bed', 'En-suite bathroom', 'Hot shower', 'WiFi', 'Wardrobe'],
    images: [],
  },
  {
    id: 'fallback-double',
    name: 'Double Room',
    slug: 'double-room',
    type: 'double',
    description: 'Spacious double room ideal for couples or small families seeking extra comfort, with a modern en-suite bathroom and ample storage.',
    capacity: 2,
    price_per_night: 6000,
    amenities: ['Large double bed', 'En-suite bathroom', 'Hot shower', 'WiFi', 'Large wardrobe'],
    images: [],
  },
  {
    id: 'fallback-executive-1',
    name: 'Executive Room 1',
    slug: 'executive-room-1',
    type: 'executive',
    description: 'Premium executive room offering superior comfort and style with premium bedding, DSTV, and balcony garden views.',
    capacity: 2,
    price_per_night: 6000,
    amenities: ['King-size bed', 'Premium bedding', 'WiFi', 'TV with DSTV', 'Private balcony'],
    images: [],
  },
  {
    id: 'fallback-executive-2',
    name: 'Executive Room 2',
    slug: 'executive-room-2',
    type: 'executive',
    description: 'Sophisticated executive room designed for comfort and productivity, ideal for business stays or romantic getaways.',
    capacity: 2,
    price_per_night: 6000,
    amenities: ['King-size bed', 'WiFi', 'TV with DSTV', 'Private balcony', 'Executive work desk'],
    images: [],
  },
  {
    id: 'fallback-cottage',
    name: 'Garden Cottage',
    slug: 'garden-cottage',
    type: 'cottage',
    description: 'Exclusive standalone cottage with ultimate privacy, separate living area, kitchenette, private patio, and lush garden surroundings.',
    capacity: 3,
    price_per_night: 7000,
    amenities: ['Queen-size bed', 'Separate living area', 'Kitchenette', 'Mini fridge', 'Private patio'],
    images: [],
  },
]

const TYPES = ['all', 'premier', 'cottage', 'double', 'standard', 'deluxe', 'executive']

const formatPrice = (n) => Number(n).toLocaleString()

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState(FALLBACK_ROOMS)
  const [activeType, setActiveType] = useState('all')
  const [bookingTarget, setBookingTarget] = useState(null)

  useEffect(() => {
    api.get('/rooms')
      .then((data) => {
        if (data.rooms?.length) setRooms(data.rooms)
      })
      .catch(() => {})
  }, [])

  const visibleRooms = activeType === 'all'
    ? rooms
    : rooms.filter(r => r.type === activeType)

  return (
    <main className="min-h-screen bg-[#f8f3e7] text-slate-800 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-heritage-gold font-semibold">WIMA Serenity Gardens</p>
            <h1 className="font-display text-4xl md:text-5xl text-botanical mt-2">All Rooms</h1>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-botanical/50 text-botanical font-semibold hover:bg-botanical/5 transition-all"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back Home
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
          {TYPES.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                activeType === type
                  ? 'bg-botanical text-secondary'
                  : 'border border-botanical/30 text-botanical hover:bg-botanical/5'
              }`}
            >
              {type === 'all' ? 'All Rooms' : type}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {visibleRooms.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-5xl block mb-3">hotel</span>
            <p>No {activeType} rooms available right now.</p>
          </div>
        )}

        {/* Room grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleRooms.map((room) => {
            const hasSlug = Boolean(room.slug)

            return (
              <article key={room.id ?? room.slug ?? room.name} className="bg-white rounded-2xl border border-heritage-gold-soft/40 shadow-md overflow-hidden flex flex-col">

                {/* Image — links to detail page if slug exists */}
                {hasSlug ? (
                  <Link to={`/rooms/${room.slug}`} className="block h-52 bg-linear-to-br from-primary-light to-primary/90 overflow-hidden flex-shrink-0">
                    {room.images?.[0] ? (
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-secondary/80 text-sm">Room photo coming soon</span>
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="h-52 bg-linear-to-br from-primary-light to-primary/90 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary/80 text-sm">Room photo coming soon</span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Room name — links to detail page if slug exists */}
                    {hasSlug ? (
                      <Link to={`/rooms/${room.slug}`} className="font-display text-2xl text-botanical hover:underline leading-tight">
                        {room.name}
                      </Link>
                    ) : (
                      <h2 className="font-display text-2xl text-botanical leading-tight">{room.name}</h2>
                    )}
                    <span className="text-xs uppercase tracking-widest bg-[#f2ecda] text-botanical px-3 py-1 rounded-full flex-shrink-0 mt-1">
                      {room.type}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{room.description}</p>

                  <div className="text-sm text-slate-600 mb-4">
                    Capacity: <span className="font-semibold text-botanical">{room.capacity} guests</span>
                  </div>

                  {Array.isArray(room.amenities) && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {room.amenities.slice(0, 4).map((amenity, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#f7f1e4] text-slate-700 border border-heritage-gold-soft/40">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end justify-between pt-4 border-t border-slate-200 mt-auto">
                    <p className="text-botanical">
                      <span className="font-display text-2xl font-semibold">KSh {formatPrice(room.price_per_night)}</span>
                      <span className="text-sm text-slate-500"> /night</span>
                    </p>

                    {hasSlug ? (
                      <button
                        type="button"
                        onClick={() => setBookingTarget(room)}
                        className="px-4 py-2 rounded-lg bg-botanical text-white text-sm font-semibold hover:bg-primary transition-all"
                      >
                        Inquire
                      </button>
                    ) : (
                      <a href="/#contact" className="px-4 py-2 rounded-lg bg-botanical text-white text-sm font-semibold hover:bg-primary transition-all">
                        Inquire
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {bookingTarget && (
        <BookingModal
          room={bookingTarget}
          isPackage={false}
          onClose={() => setBookingTarget(null)}
        />
      )}
    </main>
  )
}

export default AllRoomsPage
