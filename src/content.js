// Website Content Configuration
// Edit this file to update text content throughout the site

// Photo filenames
export const photos = {
  heroLeft: "white-rose.jpg",
  heroRight: "white-dogwood.jpg",
  serviceDiscovery: "white-rose.jpg",
  serviceIndividual: "white-orchid.jpg",
  servicePackage: "white-dogwood.jpg",
  about: "sue-doherty.jpg"
}

export const content = {
  // About Section - Sue's Bio
  about: {
    heading: "Meet Sue Doherty",
    paragraphs: [
      "Welcome! I'm Sue Doherty, MS in Chemistry, a certified clinical EFT coach, cellular transformation", 
      "you can repattern to radiant health, release anxiety, and let go of past trauma."
    ]
  },

  // Hero Section
  hero: {
    tagline: "Emotional Freedom Through Gentle Healing",
    title: "Tap Into Joy",
    description: "Experience the transformative power of this gentle, somatic-cognitive method  with a clinically certified practitioner, Sue Doherty.",
    primaryButton: "Book a Session",
    secondaryButton: "Learn More"
  },

  // Services
  services: {
    heading: "Services",
    subheading: "Choose a time period that best fits your needs.",
    offerings: [
      {
        icon: photos.serviceDiscovery,
        title: "Discovery Consultation",
        description: "A phone consultaiotn to discuss your goals.",
        price: "free."
      },
      {
        icon: photos.serviceIndividual,
        title: "1 month",
        description: "a one month reframe with weekly zoom calls to shift you to peace, calm and joy.",
        price: "$400."
      },
      {
        icon: photos.servicePackage,
        title: "3 months",
        description: "A 3 month stability refame to anchor your joy and stabilize your powerful new normal.",
        price: "$1200."
      }
    ]
  },

  // Booking Section
  booking: {
    heading: "Book Your Consult",
    description: "Select a time that works for you. After booking, you'll receive a confirmation email with your Zoom link.",
    calendlyUrl: "https://calendly.com/tappingintojoy"
  },

  // Testimonials
  testimonials: {
    heading: "What Clients Say",
    reviews: [
      {
        text: "Working with Sue has been transformative. The tapping technique helped me release anxiety I'd been carrying for years. I feel lighter and more at peace than I have in a long time.",
        author: "— Sarah M."
      },
      {
        text: "Sue creates such a safe, supportive space. Her gentle guidance helped me work through some difficult emotions. I highly recommend her to anyone seeking emotional healing.",
        author: "— Jennifer K."
      },
      {
        text: "I was skeptical at first, but after just a few sessions I noticed real changes in how I handle stress. EFT tapping is now part of my daily self-care routine.",
        author: "— Michael R."
      }
    ]
  },

  // Contact Section
  contact: {
    heading: "Get in Touch",
    description: "Have questions? I'd love to hear from you. Reach out and let's start your journey to emotional freedom.",
    email: "tappingintojoy@gmail.com"
  },

  // Footer
  footer: {
    copyright: "© 2026 Tap Into Joy | Sue Doherty, Certified EFT Practitioner"
  },

  // Navigation
  nav: {
    logo: "Tap Into Joy",
    links: [
      { text: "About", href: "#about" },
      { text: "Services", href: "#services" },
      { text: "Book Now", href: "#booking" },
      { text: "Contact", href: "#contact" }
    ]
  }
}
