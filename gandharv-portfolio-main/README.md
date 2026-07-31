# 👨‍💻 Gandharv— Portfolio

A modern, editorial-style portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **GSAP** animations.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)

## ✨ Features

- **Editorial Design** — Brutalist aesthetic with sharp edges and monospace typography
- **Smooth Animations** — GSAP-powered scroll animations and transitions
- **Responsive Layout** — Mobile-first design with asymmetric grids
- **Dark Mode** — Monochrome palette with orange accent
- **Performance** — Optimized with Next.js App Router and server components

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 14, React 18 |
| Styling | Tailwind CSS 4, CSS Variables |
| Animation | GSAP, ScrollTrigger |
| Typography | IBM Plex Sans/Mono, Bebas Neue |
| Deployment | Vercel |

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/tech-portfolio.git

# Navigate to directory
cd tech-portfolio

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Main page composition
│   └── globals.css     # Design tokens & base styles
├── components/
│   ├── hero-section.tsx
│   ├── signals-section.tsx
│   ├── work-section.tsx
│   ├── principles-section.tsx
│   ├── colophon-section.tsx
│   └── ui/             # Reusable UI components
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## 📜 Scripts

```bash
bun dev       # Start development server
bun build     # Build for production
bun start     # Start production server
bun lint      # Run ESLint
```

## 🎨 Design System

- **Colors**: Dark background (`oklch(0.08 0 0)`) with orange accent (`oklch(0.7 0.2 45)`)
- **Typography**: Bebas Neue for headlines, IBM Plex Mono for body
- **Spacing**: Consistent vertical rhythm with `py-32` sections
- **Borders**: No border radius — sharp, editorial aesthetic

## 📄 License

MIT © Gandharv

---

Built with ☕ and code.
