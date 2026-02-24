const Events = () => {
  const venues = [
    {
      name: 'Main Event Field',
      description: 'Our larger venue with expansive lawns, perfect for weddings and large celebrations. Accommodates up to 500 guests.',
      image: '/images/large_aerial_view.PNG',
      tag: 'Popular',
      tagColor: 'bg-gold text-white',
      capacity: 'Up to 500 guests',
      feature: 'Tent setup',
      featureIcon: 'tent',
    },
    {
      name: 'Garden Terrace',
      description: 'A more intimate setting surrounded by our beautiful gardens. Ideal for corporate events and smaller gatherings.',
      image: '/images/house_pic_from_out_with_table.jpeg',
      tag: 'Intimate',
      tagColor: 'bg-cream text-primary',
      capacity: 'Up to 200 guests',
      feature: 'Garden views',
      featureIcon: 'local_florist',
    },
  ]

  const eventTypes = [
    { icon: 'church', label: 'Weddings' },
    { icon: 'cake', label: 'Birthdays' },
    { icon: 'business_center', label: 'Corporate' },
    { icon: 'groups', label: 'Reunions' },
    { icon: 'school', label: 'Graduations' },
  ]

  return (
    <section id="events" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">Events</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-primary leading-tight mb-4">
            <span className="font-script text-4xl md:text-5xl text-primary-light block">Host Your Event</span>
            With Us
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our expansive grounds feature two beautiful event spaces perfect for weddings, corporate gatherings, birthday celebrations, and family reunions.
          </p>
        </div>

        {/* Two Venue Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {venues.map((venue, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-primary/5 hover:-translate-y-2 transition-all duration-300">
              <div className="h-56 relative overflow-hidden">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                <div className={`absolute top-4 left-4 ${venue.tagColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                  {venue.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-primary mb-2">{venue.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{venue.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent rounded-full text-xs text-primary">
                    <span className="material-symbols-outlined text-sm">groups</span> {venue.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent rounded-full text-xs text-primary">
                    <span className="material-symbols-outlined text-sm">{venue.featureIcon}</span> {venue.feature}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                  <div>
                    <span className="font-display text-2xl font-semibold text-primary">KSh 50,000</span>
                    <span className="text-xs text-slate-500">/day</span>
                  </div>
                  <a href="#contact" className="px-5 py-2 bg-primary text-secondary rounded-lg text-sm font-semibold hover:bg-primary-light transition-all">
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Types */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4">Perfect for:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {eventTypes.map((type, index) => (
              <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm text-primary">
                <span className="material-symbols-outlined text-base">{type.icon}</span> {type.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events