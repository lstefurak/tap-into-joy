import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">
          <span>Tap Into Joy</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#booking">Book Now</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-decoration left">🌸</div>
        <div className="hero-decoration right">🌿</div>
        <div className="hero-content">
          <p className="hero-tagline">Emotional Freedom Through Gentle Healing</p>
          <h1>Tap Into Joy</h1>
          <p className="hero-description">
            Release stress, anxiety, and emotional blocks with EFT Tapping.
            Experience the transformative power of this gentle, effective technique
            with certified practitioner Sue Doherty.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToBooking}>
              Book a Session
            </button>
            <a href="#about" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-content">
          <div className="about-image">
            <div className="about-image-placeholder">
              🌷
            </div>
          </div>
          <div className="about-text">
            <h2>Meet Sue Doherty</h2>
            <p>
              Welcome! I'm Sue Doherty, a certified EFT (Emotional Freedom Techniques)
              practitioner dedicated to helping you find peace, clarity, and emotional freedom.
            </p>
            <p>
              EFT Tapping combines ancient Chinese acupressure with modern psychology
              to help release emotional blocks, reduce stress, and transform limiting beliefs.
              Through our sessions together, you'll learn powerful tools to navigate life's
              challenges with greater ease and resilience.
            </p>
            <p>
              Whether you're dealing with anxiety, past trauma, relationship issues, or
              simply seeking personal growth, I'm here to guide you on your journey to
              emotional wellness.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services-header">
          <h2>Services</h2>
          <p>
            Choose the session type that best fits your needs. All sessions are
            conducted virtually via Zoom for your convenience.
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🌱</div>
            <h3>Discovery Session</h3>
            <p>
              A 30-minute introductory session to explore EFT and discuss your goals.
              Perfect for first-time clients.
            </p>
            <div className="service-price">$50</div>
          </div>
          <div className="service-card">
            <div className="service-icon">🌸</div>
            <h3>Individual Session</h3>
            <p>
              A full 60-minute one-on-one tapping session focused on your specific
              concerns and goals.
            </p>
            <div className="service-price">$95</div>
          </div>
          <div className="service-card">
            <div className="service-icon">🌻</div>
            <h3>Package of 4</h3>
            <p>
              Four 60-minute sessions for deeper, sustained transformation.
              Includes email support between sessions.
            </p>
            <div className="service-price">$340</div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking" id="booking">
        <div className="booking-header">
          <h2>Book Your Session</h2>
          <p>
            Select a time that works for you. After booking, you'll receive a
            confirmation email with your Zoom link.
          </p>
        </div>
        <div className="calendly-container">
          {/* Replace YOUR_CALENDLY_URL with Sue's actual Calendly link */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/tappingintojoy"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-header">
          <h2>What Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Working with Sue has been transformative. The tapping technique helped
              me release anxiety I'd been carrying for years. I feel lighter and more
              at peace than I have in a long time."
            </p>
            <p className="testimonial-author">— Sarah M.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Sue creates such a safe, supportive space. Her gentle guidance helped
              me work through some difficult emotions. I highly recommend her to anyone
              seeking emotional healing."
            </p>
            <p className="testimonial-author">— Jennifer K.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "I was skeptical at first, but after just a few sessions I noticed real
              changes in how I handle stress. EFT tapping is now part of my daily
              self-care routine."
            </p>
            <p className="testimonial-author">— Michael R.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>Get in Touch</h2>
        <p>
          Have questions? I'd love to hear from you. Reach out and let's start
          your journey to emotional freedom.
        </p>
        <a href="mailto:sue@tapintojoy.com" className="contact-email">
          sue@tapintojoy.com
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Tap Into Joy | Sue Doherty, Certified EFT Practitioner</p>
      </footer>
    </>
  )
}

export default App
