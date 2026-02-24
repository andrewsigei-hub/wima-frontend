import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesStrip from './components/ServicesStrip'
import About from './components/About'
import Rooms from './components/Rooms'
import Events from './components/Events'
import Gardens from './components/Gardens'
import Amenities from './components/Amenities'
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
      <Amenities />
      <Contact />
      <MapSection />
      <Footer />
    </div>
  )
}

export default App