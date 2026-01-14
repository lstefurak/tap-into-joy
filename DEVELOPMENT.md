# Tap Into Joy - Development Guide

## Project Overview
A single-page website for Sue Doherty's EFT Tapping practice. Built with React + Vite, hosted on GitHub Pages.

**Live Site:** https://lstefurak.github.io/tap-into-joy/
**Repository:** https://github.com/lstefurak/tap-into-joy

## Tech Stack
- **Framework:** React 19 + Vite 7
- **Styling:** Vanilla CSS with CSS variables
- **Fonts:** Google Fonts (Cormorant Garamond + Nunito)
- **Booking:** Calendly embedded widget
- **Payments:** Stripe (via Calendly integration)
- **Hosting:** GitHub Pages
- **Deployment:** gh-pages npm package

## Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Setup
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Opens at: http://localhost:5173/tap-into-joy/

### Build
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```
This builds and pushes to the `gh-pages` branch automatically.

## Project Structure
```
tap-into-joy/
├── index.html          # HTML entry point (fonts, meta tags)
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main component with all sections
│   ├── App.css         # Component styles
│   └── index.css       # Global styles, CSS variables, theme
├── vite.config.js      # Vite config (base path for GH Pages)
└── package.json        # Dependencies and scripts
```

## Design Theme
**Flower/Nature aesthetic with:**
- **Colors:**
  - Cream: #FFF9F5
  - Blush: #F8E8E0
  - Rose: #E8C4C0
  - Sage: #9CAF88
  - Forest: #5C7A5C
- **Typography:**
  - Headings: Cormorant Garamond (serif)
  - Body: Nunito (sans-serif)

## Current Sections
1. **Navigation** - Fixed header with smooth scroll links
2. **Hero** - Tagline, title, description, CTA buttons
3. **About** - Sue's bio (placeholder image)
4. **Services** - 3 tiers (Discovery $50, Individual $95, Package $340)
5. **Booking** - Embedded Calendly widget
6. **Testimonials** - 3 placeholder testimonials
7. **Contact** - Email link
8. **Footer** - Copyright

## Configuration

### Calendly
- URL: https://calendly.com/tappingintojoy
- Configured in: `src/App.jsx` line 141
- Stripe payments: Set up in Calendly dashboard (Integrations > Payments)

### Contact Email
- tappingintojoy@gmail.com
- Configured in: `src/App.jsx` line 187

### GitHub Pages
- Base path: `/tap-into-joy/`
- Configured in: `vite.config.js`
- Homepage: Set in `package.json`

## TODO / Future Enhancements
- [ ] Add Sue's actual photo (replace placeholder in About section)
- [ ] Update bio with Sue's real content
- [ ] Confirm/update service pricing
- [ ] Add real testimonials
- [ ] Set up Stripe in Calendly for payments
- [ ] Consider custom domain (e.g., tapintojoy.com)
- [ ] Add mobile hamburger menu
- [ ] Add favicon (currently using emoji)
- [ ] SEO optimization (meta tags, Open Graph)
- [ ] Analytics (Google Analytics or similar)

## Useful Commands
```bash
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build locally

# Deployment
npm run deploy        # Build and deploy to GitHub Pages

# Git
git add . && git commit -m "message"   # Commit changes
git push origin main                    # Push to main branch
```

## Notes
- The `gh-pages` branch is auto-managed by the deploy script
- Changes to main branch don't auto-deploy; run `npm run deploy` manually
- Calendly widget loads via external script in App.jsx useEffect
