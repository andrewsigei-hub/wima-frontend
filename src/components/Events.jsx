import { useState } from 'react'
import api from '../lib/api'

const inputClass =
  'w-full rounded-lg border border-heritage-gold-soft/60 bg-[#fbf8ef] focus:ring-2 focus:ring-botanical focus:border-botanical outline-none transition-all px-4 py-3 text-slate-800'

const today = new Date().toISOString().split('T')[0]

// ─── Event Inquiry Modal ──────────────────────────────────────────────────────

function EventInquiryModal({ venuePreference, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: 'wedding',
    event_date: '',
    guest_count: '',
    venue_preference: venuePreference || '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      await api.post('/inquiries/event', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        event_type: form.event_type,
        event_date: form.event_date,
        guest_count: parseInt(form.guest_count, 10),
        venue_preference: form.venue_preference || undefined,
        message: form.message,
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-display text-xl font-bold text-primary">Event Inquiry</h3>
            <p className="text-sm text-slate-500 mt-0.5">Tell us about your event and we&apos;ll be in touch</p>
          </div>
          <button type="button" aria-label="Close event inquiry modal" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
            <p className="text-lg font-semibold text-primary mb-2">Inquiry sent!</p>
            <p className="text-slate-600 mb-6">We&apos;ll be in touch to discuss your event shortly.</p>
            <button type="button" onClick={onClose} className="text-primary font-semibold underline underline-offset-2">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+254700000000" className={inputClass} />
              </div>
            </div>

            {/* Event details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Type *</label>
                <select name="event_type" value={form.event_type} onChange={handleChange} required className={inputClass}>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="birthday">Birthday</option>
                  <option value="reunion">Reunion</option>
                  <option value="graduation">Graduation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Date *</label>
                <input name="event_date" type="date" value={form.event_date} onChange={handleChange} required min={today} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Guest Count *</label>
                <input name="guest_count" type="number" min="1" max="500" value={form.guest_count} onChange={handleChange} required placeholder="e.g. 150" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Venue Preference</label>
                <select name="venue_preference" value={form.venue_preference} onChange={handleChange} className={inputClass}>
                  <option value="">No preference</option>
                  <option value="field_1">Main Event Field</option>
                  <option value="field_2">Garden Terrace</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                minLength={10}
                rows="3"
                placeholder="Tell us more about your event — theme, catering needs, setup requirements…"
                className={inputClass}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-botanical text-secondary py-3 rounded-lg font-bold hover:bg-primary transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
            >
              {status === 'loading' ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  Sending…
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">send</span>
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Events = () => {
  const [eventModal, setEventModal] = useState(null) // null | venuePreference string

  const venues = [
    {
      name: 'Main Event Field',
      description: 'Our larger venue with expansive lawns, perfect for weddings and large celebrations. Accommodates up to 500 guests.',
      image: '/images/large_aerial_view.PNG',
      tag: 'Popular',
      tagColor: 'bg-gold text-white',
      capacity: 'Up to 500 guests',
      feature: 'Tent setup',
      featureIcon: 'tent',
      venuePreference: 'field_1',
    },
    {
      name: 'Garden Terrace',
      description: 'A more intimate setting surrounded by our beautiful gardens. Ideal for corporate events and smaller gatherings.',
      image: '/images/house_pic_from_out_with_table.jpeg',
      tag: 'Intimate',
      tagColor: 'bg-cream text-primary',
      capacity: 'Up to 200 guests',
      feature: 'Garden views',
      featureIcon: 'local_florist',
      venuePreference: 'field_2',
    },
  ]

  const eventTypes = [
    { icon: 'church',           label: 'Weddings' },
    { icon: 'cake',             label: 'Birthdays' },
    { icon: 'business_center',  label: 'Corporate' },
    { icon: 'groups',           label: 'Reunions' },
    { icon: 'school',           label: 'Graduations' },
  ]

  return (
    <section id="events" className="py-20 md:py-28 bg-[#f8f4e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-heritage-gold uppercase tracking-widest mb-3 block">Events</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-botanical leading-tight mb-4">
            <span className="font-script text-4xl md:text-5xl text-heritage-gold block">Host Your Event</span>
            With Us
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our expansive grounds feature two beautiful event spaces perfect for weddings, corporate gatherings, birthday celebrations, and family reunions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="#gardens"
              className="px-6 py-3 rounded-lg border border-botanical/60 text-botanical font-semibold hover:bg-botanical/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
            >
              Explore Venues
            </a>
            <button
              type="button"
              onClick={() => setEventModal('')}
              className="px-6 py-3 rounded-lg bg-botanical text-secondary font-semibold hover:bg-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
            >
              Inquire Now
            </button>
          </div>
        </div>

        {/* Two Venue Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {venues.map((venue, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-heritage-gold-soft/40 hover:-translate-y-2 transition-all duration-300">
              <div className="h-56 relative overflow-hidden">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                <div className={`absolute top-4 left-4 ${venue.tagColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                  {venue.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-primary mb-2">{venue.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{venue.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#f2ecda] rounded-full text-xs text-botanical">
                    <span className="material-symbols-outlined text-sm">groups</span> {venue.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#f2ecda] rounded-full text-xs text-botanical">
                    <span className="material-symbols-outlined text-sm">{venue.featureIcon}</span> {venue.feature}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                  <div>
                    <span className="font-display text-2xl font-semibold text-primary">KSh 50,000</span>
                    <span className="text-xs text-slate-500">/day</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Inquire about ${venue.name}`}
                    onClick={() => setEventModal(venue.venuePreference)}
                    className="px-5 py-2 bg-botanical text-secondary rounded-lg text-sm font-semibold hover:bg-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Types */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4">Perfect for:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {eventTypes.map((type, index) => (
              <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-[#efe6cd] rounded-full text-sm text-botanical">
                <span className="material-symbols-outlined text-base">{type.icon}</span> {type.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Event inquiry modal */}
      {eventModal !== null && (
        <EventInquiryModal
          venuePreference={eventModal}
          onClose={() => setEventModal(null)}
        />
      )}
    </section>
  )
}

export default Events
