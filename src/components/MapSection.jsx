const MapSection = () => {
  return (
    <section className="relative h-[400px] bg-cream-bg group overflow-hidden" aria-label="Map and location section">
      <img 
        src="/images/house_pic_from_out_with_table.jpeg" 
        alt="Wima Serenity Gardens grounds" 
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-botanical/45 flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none group-hover:bg-botanical/25 transition-all">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto transform group-hover:-translate-y-2 transition-transform">
          <span className="material-symbols-outlined text-botanical text-5xl mb-3">location_on</span>
          <h4 className="font-display font-bold text-xl mb-2 text-botanical">Our Location</h4>
          <p className="text-sm text-slate-600 mb-6">Find us in the heart of Kericho's lush tea gardens.</p>
          <a 
            href="https://www.google.com/maps/dir//Wima+Serenity+Gardens+Guest+House+Kericho,+Busia+Rd,+Kisumu/@-0.2938593,35.412323,17z/data=!4m16!1m7!3m6!1s0x182a43129bbb7c41:0x8da1770841ec2214!2sWima+Serenity+Gardens+Guest+House+Kericho!8m2!3d-0.2938593!4d35.412323!16s%2Fg%2F11g88t582g!4m7!1m0!1m5!1m1!1s0x182a43129bbb7c41:0x8da1770841ec2214!2m2!1d35.4123312!2d-0.2938698?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-botanical text-secondary px-6 py-3 rounded-full font-bold hover:bg-primary transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default MapSection