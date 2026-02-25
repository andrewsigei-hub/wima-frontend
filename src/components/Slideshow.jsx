import { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  { src: '/images/large_aerial_view.PNG',              alt: 'Aerial view of Wima Serenity Gardens' },
  { src: '/images/house_picture_from_garden.png',      alt: 'Main house viewed from the gardens' },
  { src: '/images/full_garden_pic.webp',               alt: 'Lush flower gardens in full bloom' },
  { src: '/images/golden_hour_garden.jpeg',            alt: 'Gardens bathed in golden hour light' },
  { src: '/images/balcony_pathway.webp',               alt: 'Pathway winding through the grounds' },
  { src: '/images/front_right_garden.webp',            alt: 'Front garden landscaping' },
  { src: '/images/right-side_garden_from_bottom.webp', alt: 'Side garden and manicured lawns' },
  { src: '/images/house_pic_from_out_with_table.jpeg', alt: 'Outdoor dining on the grounds' },
]

// Wrap first/last slides as clones to enable seamless infinite looping.
// Layout: [clone-of-last, ...SLIDES, clone-of-first]
// Real slides sit at positions 1 → SLIDES.length.
const EXT = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]]

const Slideshow = () => {
  // index into EXT; start at 1 (first real slide)
  const [index, setIndex]       = useState(1)
  const [animated, setAnimated] = useState(true)
  const [paused, setPaused]     = useState(false)

  // Dot / thumbnail index (0-based into SLIDES)
  const realIndex = ((index - 1) % SLIDES.length + SLIDES.length) % SLIDES.length

  const goNext = useCallback(() => {
    setAnimated(true)
    setIndex(i => i + 1)
  }, [])

  const goPrev = useCallback(() => {
    setAnimated(true)
    setIndex(i => i - 1)
  }, [])

  const goTo = (ri) => {
    setAnimated(true)
    setIndex(ri + 1)
  }

  // After a clone slide finishes transitioning, silently teleport to the real slide.
  useEffect(() => {
    if (index !== 0 && index !== EXT.length - 1) return

    const teleportTo = index === 0 ? SLIDES.length : 1

    const id = setTimeout(() => {
      // Disable transition → instant position change (same visual)
      setAnimated(false)
      setIndex(teleportTo)
      // Re-enable transition after the browser has painted the new position
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    }, 700)

    return () => clearTimeout(id)
  }, [index])

  // Auto-advance every 4.5 s; pause on hover
  useEffect(() => {
    if (paused) return
    const id = setInterval(goNext, 4500)
    return () => clearInterval(id)
  }, [paused, goNext])

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

        {/* Carousel */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[16/9]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Sliding strip */}
          <div
            className="flex h-full"
            style={{
              width: `${EXT.length * 100}%`,
              transform: `translateX(-${(index / EXT.length) * 100}%)`,
              transition: animated ? 'transform 700ms ease-in-out' : 'none',
            }}
          >
            {EXT.map((slide, i) => (
              <div
                key={i}
                style={{ width: `${100 / EXT.length}%` }}
                className="flex-shrink-0 h-full"
              >
                <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-primary/60 to-transparent px-6 py-5 pointer-events-none">
            <p className="text-secondary/90 text-sm font-medium">{SLIDES[realIndex].alt}</p>
          </div>

          {/* Prev / Next */}
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={goNext}
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
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all ${i === realIndex ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-primary/30 hover:bg-primary/60'}`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all ${i === realIndex ? 'ring-2 ring-primary scale-105' : 'opacity-60 hover:opacity-90'}`}
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
