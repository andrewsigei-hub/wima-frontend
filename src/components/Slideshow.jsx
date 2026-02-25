import { useState, useEffect, useCallback } from 'react'

const slides = [
  { src: '/images/large_aerial_view.PNG',              alt: 'Aerial view of Wima Serenity Gardens' },
  { src: '/images/house_picture_from_garden.png',      alt: 'Main house viewed from the gardens' },
  { src: '/images/full_garden_pic.webp',               alt: 'Lush flower gardens in full bloom' },
  { src: '/images/golden_hour_garden.jpeg',            alt: 'Gardens bathed in golden hour light' },
  { src: '/images/balcony_pathway.webp',               alt: 'Pathway winding through the grounds' },
  { src: '/images/front_right_garden.webp',            alt: 'Front garden landscaping' },
  { src: '/images/right-side_garden_from_bottom.webp', alt: 'Side garden and manicured lawns' },
  { src: '/images/house_pic_from_out_with_table.jpeg', alt: 'Outdoor dining on the grounds' },
]

const Slideshow = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section id="slideshow" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 block">The Grounds</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-primary leading-tight">
            Experience Our <span className="font-script text-4xl md:text-5xl text-primary-light">Serene Estate</span>
          </h2>
        </div>

        {/* Slideshow */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[16/9]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}

          {/* Caption */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/60 to-transparent px-6 py-5 pointer-events-none">
            <p className="text-secondary/90 text-sm font-medium">{slides[current].alt}</p>
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Dot indicators + thumbnail strip */}
        <div className="mt-6 flex flex-col items-center gap-4">
          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-primary/30 hover:bg-primary/60'}`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${i === current ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-90'}`}
              >
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Slideshow
