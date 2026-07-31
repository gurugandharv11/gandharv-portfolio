"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ── Code Rain Canvas ──────────────────────────────────────────────
function CodeRainCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    const FONT_SIZE = 13
    const cols = Math.floor(W / FONT_SIZE)
    const drops = Array(cols).fill(1)
    const CHARS = "01アイウエオ{}[]()<>;:=+*/&|!?ABCDEFabcdef0123456789#$@%^~".split("")

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    let raf
    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.18)"
      ctx.fillRect(0, 0, W, H)
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * FONT_SIZE
        const y = drops[i] * FONT_SIZE

        if (drops[i] * FONT_SIZE < 3 * FONT_SIZE) {
          ctx.fillStyle = "#7dd3fc"
        } else {
          const alpha = Math.random() * 0.25 + 0.08
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`
        }

        ctx.fillText(char, x, y)
        if (y > H && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.55, pointerEvents: "none" }}
    />
  )
}

// ── Scanlines ─────────────────────────────────────────────────────
function Scanlines() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
    }} />
  )
}

// ── Grid Lines ────────────────────────────────────────────────────
function GridLines() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }} />
  )
}

// ── Main Hero ─────────────────────────────────────────────────────
export function HeroSection() {
  const containerRef   = useRef(null)
  const curtainRef     = useRef(null)
  const helloRef       = useRef(null)
  const nameRef        = useRef(null)
  const bottomLeftRef  = useRef(null)
  const bottomRightRef = useRef(null)
  const bottomBarRef   = useRef(null)

  const [isMobile, setIsMobile] = useState(false)
  const [tilt, setTilt]         = useState({ rotateX: 0, rotateY: 0, scale: 1 })

  const DARK_BG = "#020617"
  const MID_BG  = "#0a1628"
  const BLUE    = "#38bdf8"

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Curtain mouse tracking
  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return
    const hasHover = window.matchMedia("(hover: hover)").matches
    if (!hasHover) {
      gsap.set(curtain, { width: "50%" })
      return
    }
    const handleMouseMove = (e) => {
      const pct = Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100))
      gsap.to(curtain, { width: `${pct}%`, duration: 0.6, ease: "power3.out" })
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // GSAP entrance + scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleEls  = [helloRef.current, nameRef.current]
      const bottomEls = [bottomLeftRef.current, bottomRightRef.current]
      const images    = containerRef.current.querySelectorAll(".hero-image-wrap")

      if (images.length) {
        gsap.set(images, { y: 40, opacity: 0 })
        gsap.to(images, { y: 0, opacity: 1, duration: 1.0, delay: 0.3, ease: "power3.out" })
      }

      titleEls.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { rotateX: -100, y: "60%", z: "-3vw", opacity: 0, transformStyle: "preserve-3d" })
        gsap.to(el, { rotateX: 0, y: 0, z: 0, opacity: 1, duration: 1.2, delay: 0.2 + i * 0.2, ease: "power3.out" })
      })

      bottomEls.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { y: 20, opacity: 0 })
        gsap.to(el, { y: 0, opacity: 1, duration: 0.8, delay: 0.7 + i * 0.15, ease: "power3.out" })
      })

      // Scroll parallax on title
      if (helloRef.current) {
        gsap.to(helloRef.current, {
          x: "-100vw", scale: 2.2, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
        })
      }

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: "100vw", scale: 2.0, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
        })
      }

      if (bottomBarRef.current) {
        gsap.to(bottomBarRef.current, {
          opacity: 0, y: -20, ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "5% top", end: "25% top", scrub: 1 },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const helloStyle = {
    fontSize: isMobile ? "clamp(50px,18vw,90px)" : "clamp(80px,15vw,220px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    textAlign: "right",
    margin: 0,
    userSelect: "none",
    willChange: "transform",
    fontFamily: "'JetBrains Mono', monospace",
  }

  const nameStyle = {
    fontSize: isMobile ? "clamp(36px,12vw,70px)" : "clamp(80px,15vw,220px)",
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    textAlign: "right",
    margin: 0,
    marginTop: isMobile ? "0.5rem" : "1rem",
    userSelect: "none",
    willChange: "transform",
    fontFamily: "'JetBrains Mono', monospace",
  }

  const perspectiveWrap = {
    perspective: "400px",
    perspectiveOrigin: "50% 100%",
    transformOrigin: "50% 100%",
  }

  const edgeFades = (bg) => [
    { side: "bottom", style: { bottom: 0, left: 0, right: 0, height: "40%", borderRadius: "0 0 16px 16px", background: `linear-gradient(to bottom, transparent, ${bg})` } },
    { side: "left",   style: { top: 0, left: 0, bottom: 0, width: "30%", borderRadius: "16px 0 0 16px", background: `linear-gradient(to right, ${bg}, transparent)` } },
    { side: "right",  style: { top: 0, right: 0, bottom: 0, width: "30%", borderRadius: "0 16px 16px 0", background: `linear-gradient(to left, ${bg}, transparent)` } },
    { side: "top",    style: { top: 0, left: 0, right: 0, height: "25%", borderRadius: "16px 16px 0 0", background: `linear-gradient(to top, transparent, ${bg})` } },
  ]

  const photoPos = isMobile
    ? { left: "50vw", transform: "translateX(-50%)", top: "8vh" }
    : { left: "clamp(60px,8vw,120px)", bottom: "clamp(260px,30vh,380px)" }

  const photoSize = {
    width:  isMobile ? "180px" : "clamp(200px,22vw,320px)",
    height: isMobile ? "200px" : "clamp(220px,28vh,350px)",
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');

        @keyframes pulse-dot { 0%,100%{box-shadow:0 0 0 0 rgba(56,189,248,0.4)} 70%{box-shadow:0 0 0 8px rgba(56,189,248,0)} }
        @keyframes glow-text { 0%,100%{text-shadow:0 0 20px rgba(56,189,248,0.3)} 50%{text-shadow:0 0 40px rgba(56,189,248,0.6), 0 0 80px rgba(56,189,248,0.2)} }

        .hero-hello { animation: glow-text 4s ease-in-out infinite; }
        .contact-btn:hover {
          background: rgba(56,189,248,0.12) !important;
          border-color: rgba(56,189,248,0.55) !important;
          box-shadow: 0 0 20px rgba(56,189,248,0.2) !important;
        }
      `}</style>

      <div ref={containerRef} id="hero" style={{ height: "120vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

          {/* Base dark navy */}
          <div style={{ position: "absolute", inset: 0, background: DARK_BG }} />

          <GridLines />
          <CodeRainCanvas />
          <Scanlines />

          {/* Radial blue glow */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
            background: `radial-gradient(ellipse 70% 60% at 65% 50%, rgba(14,165,233,0.06) 0%, transparent 70%)`,
          }} />

          {/* ── CURTAIN ── */}
          <div
            ref={curtainRef}
            style={{
              position: "absolute", top: 0, left: 0, bottom: 0,
              width: "1vw",
              background: MID_BG,
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            {/* Curtain edge line */}
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "2px",
              background: `linear-gradient(to bottom, transparent, ${BLUE}, transparent)`,
              opacity: 0.7, zIndex: 10,
            }} />

            {/* Dark-side photo */}
            {!isMobile && (
              <div className="hero-image-wrap" style={{ position: "absolute", ...photoPos, ...photoSize, pointerEvents: "none" }}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <img
                    src="/myphoto.png"
                    alt="Gandharv Dark"
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      borderRadius: "16px",
                      border: `1px solid ${BLUE}55`,
                      boxShadow: `0 0 40px rgba(56,189,248,0.15), 0 0 0 1px ${BLUE}33`,
                      transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                      transition: "transform 0.2s ease-out",
                      display: "block",
                    }}
                  />
                  {edgeFades(MID_BG).map(({ side, style }) => (
                    <div key={side} style={{ position: "absolute", pointerEvents: "none", ...style }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Light-side photo */}
          <div
            className="hero-image-wrap"
            style={{ position: "absolute", ...photoPos, ...photoSize, zIndex: isMobile ? 4 : 1, pointerEvents: "none" }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <img
                src="/myphoto.png"
                alt="Gandharv"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  borderRadius: "16px",
                  border: `1px solid ${BLUE}33`,
                  boxShadow: `0 20px 60px rgba(2,6,23,0.6), 0 0 0 1px ${BLUE}22`,
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                  transition: "transform 0.2s ease-out",
                  display: "block",
                }}
              />
              {!isMobile && edgeFades(DARK_BG).map(({ side, style }) => (
                <div key={side} style={{ position: "absolute", pointerEvents: "none", ...style }} />
              ))}
            </div>
          </div>

          {/* Tilt zone */}
          <div
            style={{ position: "absolute", ...photoPos, ...photoSize, zIndex: 10, cursor: "pointer", pointerEvents: "auto" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              setTilt({
                rotateX: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
                rotateY: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                scale: 1.04,
              })
            }}
            onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0, scale: 1 })}
          />

          {/* ── TEXT (mix-blend difference for curtain effect) ── */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "0 clamp(1.5rem,5vw,5rem)",
            zIndex: 3,
            mixBlendMode: "difference",
            color: "#ffffff",
            pointerEvents: "none",
          }}>
            <div style={perspectiveWrap}>
              <div ref={helloRef} className="hero-hello" style={{ ...helloStyle, color: "#ffffff" }}>
                Hello
              </div>
            </div>

            <div style={perspectiveWrap}>
              <h1 ref={nameRef} style={{ ...nameStyle, color: "#ffffff" }}>
                {"I'm Gandharv"}
              </h1>
            </div>
          </div>

          {/* ── Available dot ── */}
          {!isMobile && (
            <div style={{
              position: "absolute",
              left: "clamp(60px,8vw,120px)",
              bottom: "clamp(200px,22vh,300px)",
              zIndex: 6,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(148,163,184,0.7)",
              pointerEvents: "none",
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#4ade80",
                animation: "pulse-dot 2s infinite",
              }} />
              available for work
            </div>
          )}

          {/* ── Bottom bar ── */}
          <div
            ref={bottomBarRef}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "clamp(1.5rem,5vw,5rem)",
              right: "clamp(1.5rem,5vw,5rem)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              zIndex: 6,
            }}
          >
            <div ref={bottomLeftRef}>
              <div style={{
                fontSize: "9px",
                color: BLUE,
                opacity: 0.6,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}>
                role.current
              </div>
              <h3 style={{
                fontSize: "clamp(1rem,2vw,1.6rem)",
                fontWeight: 700,
                color: "#e2e8f0",
                margin: 0,
                letterSpacing: "-0.02em",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Full Stack Developer
              </h3>
            </div>

            <div ref={bottomRightRef}>
              <a
                href="mailto:gandharvkumar107@gmail.com?subject=Portfolio%20Inquiry"
                data-hoverable
                className="contact-btn"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: BLUE,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "8px 16px",
                  border: `1px solid rgba(56,189,248,0.3)`,
                  borderRadius: "6px",
                  background: `rgba(56,189,248,0.05)`,
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: BLUE,
                  display: "inline-block",
                  boxShadow: `0 0 8px ${BLUE}`,
                }} />
                Contact
              </a>
            </div>
          </div>

          {/* Corner decorations */}
          <div style={{
            position: "absolute", top: 20, right: 20, zIndex: 6,
            width: 40, height: 40, pointerEvents: "none",
            borderTop: "1px solid rgba(56,189,248,0.2)",
            borderRight: "1px solid rgba(56,189,248,0.2)",
          }} />
          <div style={{
            position: "absolute", bottom: 20, left: 20, zIndex: 6,
            width: 40, height: 40, pointerEvents: "none",
            borderBottom: "1px solid rgba(56,189,248,0.2)",
            borderLeft: "1px solid rgba(56,189,248,0.2)",
          }} />

        </div>
      </div>
    </>
  )
}