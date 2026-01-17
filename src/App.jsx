import { useEffect } from 'react'
import './App.css'
import { content, photos } from './content'

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
          <span>{content.nav.logo}</span>
        </div>
        <ul className="nav-links">
          {content.nav.links.map((link, index) => (
            <li key={index}><a href={link.href}>{link.text}</a></li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-decoration left">
          <img src={`${import.meta.env.BASE_URL}${photos.heroLeft}`} alt="Hero decoration" />
        </div>
        <div className="hero-decoration right">
          <img src={`${import.meta.env.BASE_URL}${photos.heroRight}`} alt="Hero decoration" />
        </div>
        <div className="hero-content">
          <p className="hero-tagline">{content.hero.tagline}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero-description">
            {content.hero.description}
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={scrollToBooking}>
              {content.hero.primaryButton}
            </button>
            <a href="#about" className="btn btn-secondary">
              {content.hero.secondaryButton}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-content">
          <div className="about-image">
            <img
              src={`${import.meta.env.BASE_URL}${photos.about}`}
              alt="Sue Doherty - EFT Practitioner"
              className="about-photo"
            />
          </div>
          <div className="about-text">
            <h2>{content.about.heading}</h2>
            {content.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services-header">
          <h2>{content.services.heading}</h2>
          <p>{content.services.subheading}</p>
        </div>
        <div className="services-grid">
          {content.services.offerings.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                <img src={`${import.meta.env.BASE_URL}${service.icon}`} alt={service.title} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking" id="booking">
        <div className="booking-header">
          <h2>{content.booking.heading}</h2>
          <p>{content.booking.description}</p>
        </div>
        <div className="calendly-container">
          <div
            className="calendly-inline-widget"
            data-url={content.booking.calendlyUrl}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-header">
          <h2>{content.testimonials.heading}</h2>
        </div>
        <div className="testimonials-grid">
          {content.testimonials.reviews.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2>{content.contact.heading}</h2>
        <p>{content.contact.description}</p>
        <a href={`mailto:${content.contact.email}`} className="contact-email">
          {content.contact.email}
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{content.footer.copyright}</p>
      </footer>
    </>
  )
}

export default App
