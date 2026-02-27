const About = () => {
  const features = [
    { icon: 'spa', label: 'Tropical Gardens' },
    { icon: 'local_cafe', label: 'Tea Country Views' },
    { icon: 'family_restroom', label: 'Family Owned' },
    { icon: 'handshake', label: 'Warm Service' },
  ]

  return (
    <section id="about" className="py-20 bg-[#f7f2e6]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Centered intro */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-heritage-gold uppercase tracking-widest mb-3 block">Our Story</span>
          <h2 className="font-display text-3xl md:text-4xl text-botanical mb-6">
            A Place of <span className="font-script text-4xl text-heritage-gold">Peace & Beauty</span>
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Since 2017, WIMA Serenity Gardens has been a haven for travelers seeking rest and connection with nature.
            Our family-run guest house combines the warmth of Kenyan hospitality with the serene beauty of Kericho's highlands.
          </p>
        </div>

        {/* Two-column detail */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/balcony_pathway.webp"
                alt="Stone pathway through gardens"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 right-0 w-2/3 rounded-2xl overflow-hidden shadow-xl border-4 border-[#f7f2e6]">
              <img
                src="/images/right-side_garden_from_bottom.webp"
                alt="Lush garden lawn"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 right-1/4 w-24 h-24 bg-[#f2ecda] border-4 border-heritage-gold-soft/50 rounded-full flex flex-col items-center justify-center shadow-lg">
              <span className="font-display text-3xl font-bold text-primary leading-none">9</span>
              <span className="text-xs text-slate-600 uppercase tracking-wider">Years</span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8 lg:pt-8">
            <p className="text-slate-700 leading-relaxed mb-8">
              Whether you're here for a peaceful getaway, a family reunion, or a memorable celebration, our gardens and comfortable rooms provide the perfect backdrop for your stay.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/90 rounded-xl border border-heritage-gold-soft/40">
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
