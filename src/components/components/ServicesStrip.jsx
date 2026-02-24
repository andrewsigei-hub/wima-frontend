const ServicesStrip = () => {
  const services = [
    { icon: 'cottage', label: 'Guest House' },
    { icon: 'park', label: 'Leisure Gardens' },
    { icon: 'business_center', label: 'Corporate Events' },
    { icon: 'favorite', label: 'Private Events' },
  ]

  return (
    <div className="bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {services.map((service, index) => (
            <div key={index} className="flex items-center gap-3 text-secondary">
              <span className="material-symbols-outlined">{service.icon}</span>
              <span className="font-medium">{service.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesStrip