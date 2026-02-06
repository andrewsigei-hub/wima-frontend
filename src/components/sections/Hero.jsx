import { MapPin, Home, Trees, PartyPopper } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-[5%]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-green-mist px-4 py-2 rounded-full mb-6">
            <MapPin size={16} className="text-green-deep" />
            <span className="text-sm text-green-deep font-medium">Kericho, Kenya</span>
          </div>

          <h1 className="font-serif text-4xl lg:text-5xl font-medium text-green-deep leading-tight mb-6">
            <span className="font-script text-5xl lg:text-6xl text-green-forest block">Welcome to</span>
            WIMA Serenity Gardens
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Nestled in Kenya's tea country, discover a peaceful retreat where lush gardens, 
            warm hospitality, and comfortable accommodations come together. Your perfect 
            escape awaits.
          </p>

          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                <Home size={18} className="text-green-deep" />
              </div>
              <span className="text-sm font-medium">7 Cozy Rooms</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                <Trees size={18} className="text-green-deep" />
              </div>
              <span className="text-sm font-medium">Lush Gardens</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                <PartyPopper size={18} className="text-green-deep" />
              </div>
              <span className="text-sm font-medium">2 Event Venues</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#rooms"
              className="inline-flex items-center gap-2 bg-green-deep text-cream-light px-8 py-4 rounded-lg font-semibold hover:bg-green-forest transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              View Rooms
              <span>→</span>
            </a>
            <a
              href="#events"
              className="inline-flex items-center gap-2 border-2 border-green-deep text-green-deep px-8 py-4 rounded-lg font-semibold hover:bg-green-deep hover:text-cream-light transition-all"
            >
              Plan an Event
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-green-forest to-green-sage rounded-2xl flex items-center justify-center text-green-pale shadow-2xl">
            PROPERTY IMAGE
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-xl shadow-lg">
            <div className="text-2xl mb-1">⭐</div>
            <div className="font-serif text-lg font-semibold text-green-deep">Est. 2017</div>
            <div className="text-xs text-gray-500">9 Years of Hospitality</div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute top-5 -right-5 bg-white p-5 rounded-xl shadow-lg hidden lg:block">
            <div className="text-2xl mb-1">☕</div>
            <div className="font-serif text-lg font-semibold text-green-deep">Breakfast Included</div>
            <div className="text-xs text-gray-500">With all rooms</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;