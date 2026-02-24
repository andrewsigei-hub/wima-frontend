const Amenities = () => {
  const amenities = [
    { icon: 'local_parking', label: 'Free Parking', sub: 'Secure on-site parking' },
    { icon: 'wifi', label: 'WiFi', sub: 'Stay connected' },
    { icon: 'local_laundry_service', label: 'Laundry', sub: 'Self-service available' },
    { icon: 'restaurant', label: 'Breakfast', sub: 'Included with all rooms' },
  ]

  return (
    <section id="amenities" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">What We Offer</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-primary">Amenities & Services</h2>
        </div>

        {/* Amenity Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-primary/5 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-2xl">{amenity.icon}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-primary mb-1">{amenity.label}</h3>
              <p className="text-xs text-slate-500">{amenity.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Amenities