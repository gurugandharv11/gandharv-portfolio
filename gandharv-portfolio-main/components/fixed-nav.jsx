"use client"

import { useState, useEffect } from "react"

export function FixedNav() {
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const navLinks = [
    { label: "About", id: "bio" },
    { label: "Projects", id: "work" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <>
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
          padding: "0.9rem 2rem",
          background: "var(--nav-bg)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
          transition: "border-color 0.3s",
        }}
      >
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 14px",
            border: "1.5px solid var(--border-light)",
            borderRadius: 999,
            background: "transparent",
            color: "var(--fg)",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            transition: "all 0.2s",
          }}
        >
          {isDark ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
                <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" /><line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" /><line x1="4.22" y1="19.78" x2="7.05" y2="16.95" />
                <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" />
              </svg>
              LIGHT
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              DARK
            </>
          )}
        </button>

        {/* Brand */}
        <button
          onClick={() => scrollTo("hero")}
          style={{
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.03em",
            background: "none",
            border: "none",
            color: "var(--fg)",
            cursor: "pointer",
          }}
        >
          GK.
        </button>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden md:flex">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--fg-muted)",
                cursor: "pointer",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--fg-muted)")}
            >
              {label}
            </button>
          ))}
          <a
            href="https://github.com/gurugandharv11"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--fg-muted)",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--fg-muted)")}
          >
            Github
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--fg)",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "var(--fg)", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--fg)", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--fg)", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: "var(--fg)",
                cursor: "pointer",
                fontSize: "2.5rem",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              {label}
            </button>
          ))}
          <a
            href="https://github.com/gurugandharv"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg)", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}
          >
            Github
          </a>
        </div>
      )}
    </>
  )
}
