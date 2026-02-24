const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/wima-logo.jpeg" 
              alt="Wima Serenity Gardens" 
              className="h-12 w-auto object-contain"
            />
            <span className="font-display text-lg font-bold text-primary tracking-tight hidden sm:block">
              Wima Serenity Gardens
            </span>
          </div>
          
          {/* Book Now */}
          <a 
            href="#contact" 
            className="bg-primary text-secondary px-5 py-2.5 rounded-lg hover:bg-primary-light transition-all font-semibold text-sm"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar