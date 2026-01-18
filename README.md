# LC Website - Improved

Modern, premium redesign of The Literary Circle website with 26+ improvements.

> **Note:** Image files are excluded from this repository due to size constraints. Deploy from your local environment or use the original image repository.

## 🚀 Quick Deploy to Vercel

1. Clone this repository
2. Copy your `public/images` folder from the original project
3. Run `pnpm install`
4. Deploy to Vercel

## ✨ Key Improvements (26 Total)

### Design System
- Literary color palette (Burgundy & Gold)
- Enhanced typography with better line heights
- Parchment background for vintage feel

### Hero Section
- Parallax scrolling effect
- Animated text reveals with stagger
- Rich gradient overlays
- Gold accent on main title

### Navigation
- Glassmorphic header design
- Animated gradient underlines on links
- Mobile menu with stagger animations
- Enhanced login button with spring animation

### Interactive Elements
- Team card hover effects (lift + zoom)
- Premium social icon animations
- Scroll-triggered section reveals
- Pulsing scroll indicator

### Performance
- 1-second timeout on Firebase calls
- Fallback to default content when offline
- Font smoothing and image optimization
- Instant page load

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Firebase

## 📦 Vercel Deployment

### Build Settings
```
Build Command: pnpm run build
Output Directory: dist
Install Command: pnpm install
Node Version: 18.x
```

### Environment Variables
Add your Firebase configuration:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- etc.

## 🎨 Features

- ✅ Parallax scrolling
- ✅ Animated text reveals
- ✅ Interactive team cards
- ✅ Enhanced social icons
- ✅ Smooth page transitions
- ✅ Mobile responsive
- ✅ Firebase integration with offline fallbacks

## 📝 License

MIT
