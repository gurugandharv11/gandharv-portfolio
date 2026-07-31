"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    num: "01",
    title: "React",
    subtitle: "Developer",
    desc: "Building interactive, accessible UIs with React hooks, context, and component-driven architecture. Expert in performance and reusable design systems.",
  },
  {
    num: "02",
    title: "Backend",
    subtitle: "Systems",
    desc: "Full-stack with Node.js, PostgreSQL, and REST APIs. Experience with real-time features, authentication, and scalable architecture.",
  },
  {
    num: "03",
    title: "Next.js",
    subtitle: "Developer",
    desc: "SSR, API routes, and optimised performance patterns. Building production apps with TypeScript and modern tooling.",
  },
]

export function SkillsSection() {
  const sectionRef = useRef(null)
  const leftTrackRef = useRef(null)
  const rightTrackRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const leftTrack = leftTrackRef.current
    const rightTrack = rightTrackRef.current
    const section = sectionRef.current
    if (!leftTrack || !rightTrack || !section) return

    const ctx = gsap.context(() => {
      // Timeline pinned to section top
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%", // 2 full viewport scrolls
          pin: true,
          scrub: 1, // Smooth scroll scrubbing
          anticipatePin: 1,
        }
      })

      // Coordinate opposite vertical translations:
      // Right Track: Standard UP scroll: 0vh -> -100vh -> -200vh
      // Left Track: Reverse DOWN scroll: -200vh -> -100vh -> 0vh
      tl.to(rightTrack, {
        y: "-200vh",
        ease: "none",
      }, 0)

      tl.to(leftTrack, {
        y: "0vh",
        ease: "none",
      }, 0)
    })

    return () => ctx.revert()
  }, [isDesktop])

  const numberSlideStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "clamp(12rem, 25vw, 24rem)",
  fontWeight: 800,
  opacity: 0.15,
  userSelect: "none",
  pointerEvents: "none",
}

  const contentSlideStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "clamp(2rem, 8vw, 6rem)",
  }

  // --- MOBILE LAYOUT ---
  if (!isDesktop) {
    return (
      <section
        ref={sectionRef}
        id="skills"
        style={{
          padding: "5rem 1.5rem",
          borderTop: "1px solid var(--border)",
          background: "var(--background)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {skills.map((s, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                padding: "2.5rem 1.5rem",
                borderBottom: i < skills.length - 1 ? "1px solid var(--border)" : "none",
                overflow: "hidden",
              }}
            >
              {/* Background Number */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "clamp(8rem, 20vw, 12rem)",
                  fontWeight: 800,
                  color: "var(--foreground)",
                  opacity: 0.04,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {s.num}
              </div>

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "1.5rem"
                }}>
                  {s.num} / Skillset
                </span>

                <h3 style={{
                  fontSize: "clamp(2rem, 8vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--foreground)",
                  marginBottom: "1.5rem"
                }}>
                  {s.title}
                  <br />
                  {s.subtitle}
                </h3>

                <p style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  maxWidth: "100%"
                }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // --- DESKTOP SPLIT-SCROLL LAYOUT ---
  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        background: "var(--background)",
      }}
    >
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* Left Column - Large Numbers Track (Reverse Scrolling) */}
        <div
          style={{
            width: "45%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderRight: "1px solid var(--border)",
          }}
        >
          <div
            ref={leftTrackRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "300%",
              display: "flex",
              flexDirection: "column",
              transform: "translateY(-200vh)",
              willChange: "transform",
            }}
          >
            {/* Stacked in reverse order so 01 is at the bottom, and reveals 02 then 03 coming from above */}
            <div style={numberSlideStyle}>03</div>
            <div style={numberSlideStyle}>02</div>
            <div style={numberSlideStyle}>01</div>
          </div>
        </div>

        {/* Right Column - Skills Content Track (Forward Scrolling) */}
        <div
          style={{
            width: "55%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            ref={rightTrackRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "300%",
              display: "flex",
              flexDirection: "column",
              transform: "translateY(0vh)",
              willChange: "transform",
            }}
          >
            {skills.map((s, i) => (
              <div key={i} style={contentSlideStyle}>
                <div style={{ maxWidth: "460px", padding: "0 2rem" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--muted)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "1.5rem"
                  }}>
                    {s.num} / Skillset
                  </span>

                  <h3 style={{
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                    color: "var(--foreground)",
                    marginBottom: "2rem"
                  }}>
                    {s.title}
                    <br />
                    {s.subtitle}
                  </h3>

                  <p style={{
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
