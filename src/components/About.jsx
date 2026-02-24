const About = () => {
  const features = [
    { icon: 'spa', label: 'Tropical Gardens' },
    { icon: 'local_cafe', label: 'Tea Country Views' },
    { icon: 'family_restroom', label: 'Family Owned' },
    { icon: 'handshake', label: 'Warm Service' },
  ]

  return (
    <section id="about" className="py-20 md:py-28 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/pathway.jpeg" 
                alt="Stone pathway through gardens" 
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 right-0 w-2/3 rounded-2xl overflow-hidden shadow-xl border-4 border-secondary">
              <img 
                src="/images/garden-lawn.jpeg" 
                alt="Lush garden lawn" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 right-1/4 w-24 h-24 bg-cream border-4 border-primary/20 rounded-full flex flex-col items-center justify-center shadow-lg">
              <span className="font-display text-3xl font-bold text-primary leading-none">9</span>
              <span className="text-xs text-slate-600 uppercase tracking-wider">Years</span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-primary leading-tight mb-6">
              A Place of <span className="font-script text-4xl md:text-5xl text-primary-light">Peace & Beauty</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Since 2017, WIMA Serenity Gardens has been a haven for travelers seeking rest and connection with nature. Our family-run guest house combines the warmth of Kenyan hospitality with the serene beauty of Kericho's highlands.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Whether you're here for a peaceful getaway, a family reunion, or a memorable celebration, our gardens and comfortable rooms provide the perfect backdrop for your stay.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-primary/5">
                  <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About