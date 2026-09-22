"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, Maximize2, X, Sparkles, Code2, Rocket, Brain } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function DeveloperShowcaseSection() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      style={{
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem)",
        borderTop: "1px solid var(--border)",
        background: "linear-gradient(180deg, var(--background) 0%, rgba(10,22,40,0.4) 50%, var(--background) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow background accent */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "60%",
        background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(60px)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#38bdf8",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(56,189,248,0.1)",
            border: "1px solid rgba(56,189,248,0.25)",
            padding: "0.3rem 0.9rem",
            borderRadius: 999,
            marginBottom: "1rem"
          }}>
            <Sparkles size={14} />
            Developer Profile Showcase
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--foreground)",
            marginBottom: "0.8rem"
          }}>
            Turning Ideas Into Reality.
          </h2>
          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "var(--muted)",
            maxWidth: "680px",
            margin: "0 auto",
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            Code | Build | Learn | Grow — Passionate about building scalable web applications and solving real-world problems through code.
          </p>
        </div>

        {/* Main Showcase Image Card */}
        <div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
            setTilt({ rotateX: y, rotateY: x, scale: 1.01 })
          }}
          onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0, scale: 1 })}
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(56,189,248,0.25)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.5), 0 0 40px rgba(56,189,248,0.12)",
            background: "#080e1a",
            transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
            transition: "transform 0.25s ease-out, box-shadow 0.3s ease",
          }}
        >
          {/* Top Control Bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.8rem 1.2rem",
            background: "rgba(10, 18, 32, 0.9)",
            borderBottom: "1px solid rgba(56,189,248,0.15)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
              <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--muted)", marginLeft: "0.5rem" }}>
                gandharv-developer-card.png
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxOpen(true)
                }}
                style={{
                  background: "rgba(56,189,248,0.1)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  color: "#38bdf8",
                  padding: "0.3rem 0.75rem",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(56,189,248,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(56,189,248,0.1)")}
              >
                <Maximize2 size={13} />
                Expand
              </button>

              <a
                href="/gandharv-banner.png"
                download="Gandharv_Developer_Profile.png"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "#38bdf8",
                  border: "none",
                  color: "#020617",
                  padding: "0.35rem 0.85rem",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <Download size={13} />
                Download HD
              </a>
            </div>
          </div>

          {/* Banner Image Container */}
          <div
            onClick={() => setLightboxOpen(true)}
            style={{ position: "relative", width: "100%", aspectRatio: "16/9", maxHeight: "650px", overflow: "hidden", cursor: "pointer" }}
          >
            <img
              src="/gandharv-banner.png"
              alt="Gandharv Software Developer Showcase"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginTop: "3rem"
        }}>
          <PillarCard
            icon={<Code2 size={24} style={{ color: "#38bdf8" }} />}
            title="Build Projects"
            desc="Developing end-to-end full-stack web applications, AI tools, and REST API architectures."
          />
          <PillarCard
            icon={<Rocket size={24} style={{ color: "#a259ff" }} />}
            title="Improve Everyday"
            desc="Solved 1000+ DSA problems with 1850+ rating on LeetCode. Continuous learner & problem solver."
          />
          <PillarCard
            icon={<Brain size={24} style={{ color: "#00c896" }} />}
            title="Create Better Solutions"
            desc="Building robust software, optimizing performance, and engineering seamless user experiences."
          />
        </div>

        {/* Call to action bar */}
        <div style={{
          marginTop: "2.5rem",
          padding: "1.5rem 2rem",
          borderRadius: 12,
          background: "rgba(56,189,248,0.04)",
          border: "1px solid rgba(56,189,248,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div>
            <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--foreground)", margin: 0, letterSpacing: "-0.02em" }}>
              Let's Build Something Great! 🚀
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0.2rem 0 0" }}>
              Have an idea or opportunity? Feel free to reach out and let's collaborate.
            </p>
          </div>

          <a
            href="mailto:gandharvkumar107@gmail.com?subject=Collaboration%20Inquiry"
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: 8,
              background: "#38bdf8",
              color: "#020617",
              fontWeight: 800,
              fontSize: "0.85rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 4px 20px rgba(56,189,248,0.3)"
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(2, 6, 23, 0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>

          <img
            src="/gandharv-banner.png"
            alt="Gandharv Developer Showcase HD"
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 30px 90px rgba(0,0,0,0.8)",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </section>
  )
}

function PillarCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card-bg)",
        border: hovered ? "1px solid #38bdf8" : "1px solid var(--border)",
        borderRadius: 10,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 15px 35px rgba(56,189,248,0.1)" : "none"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        {icon}
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--foreground)", margin: 0 }}>
          {title}
        </h3>
      </div>
      <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: 0, lineHeight: 1.55 }}>
        {desc}
      </p>
    </div>
  )
}
