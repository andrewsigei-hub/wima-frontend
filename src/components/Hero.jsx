const Hero = () => {
  return (
    <main className="relative px-6 lg:px-16 pt-20 pb-20 overflow-hidden botanical-wash">
      <img
        src="/images/wima-logo.jpeg"
        alt="WIMA logo"
        className="absolute top-6 left-6 lg:left-16 z-30 h-10 w-auto object-contain mix-blend-multiply"
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
          <p className="font-script text-3xl text-accent-gold">
            Rustic elegance in the Kericho tea country
          </p>

          <div className="inline-flex items-center space-x-2 bg-botanical/10 px-4 py-1.5 rounded-full border border-botanical/20">
            <span className="material-symbols-outlined text-primary text-base">
              location_on
            </span>
            <span className="text-primary font-semibold text-xs tracking-widest uppercase">
              Kericho, Kenya
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display leading-[1.08] text-botanical">
            Find Your Peace at <br />
            <span className="text-primary">WIMA Serenity Gardens</span>
          </h1>

          <p className="text-lg text-slate-700 max-w-xl leading-relaxed">
            Rooted in a 9-year legacy of warmth and hospitality, we invite you
            to experience a sanctuary where manicured landscapes meet the
            highland breeze. Whether a quiet retreat or a grand celebration,
            your story begins here.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a
              href="#rooms"
              className="btn-primary-rustic w-full sm:w-auto px-8 py-4 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-botanical/20"
            >
              View Our Rooms
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
            <a
              href="#events"
              className="btn-outline-rustic w-full sm:w-auto px-8 py-4 font-semibold flex items-center justify-center gap-2"
            >
              Plan an Event
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-heritage-gold-soft/60">
            <div>
              <div className="text-2xl font-display text-botanical">
                9+ Years
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-600 font-medium">
                Of Legacy
              </div>
            </div>
            <div></div>
            <div className="hidden md:block">
              <div className="text-2xl font-display text-botanical">
                2 Acres
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-600 font-medium">
                Of Lush Gardens
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative h-[440px] sm:h-[520px] lg:h-[680px] flex items-center justify-center">
          <div className="absolute w-[100%] h-[75%] left-0 top-0 overflow-hidden rounded-3xl hero-grid-image">
            <img
              alt="Main house view from gardens"
              className="w-full h-full object-cover"
              src="/images/house_picture_from_garden.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-display">The Residence </h3>
            </div>
          </div>

          <div className="absolute w-[65%] h-[45%] bottom-0 right-0 overflow-hidden rounded-3xl hero-grid-image border-8 border-[#f5efe0] z-10 translate-x-2 lg:translate-x-8">
            <img
              alt="Aerial view showing event tents and scale"
              className="w-full h-full object-cover"
              src="/images/tilted_aerial.PNG"
            />
            <div className="absolute inset-0 bg-heritage-gold/25 hover:bg-transparent transition-all duration-500"></div>
          </div>

          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
