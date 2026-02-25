const pkg = {
  tagline: 'One estate. All yours.',
  price: '40,000',
  originalPrice: '42,500',
  savings: '2,500',
  capacity: 20,
  rooms: [
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

const Rooms = () => {
  const rooms = [
    {
      name: 'Standard Double',
      description: 'Comfortable room with double bed, perfect for couples or solo travelers.',
      price: '5,500',
      tag: 'Value',
      tagColor: 'bg-cream text-primary',
      amenities: [
        { icon: 'bed', label: 'Double Bed' },
        { icon: 'shower', label: 'En-suite' },
        { icon: 'restaurant', label: 'Breakfast' },
      ],
    },
    {
      name: 'Premier Room',
      description: 'Spacious premier room with enhanced amenities and beautiful garden views.',
      price: '6,500',
      tag: 'Popular',
      tagColor: 'bg-gold text-white',
      amenities: [
        { icon: 'king_bed', label: 'King Bed' },
        { icon: 'shower', label: 'En-suite' },
        { icon: 'restaurant', label: 'Breakfast' },
      ],
    },
    {
      name: 'Garden Cottage',
      description: 'Secluded standalone cottage surrounded by our beautiful gardens.',
      price: '6,500',
      tag: 'Private',
      tagColor: 'bg-secondary text-primary',
      amenities: [
        { icon: 'cottage', label: 'Standalone' },
        { icon: 'shower', label: 'En-suite' },
        { icon: 'restaurant', label: 'Breakfast' },
      ],
    },
  ]

  return (
    <section id="rooms" className="py-20 md:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">Accommodations</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-secondary leading-tight">
              Our <span className="font-script text-4xl md:text-5xl text-accent">Comfortable Rooms</span>
            </h2>
            <p className="text-primary-light mt-2">All rooms include breakfast</p>
          </div>
          <a href="#contact" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">
            View All Rooms
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        {/* Room Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
              <div className="h-52 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center relative">
                <span className="text-accent/60 text-sm">Room photo coming soon</span>
                <span className={`absolute top-4 left-4 ${room.tagColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                  {room.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-secondary mb-2">{room.name}</h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{room.description}</p>
                <div className="flex flex-wrap gap-3 mb-5">
                  {room.amenities.map((amenity, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs text-accent">
                      <span className="material-symbols-outlined text-sm">{amenity.icon}</span> {amenity.label}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-5 border-t border-white/10">
                  <div>
                    <span className="font-display text-2xl font-semibold text-secondary">KSh {room.price}</span>
                    <span className="text-xs text-slate-400">/night</span>
                  </div>
                  <button className="px-5 py-2 border border-accent text-accent rounded-lg text-sm font-semibold hover:bg-cream hover:text-primary hover:border-cream transition-all">
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Home Away From Home — full-width package card */}
          <div className="md:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden border border-gold/30 bg-linear-to-r from-secondary/10 to-accent/20">
            <div className="p-8 md:p-10">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Best Value
                </span>
                <span className="text-secondary/70 text-sm">
                  Save KSh {pkg.savings} vs. booking separately
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left — name, tagline, rooms included */}
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-secondary mb-1">
                    Home Away From Home Package
                  </h3>
                  <p className="font-script text-2xl text-accent mb-5">{pkg.tagline}</p>

                  <p className="text-sm text-secondary/70 mb-6 leading-relaxed">
                    Reserve the entire property exclusively for your group — all 7 rooms, the gardens, and complete privacy. Perfect for family reunions, group getaways, corporate retreats, and wedding parties.
                  </p>

                  <p className="text-xs text-accent/80 uppercase tracking-widest font-semibold mb-3">What&apos;s included</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.rooms.map((r, i) => (
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
                    {pkg.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-secondary/80">
                        <span className="material-symbols-outlined text-gold text-base mt-0.5">star</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-white/10">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold text-secondary">KSh {pkg.price}</span>
                        <span className="text-sm text-secondary/50">/night</span>
                      </div>
                      <p className="text-sm text-secondary/40 line-through">KSh {pkg.originalPrice}</p>
                      <p className="text-xs text-secondary/50 mt-1">Up to {pkg.capacity} guests</p>
                    </div>
                    <a
                      href="#contact"
                      className="inline-block bg-secondary text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transition-all text-sm"
                    >
                      Book Entire Property
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Rooms