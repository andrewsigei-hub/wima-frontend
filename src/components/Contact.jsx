import { useState } from 'react'
import api from '../lib/api'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const contactMethods = [
    { icon: 'phone', label: 'Call Us', values: ['+254 700 000 000', '+254 711 000 000'] },
    { icon: 'chat', label: 'WhatsApp', values: ['Chat on WhatsApp'], link: 'https://wa.me/254700000000' },
    { icon: 'mail', label: 'Email Us', values: ['info@wimaserenity.com', 'bookings@wimaserenity.com'] },
    { icon: 'schedule', label: 'Business Hours', values: ['Mon - Sun: 7:00 AM - 9:00 PM'], note: 'Guest check-in: 24/7' },
  ]

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const payload = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        ...(form.phone && { phone: form.phone }),
      }
      await api.post('/contact', payload)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const inputClass = 'w-full rounded-lg border border-heritage-gold-soft/60 bg-[#fbf8ef] focus:ring-2 focus:ring-botanical focus:border-botanical transition-all px-4 py-3 outline-none'

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#f8f3e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-primary/5 border border-heritage-gold-soft/40">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold text-botanical">Send us a Message</h2>
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-botanical/60 text-botanical text-sm font-semibold hover:bg-botanical/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
                >
                  WhatsApp Us
                </a>
              </div>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">check_circle</span>
                  <p className="text-lg font-semibold text-primary mb-2">Message sent!</p>
                  <p className="text-slate-600 mb-6">We&apos;ll get back to you soon.</p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-primary font-semibold underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+254 700 000 000"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Room Booking">Room Booking</option>
                      <option value="Event Inquiry">Event Inquiry</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your plans..."
                      required
                      minLength={10}
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
                    className="w-full bg-botanical text-secondary py-4 rounded-lg font-bold hover:bg-primary transform active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-gold-soft"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                        Sending…
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-heritage-gold-soft/40">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-botanical bg-[#f2ecda] p-3 rounded-lg">{method.icon}</span>
                  <h3 className="font-bold text-lg text-botanical">{method.label}</h3>
                </div>
                {method.values.map((value, i) => (
                  method.link ? (
                    <a key={i} href={method.link} className="text-primary font-bold hover:underline flex items-center gap-1">
                      {value}
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  ) : (
                    <p key={i} className="text-slate-600 font-medium">{value}</p>
                  )
                ))}
                {method.note && (
                  <p className="text-xs text-slate-500 italic mt-2 bg-accent/50 px-3 py-1 rounded-full inline-block">{method.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
