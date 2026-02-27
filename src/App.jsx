import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Events from './components/Events'
import Gardens from './components/Gardens'
import Slideshow from './components/Slideshow'
import ReviewsSection from './components/ReviewsSection'
import Amenities from './components/Amenities'
import Nearby from './components/Nearby'
import Contact from './components/Contact'
import MapSection from './components/MapSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-background-light text-slate-800 min-h-screen pb-20 md:pb-0">
      <Hero />
      <About />
      <Rooms />
      <Events />
      <Gardens />
      <Slideshow />
      <ReviewsSection />
      <Amenities />
      <Nearby />
      <Contact />
      <MapSection />
      <Footer />

      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-white/95 backdrop-blur border border-heritage-gold-soft/60 rounded-2xl shadow-xl p-2">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="#contact"
            className="text-center py-3 rounded-xl border border-botanical/50 text-botanical font-semibold text-sm hover:bg-botanical/5 transition-all"
          >
            Inquire
          </a>
          <a
            href="#rooms"
            className="text-center py-3 rounded-xl bg-botanical text-white font-semibold text-sm hover:bg-primary transition-all"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default App