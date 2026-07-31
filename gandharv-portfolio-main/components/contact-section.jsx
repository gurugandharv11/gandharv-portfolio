"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const headingRef = useRef(null)
  const badgeRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 80, opacity: 0, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      gsap.from(badgeRef.current, {
        scale: 0.5, opacity: 0, duration: 1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: badgeRef.current, start: "top 90%", toggleActions: "play none none reverse" },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      style={{ padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ position: "relative", minHeight: 400, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        {/* Big heading */}
        <h2
          ref={headingRef}
          style={{
            fontSize: "clamp(3rem, 10vw, 9rem)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 0.92,
            color: "var(--foreground)",
            maxWidth: "75%",
          }}
        >
          Always keen
          <br />
          for a good
          <br />
          collab.
        </h2>

        {/* Rotating badge */}
        <div
          ref={badgeRef}
          style={{
            position: "relative",
            width: 150,
            height: 150,
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 150 150" width={150} height={150} className="spin-slow">
            <defs>
              <path id="badge-path" d="M 75 75 m -52 0 a 52 52 0 1 1 104 0 a 52 52 0 1 1 -104 0" />
            </defs>
            <text style={{ fontSize: 11, fontWeight: 700, fill: "var(--foreground)", letterSpacing: "3px" }}>
              <textPath href="#badge-path">
                DROP ME A TEXT • AVAILABLE FOR WORK •{" "}
              </textPath>
            </text>
          </svg>
          {/* Center arrow */}
          <a
            href="mailto:adityabhardwaj3369@gmail.com"
            data-hoverable
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              color: "var(--foreground)",
            }}
          >
            ↗
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        style={{
          marginTop: "6rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <a
          href="#hero"
          data-hoverable
          style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            textDecoration: "none",
          }}
        >
          {"Gandharv </>" }
        </a>

        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/gurugandharv/" },
            { label: "GitHub", href: "https://github.com/gurugandharv11" },
            { label: "Email", href: "mailto:gandharvkumar107@gmail.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              data-hoverable
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "var(--muted)",
                letterSpacing: "0.04em",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {label}
            </a>
          ))}
        </div>

        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)" }}>
          © 2026 All rights reserved
        </span>
      </div>
    </section>
  )
}
