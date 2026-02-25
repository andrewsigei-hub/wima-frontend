const cities = [
  { name: 'Kisumu', distance: '55 km', time: '~1 hr', icon: 'location_city', note: 'Lake Victoria port city' },
  { name: 'Nakuru', distance: '105 km', time: '~1.5 hrs', icon: 'location_city', note: 'City of flamingos & Lake Nakuru NP' },
  { name: 'Nairobi', distance: '285 km', time: '~3.5 hrs', icon: 'apartment', note: 'Capital & international hub' },
  { name: 'Eldoret', distance: '95 km', time: '~1.5 hrs', icon: 'location_city', note: 'Gateway to the highlands' },
]

const attractions = [
  {
    icon: 'forest',
    name: 'Chagaik Arboretum & Dam',
    distance: '4 km',
    description: 'A tranquil forest park with indigenous trees, scenic walking trails, and a peaceful dam — perfect for a morning escape.',
  },
  {
    icon: 'local_florist',
    name: 'KTDA Tea Estates',
    distance: 'On your doorstep',
    description: "Kericho is the heart of Kenya's tea industry. Rolling emerald tea fields surround the town and can be explored on guided tours.",
  },
  {
    icon: 'water',
    name: 'Lake Victoria',
    distance: '~60 km',
    description: "Africa's largest lake, accessible via Kisumu. Enjoy sunset boat rides, fresh Tilapia, and vibrant lakeside culture.",
  },
  {
    icon: 'pets',
    name: 'Masai Mara Game Reserve',
    distance: '~180 km',
    description: "One of Africa's greatest wildlife destinations. Famous for the Great Migration, the Mara is a straightforward day's drive away.",
  },
  {
    icon: 'landscape',
    name: 'Ruma National Park',
    distance: '~100 km',
    description: "Kenya's only remaining habitat for the rare roan antelope. A hidden gem for off-the-beaten-track wildlife enthusiasts.",
  },
  {
    icon: 'spa',
    name: 'Kakamega Forest',
    distance: '~70 km',
    description: "East Africa's last remnant of equatorial rainforest. Rich in primates, exotic birds, and centuries-old trees.",
  },
]

const Nearby = () => {
  return (
    <section id="nearby" className="py-20 md:py-28 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">Explore the Region</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-primary leading-tight mb-4">
            Perfectly <span className="font-script text-4xl md:text-5xl text-primary-light">Positioned</span> to Explore
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kericho sits at the heart of western Kenya — making Wima Serenity Gardens an ideal base for day trips to iconic wildlife reserves, forests, lakes, and cities.
          </p>
        </div>

        {/* Cities distance row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {cities.map((city, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-primary/5 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">{city.icon}</span>
              <p className="font-display font-semibold text-primary text-lg">{city.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-light">{city.distance}</span>
              </div>
              <p className="text-xs text-slate-400">{city.time} drive</p>
              <p className="text-xs text-slate-500 italic">{city.note}</p>
            </div>
          ))}
        </div>

        {/* Attractions grid */}
        <h3 className="font-display text-xl md:text-2xl font-medium text-primary mb-6 text-center">
          Nearby Attractions
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attr, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5 flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">{attr.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-semibold text-primary">{attr.name}</p>
                  <span className="text-xs bg-accent text-primary px-2 py-0.5 rounded-full font-medium">{attr.distance}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{attr.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-12 bg-primary rounded-2xl p-8 text-center text-secondary">
          <span className="material-symbols-outlined text-4xl mb-3 block">directions_car</span>
          <h4 className="font-display text-xl font-semibold mb-2">Need Help Planning a Day Trip?</h4>
          <p className="text-secondary/80 text-sm max-w-md mx-auto mb-5">
            Our team can help arrange transport or connect you with local guides for excursions around the region.
          </p>
          <a
            href="#contact"
            className="inline-block bg-secondary text-primary px-6 py-3 rounded-full font-bold hover:bg-accent transition-all text-sm"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  )
}

export default Nearby
