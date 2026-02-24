const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/large_aerial_view.PNG" 
          alt="Aerial view of Wima Serenity Gardens" 
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
              <span className="material-symbols-outlined text-primary text-lg">location_on</span>
              <span className="text-sm font-medium text-primary">Kericho, Kenya</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-primary leading-tight mb-6">
              <span className="font-script text-5xl md:text-6xl lg:text-7xl block text-primary-light">Welcome to</span>
              Wima Serenity Gardens
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Nestled in Kenya's tea country, discover a peaceful retreat where lush gardens, warm hospitality, and comfortable accommodations come together. Your perfect escape awaits.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-primary">cottage</span>
                <span className="text-sm font-medium">7 Cozy Rooms</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-primary">park</span>
                <span className="text-sm font-medium">Lush Gardens</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                <span className="material-symbols-outlined text-primary">celebration</span>
                <span className="text-sm font-medium">2 Event Venues</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a 
                href="#rooms" 
                className="inline-flex items-center gap-2 bg-primary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-primary-light transform hover:-translate-y-1 transition-all shadow-lg shadow-primary/20"
              >
                View Rooms
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a 
                href="#events" 
                className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-secondary transition-all"
              >
                Plan an Event
              </a>
            </div>
          </div>

            {/* Hero Image Card */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <img 
                src="/images/house_picture_from_garden.png" 
                alt="Outdoor dining at Wima Serenity Gardens" 
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold text-3xl">star</span>
                <div>
                  <p className="font-display font-bold text-primary">Est. 2017</p>
                  <p className="text-xs text-slate-500">9 Years of Hospitality</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white p-5 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
                <div>
                  <p className="font-display font-bold text-primary">Breakfast</p>
                  <p className="text-xs text-slate-500">Included with all rooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero