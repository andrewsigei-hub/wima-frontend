import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Events from './components/Events'
import Gardens from './components/Gardens'
import Slideshow from './components/Slideshow'
import Amenities from './components/Amenities'
import Nearby from './components/Nearby'
import Contact from './components/Contact'
import MapSection from './components/MapSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-background-light text-slate-800 min-h-screen">
      <Hero />
      <About />
      <Rooms />
      <Events />
      <Gardens />
      <Slideshow />
      <Amenities />
      <Nearby />
      <Contact />
      <MapSection />
      <Footer />
    </div>
  )
}

export default App