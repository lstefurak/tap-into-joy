// Website Content Configuration
// Edit this file to update text content throughout the site

// Photo filenames
export const photos = {
  heroLeft: "hero-left.jpg",
  heroRight: "hero-right.jpg",
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
      "Welcome! I'm Sue Doherty, a certified EFT (Emotional Freedom Techniques) practitioner dedicated to helping you find peace, clarity, and emotional freedom.",
      "EFT Tapping combines ancient Chinese acupressure with modern psychology to help release emotional blocks, reduce stress, and transform limiting beliefs. Through our sessions together, you'll learn powerful tools to navigate life's challenges with greater ease and resilience.",
      "Whether you're dealing with anxiety, past trauma, relationship issues, or simply seeking personal growth, I'm here to guide you on your journey to emotional wellness."
    ]
  },

  // Hero Section
  hero: {
    tagline: "Emotional Freedom Through Gentle Healing",
    title: "Tap Into Joy",
    description: "Release stress, anxiety, and emotional blocks with EFT Tapping. Experience the transformative power of this gentle, effective technique with certified practitioner Sue Doherty.",
    primaryButton: "Book a Session",
    secondaryButton: "Learn More"
  },

  // Services
  services: {
    heading: "Services",
    subheading: "Choose the session type that best fits your needs. All sessions are conducted virtually via Zoom for your convenience.",
    offerings: [
      {
        icon: photos.serviceDiscovery,
        title: "Discovery Session",
        description: "A 30-minute introductory session to explore EFT and discuss your goals. Perfect for first-time clients.",
        price: "complementary"
      },
      {
        icon: photos.serviceIndividual,
        title: "Individual Session",
        description: "A full 90-minute one-on-one tapping session focused on your specific concerns and goals.",
        price: "$95"
      },
      {
        icon: photos.servicePackage,
        title: "Package of 2",
        description: "Two 90-minute sessions for deeper, sustained transformation. Includes email support between sessions.",
        price: "$150"
      }
    ]
  },

  // Booking Section
  booking: {
    heading: "Book Your Session",
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
