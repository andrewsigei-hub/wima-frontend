import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

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

const formatPrice = (n) => Number(n).toLocaleString()

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState(FALLBACK_ROOMS)

  useEffect(() => {
    api.get('/rooms')
      .then((data) => {
        if (data.rooms?.length) setRooms(data.rooms)
      })
      .catch(() => {})
  }, [])

  return (
    <main className="min-h-screen bg-[#f8f3e7] text-slate-800 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <article key={room.id ?? room.slug ?? room.name} className="bg-white rounded-2xl border border-heritage-gold-soft/40 shadow-md overflow-hidden">
              <div className="h-52 bg-linear-to-br from-primary-light to-primary/90 flex items-center justify-center">
                {room.images?.[0] ? (
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-secondary/80 text-sm">Room photo coming soon</span>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="font-display text-2xl text-botanical">{room.name}</h2>
                  <span className="text-xs uppercase tracking-widest bg-[#f2ecda] text-botanical px-3 py-1 rounded-full">
                    {room.type}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">{room.description}</p>

                <div className="text-sm text-slate-600 mb-4">Capacity: <span className="font-semibold text-botanical">{room.capacity} guests</span></div>

                {Array.isArray(room.amenities) && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {room.amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#f7f1e4] text-slate-700 border border-heritage-gold-soft/40">
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-end justify-between pt-4 border-t border-slate-200">
                  <p className="text-botanical">
                    <span className="font-display text-2xl font-semibold">KSh {formatPrice(room.price_per_night)}</span>
                    <span className="text-sm text-slate-500"> /night</span>
                  </p>

                  <a href="/#contact" className="px-4 py-2 rounded-lg bg-botanical text-white text-sm font-semibold hover:bg-primary transition-all">
                    Inquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default AllRoomsPage