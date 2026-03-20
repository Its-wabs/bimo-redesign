# Bimo - Bilingual Landing Page

Modern, performance-optimized landing page for BeMo, an Algerian cookie brand with 26 years of heritage. Built with Next.js , featuring smooth scroll animations and native bilingual support (English/Arabic RTL).

🔗 **Live Demo:** [bimo-redesign.vercel.app](https://bimo-redesign.vercel.app/)

![BimoLanding Page](./public/screenshots/hero-preview.png)

---

## ✨ Features

- **Bilingual Support** - English and Arabic with full RTL layout
- **Smooth Animations** - GSAP-powered scroll effects (60fps)
- **Performance First** - <2s load time on 3G, Lighthouse 94+
- **Mobile Optimized** - Mobile-first responsive design
- **Modern Stack** - Next.js , TypeScript, Tailwind CSS

---

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [GSAP](https://greensock.com/gsap/) - Animations
- [Vercel](https://vercel.com/) - Deployment

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Its-wabs/bimo-redesign.git
cd bimo

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```

bimo/

├── app/
│   ├── [locale]/          # Internationalized routes
  ├── products/       # Products page for testing flow
   ├── page.tsx
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── globals.css        # Global styles
 ├── fonts/
  ├──PeaceSans.ttf    # local custom font
├── components/
│   ├── hero.tsx           # Hero section
│   ├── Product.tsx       # Products showcase
│   ├── bimobutton.tsx    # a reusable button design
│   ├── testimonials.tsx      # Testimonials
 ├── FullScreenMenu.tsx  # Full menuscreen for navigation
 ├── LanguageSwitcher.tsx # Re-usable button for lanugage
 ├── navbar.tsx         # landing page navbar
 ├── pre-loader         # pre-loader on page reload
 ├── rollingcookie.tsx  # the main hero to video cookie
 ├── buddycookie.tsx    # rollingcookie for the rest of the page
 ├── VideoPortal.tsx    # the full video showcase after the hero
│   └── FindStore.tsx         # A final CTA + our footer
├── i18n/
│   ├── en.json            # English translations
│   └── ar.json            # Arabic translations
├── hooks/
 ├── useLiquidNavigation.ts #liquid transition animation
├── public/
│   └── img/            # Optimized images
  ├── video/      # videoportal

---

## 🌍 Languages

- 🇬🇧 English (Default)
- 🇸🇦 Arabic (Full RTL support)

Switch languages using the language selector in the navigation.

---

## ⚡ Performance

- **Lighthouse Score:** 94/100
- **First Contentful Paint:** <2s on 3G
- **Largest Contentful Paint:** <2.5s
- **Bundle Size:** ~180KB gzipped

### Optimization Techniques

- Image optimization (WebP, lazy loading)
- Code splitting for heavy components
- GPU-accelerated animations (transform/opacity only)
- Font optimization with next/font

---

## 🎨 Design Features

- Custom illustrated cookie preloader
- Scroll-triggered cookie rotation animation
- Smooth section reveals with GSAP ScrollTrigger
- Responsive grid layouts (mobile-first)
- Native RTL support for Arabic

---

## 🐛 Known Issues / Future Improvements

### Current Limitations
- [ ] No e-commerce integration (landing page only)
- [ ] Limited to 2 languages (could add French)
- [ ] Static content (no CMS)

### Roadmap
- [ ] Add third language (French for majority french speaking algerian market)
- [ ] Integrate CMS for content management (Sanity/Contentful)
- [ ] Update product page with filtering/search
- [ ] Implement store locator map (Google Maps API)
- [ ] A/B testing for conversion optimization

---

## 🧪 Testing

### Manual Testing Checklist
- [x] Mobile responsive (iPhone SE, Android)
- [x] Tablet responsive (iPad)
- [x] Desktop (1920×1080, 4K)
- [x] English language
- [x] Arabic language + RTL layout
- [x] Scroll animations (smooth 60fps)
- [x] Image lazy loading
- [x] Keyboard navigation
- [x] Screen reader compatibility

---


## 📚 Lessons Learned

### Technical Challenges & Solutions

**Challenge 1: 3G Performance**
- **Problem**: Initial load time was 5s+ on 3G
- **Solution**: Aggressive image optimization (WebP, 80% quality), code splitting, lazy loading
- **Result**: <2s load time on 3G

**Challenge 2: Arabic RTL Layout**
- **Problem**: Animations and layouts broke in RTL mode
- **Solution**: CSS logical properties, RTL-aware GSAP animations, separate RTL stylesheet
- **Result**: Seamless RTL experience

**Challenge 3: Scroll Animation Performance on Mobile**
- **Problem**: Janky 30fps animations on budget Android devices
- **Solution**: GPU-accelerated transforms only, disabled complex animations on low-end devices
- **Result**: Smooth 60fps on most devices

### What I'd Do Differently
- Start with i18n from day 1 (retrofitting is harder)
- Document as I build (not retroactively)
- Commit more frequently (smaller, focused commits)
- Test on real devices earlier (emulator ≠ reality)

---

## 📝 License

This project was created as a portfolio piece. All rights to the Bimo brand belong to groupe Bimo Algeria.

---

## 👤 Developer

**Cherfi Mohammed Abdelwahab**

- Portfolio: [Its-wabs](https://itswabs.vercel.app/)
- GitHub: [@Its-wabs](https://github.com/Its-wabs)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/itswabs/)

---

## 🙏 Acknowledgments

- Bimo brand for 26 years of delicious cookies
- GSAP for powerful animation library
- Next.js team for excellent framework

---

**Built with ❤️ in Algeria**
