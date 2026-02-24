const MapSection = () => {
  return (
    <div className="relative h-[400px] bg-accent group overflow-hidden">
      <img 
        src="/images/ground-event.png" 
        alt="Wima Serenity Gardens grounds" 
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none group-hover:bg-primary/20 transition-all">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto transform group-hover:-translate-y-2 transition-transform">
          <span className="material-symbols-outlined text-primary text-5xl mb-3">location_on</span>
          <h4 className="font-display font-bold text-xl mb-2 text-primary">Our Location</h4>
          <p className="text-sm text-slate-600 mb-6">Find us in the heart of Kericho's lush tea gardens.</p>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-primary text-secondary px-6 py-3 rounded-full font-bold hover:bg-primary-light transition-all text-sm"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default MapSection