"use client"

import { useState, useEffect } from "react"

const navLinks = [
  { label: "About", href: "#bio" },
  { label: "Projects", href: "#work" },
  { label: "Resume", href: "#skills" },
  { label: "Github", href: "https://github.com/gurugandharv11", external: true },
]

export function Navbar() {
  const [isLight, setIsLight] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light") {
      setIsLight(true)
      document.documentElement.classList.add("light-mode")
    }
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle("light-mode", next)
    localStorage.setItem("theme", next ? "light" : "dark")
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem clamp(1.5rem, 5vw, 5rem)",
        mixBlendMode: "difference",
      }}
    >
      {/* Left — Pill toggle */}
      <button
        onClick={toggleTheme}
        data-hoverable
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        style={{
          position: "relative",
          width: 52,
          height: 26,
          borderRadius: 999,
          border: "2px solid #ffffff",
          background: "transparent",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: isLight ? 3 : "auto",
            right: isLight ? "auto" : 3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#ffffff",
            transition: "left 0.3s ease, right 0.3s ease",
          }}
        />
      </button>

      {/* Right — Navigation links */}
      <div style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}>
        {navLinks.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            data-hoverable
            style={{
              fontSize: "0.88rem",
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.01em",
              transition: "opacity 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
