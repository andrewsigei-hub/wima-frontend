import { useEffect, useRef } from 'react'

export default function Approach() {
  const videoRef = useRef(null)

  // Ensure video plays automatically on low power modes if possible
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="py-20 md:py-28 bg-cream-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-botanical font-semibold tracking-widest uppercase text-sm mb-3 block">
            The Approach
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-botanical leading-tight">
            Your Grand Entrance
          </h2>
          <div className="w-24 h-1 bg-heritage-gold-soft mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Video Side */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-cream-light transform lg:-rotate-2 transition-transform duration-700 hover:rotate-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover aspect-[4/5] sm:aspect-video lg:aspect-[4/5]"
              src="/images/entry+approach/IMG_4900.MOV"
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-botanical/10 pointer-events-none"></div>
          </div>

          {/* Photo Grid Side */}
          <div className="space-y-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              From the moment you arrive at WIMA Serenity Gardens, you are transported into a world of lush tranquility. Our manicured pathways and sweeping driveways set the perfect stage for your special day.
            </p>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-xl overflow-hidden shadow-md transform translate-y-4">
                <img 
                  src="/images/entry+approach/IMG_4886.JPG" 
                  alt="Entry pathway" 
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-md">
                <img 
                  src="/images/entry+approach/IMG_4896.JPG" 
                  alt="Driveway approach" 
                  className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
