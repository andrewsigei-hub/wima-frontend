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
        </div>
      </div>
    </section>
  )
}

export default Rooms