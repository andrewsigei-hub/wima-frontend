const Gardens = () => {
  const features = [
    { icon: 'local_florist', label: 'Flower Gardens', sub: 'Vibrant blooms year-round' },
    { icon: 'nature', label: 'Tropical Palms', sub: 'Exotic greenery' },
    { icon: 'route', label: 'Walking Paths', sub: 'Peaceful strolls' },
    { icon: 'grass', label: 'Manicured Lawns', sub: 'Perfect for relaxation' },
  ]

  return (
    <section id="gardens" className="py-20 md:py-28 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">Our Gardens</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-primary leading-tight mb-4">
            A <span className="font-script text-4xl md:text-5xl text-primary-light">Botanical Paradise</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stroll through our meticulously maintained gardens featuring vibrant flowers, tropical palms, and peaceful pathways.
          </p>
        </div>

        {/* Garden Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Large image */}
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/full_garden_pic.webp" 
              alt="Colorful flower beds" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Smaller images */}
          <div className="rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/front_right_garden.webp" 
              alt="Garden landscaping" 
              className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/balcony_pathway.webp" 
              alt="Stone pathway" 
              className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/right-side_garden_from_bottom.webp" 
              alt="Manicured lawns" 
              className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/golden_hour_garden.jpeg" 
              alt="Garden grounds" 
              className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Garden Features */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index}>
              <span className="material-symbols-outlined text-primary text-3xl mb-2">{feature.icon}</span>
              <p className="font-medium text-primary">{feature.label}</p>
              <p className="text-xs text-slate-500">{feature.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gardens