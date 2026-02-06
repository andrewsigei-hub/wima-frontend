import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Events', href: '#events' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full px-[5%] py-4 flex justify-between items-center z-50 bg-cream-bg/95 backdrop-blur-md border-b border-cream-dark">
      {/* Logo */}
      <div className="h-14">
        <img 
          src="/logo.png" 
          alt="WIMA Serenity Gardens" 
          className="h-full w-auto"
        />
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-gray-800 text-sm font-medium hover:text-green-forest transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button className="hidden md:block bg-green-deep text-cream-light px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-forest transition-all hover:-translate-y-0.5">
        Book Now
      </button>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-green-deep"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-cream-bg border-b border-cream-dark md:hidden">
          <ul className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button className="w-full bg-green-deep text-cream-light px-6 py-3 rounded-lg font-semibold">
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;