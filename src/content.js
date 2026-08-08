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
      "Welcome! I'm Sue Doherty, a certified clinical EFT coach dedicated to helping you gain emotional regulation. I saw my limiting beliefs so clearly that I stepped into my power and found the peace within, and you can too.",
      "My work as a neuroscientist at NIMH was foundational to linking my spiritual development with the neuroplasticity of the EFT technique. The tapping allowed me to release emotional blocks and solve realtioanl problems so I shine as a premium coach. Through our work together, you'll use the tools to down-regulate anxiety, overwhelm, fear or self-doubt so you too can transform."
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
    subheading: "Choose the container that best fits your needs.",
    offerings: [
      {
        icon: photos.serviceDiscovery,
        title: "Discovery Consultation",
        description: "A phone call to discuss your goals.",
        price: "$500"
      },
      {
        icon: photos.serviceIndividual,
        title: "3 months",
        description: "A 3 month container to shift to peace, calm and joy.",
        price: "$5,000."
      },
      {
        icon: photos.servicePackage,
        title: "6 months",
        description: "A 6th month container to anchor your joy and stabilize your powerful new normal.",
        price: "$10,000."
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
