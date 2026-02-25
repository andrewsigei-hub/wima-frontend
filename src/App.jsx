import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesStrip from './components/ServicesStrip'
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
    <div className="bg-secondary text-slate-800">
      <Navbar />
      <Hero />
      <ServicesStrip />
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