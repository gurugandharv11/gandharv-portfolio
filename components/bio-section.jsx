"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Award, FileText, Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function BioSection() {
  const sectionRef = useRef(null)

  const leftPara1TriggerRef = useRef(null)
  const leftPara1InnerRef = useRef(null)
  const leftPara2TriggerRef = useRef(null)
  const leftPara2InnerRef = useRef(null)

  const philosophyTriggerRef = useRef(null)
  const philosophyInnerRef = useRef(null)

  const linkTriggerRefs = useRef([])
  const linkTargetRefs = useRef([])

  const registerLinkTriggerRef = (el, index) => {
    if (el) linkTriggerRefs.current[index] = el
  }

  const registerLinkTargetRef = (el, index) => {
    if (el) linkTargetRefs.current[index] = el
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftElements = [
        { trigger: leftPara1TriggerRef.current, target: leftPara1InnerRef.current },
        { trigger: philosophyTriggerRef.current, target: philosophyInnerRef.current },
        { trigger: leftPara2TriggerRef.current, target: leftPara2InnerRef.current }
      ]

      leftElements.forEach((item, i) => {
        if (!item.trigger || !item.target) return
        
        gsap.set(item.target, {
          rotateX: -100,
          y: 60,
          z: -30,
          opacity: 0,
          transformStyle: "preserve-3d",
        })
        
        gsap.to(item.target, {
          rotateX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          duration: 1.2,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item.trigger,
            start: "top 96%",
            toggleActions: "play none none reverse",
          }
        })
      })

      linkTriggerRefs.current.forEach((triggerEl, i) => {
        const targetEl = linkTargetRefs.current[i]
        if (!triggerEl || !targetEl) return

        gsap.set(targetEl, {
          rotateX: -100,
          y: 40,
          z: -20,
          opacity: 0,
          transformStyle: "preserve-3d",
        })

        gsap.to(targetEl, {
          rotateX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          duration: 1.0,
          delay: 0.2 + i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 98%",
            toggleActions: "play none none reverse",
          }
        })
      })
    })

    return () => ctx.revert()
  }, [])

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gurugandharv/" },
    { label: "GitHub", href: "https://github.com/gurugandharv11" },
    { label: "LeetCode", href: "https://leetcode.com/u/gurugandharv/" },
    { label: "Email", href: "mailto:gandharvkumar107@gmail.com" },
  ]

  const perspectiveWrap = {
    perspective: "400px",
    perspectiveOrigin: "50% 100%",
    transformOrigin: "50% 100%",
  }

  return (
    <section
      ref={sectionRef}
      id="bio"
      style={{
        padding: "2.5rem clamp(1.5rem, 5vw, 5rem) clamp(5rem, 10vw, 10rem)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: "3.5rem",
      }}
    >
      {/* Top Banner - Headline */}
      <div ref={leftPara1TriggerRef} style={{ ...perspectiveWrap, display: "flex", justifyContent: "center", width: "100%" }}>
        <div ref={leftPara1InnerRef} style={{ textAlign: "center", maxWidth: "1150px" }}>
          <p style={{
            fontSize: "clamp(1.2rem, 2.3vw, 1.7rem)",
            fontWeight: 600,
            lineHeight: 1.45,
            color: "var(--foreground)",
            margin: "0 auto 1.5rem",
            letterSpacing: "-0.02em",
          }}>
            Full Stack Developer &amp; Computer Science Engineer. Focused on building scalable Java/Spring Boot backends, responsive React UIs, and AI-powered web solutions.
          </p>

          <a
            href="/Gandharv_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-hoverable
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.75rem 1.6rem",
              borderRadius: "999px",
              border: "1px solid var(--foreground)",
              background: "var(--foreground)",
              color: "var(--background)",
              fontWeight: 700,
              fontSize: "0.9rem",
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            <Download size={16} />
            Download Updated Resume (PDF)
          </a>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
        gap: "3rem",
        alignItems: "start",
      }}>
        {/* Left Column - Education & Achievements */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Education Card */}
          <div ref={philosophyTriggerRef} style={perspectiveWrap}>
            <div ref={philosophyInnerRef} style={{
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              padding: "1.8rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}>
              <div style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <GraduationCap size={16} style={{ color: "var(--accent)" }} />
                [ EDUCATION ]
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--foreground)", margin: 0 }}>
                      Galgotias University
                    </h4>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                      Aug 2023 – May 2027
                    </span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted-foreground)", margin: "0.2rem 0 0" }}>
                    B.Tech in Computer Science &amp; Engineering — <strong style={{ color: "var(--foreground)" }}>CGPA: 7.62 / 10</strong>
                  </p>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>Greater Noida, UP</span>
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
                      K.S. College, Darbhanga (BSEB)
                    </h4>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                      Apr 2021 – Mar 2022
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted-foreground)", margin: "0.2rem 0 0" }}>
                    Intermediate (Class XII) — <strong style={{ color: "var(--foreground)" }}>Percentage: 68%</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificates & Achievements */}
          <div ref={leftPara2TriggerRef} style={perspectiveWrap}>
            <div ref={leftPara2InnerRef} style={{
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              padding: "1.8rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
              <div style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <Award size={16} style={{ color: "var(--accent)" }} />
                [ CERTIFICATES &amp; ACHIEVEMENTS ]
              </div>

              <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem", color: "var(--foreground)" }}>
                <li><strong>Oracle Academy:</strong> Database Design and Programming with SQL</li>
                <li><strong>GUVI:</strong> Java Programming Certification</li>
                <li><strong>1850+</strong> Competitive Programming Rating (Knight)</li>
                <li><strong>1000+ DSA Problems</strong> solved across LeetCode, Codeforces, and GeeksforGeeks</li>
              </ul>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
            gap: "1rem",
          }}>
            <StatCard label="LeetCode Rating" value="1850+" badge="Knight" />
            <StatCard label="DSA Problems" value="1000+" badge="Solved" />
            <StatCard label="Engineering CGPA" value="7.62" badge="Galgotias" />
          </div>
        </div>

        {/* Right Column - Social Links Only */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-mono)",
            marginBottom: "1rem"
          }}>
            [ CONNECT WITH ME ]
          </div>
          {socials.map(({ label, href }, index) => (
            <SocialLink
              key={label}
              label={label}
              href={href}
              index={index}
              registerTriggerRef={registerLinkTriggerRef}
              registerTargetRef={registerLinkTargetRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value, badge }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? "1px solid var(--foreground)" : "1px solid var(--border)",
        background: "var(--card-bg)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
        transition: "border-color 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: "0.68rem",
          fontWeight: 600,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>{label}</span>
        {badge && (
          <span style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            background: hovered ? "var(--foreground)" : "var(--border)",
            color: hovered ? "var(--background)" : "var(--muted)",
            padding: "0.1rem 0.3rem",
            fontFamily: "var(--font-mono)",
            transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}>{badge}</span>
        )}
      </div>
      <span style={{
        fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
        fontWeight: 800,
        color: "var(--foreground)",
        fontFamily: "var(--font-mono)",
        marginTop: "0.2rem",
      }}>{value}</span>
    </div>
  )
}

function SocialLink({ label, href, index, registerTriggerRef, registerTargetRef }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={(el) => registerTriggerRef(el, index)}
      style={{
        perspective: "400px",
        perspectiveOrigin: "50% 100%",
        transformOrigin: "50% 100%",
      }}
    >
      <a
        ref={(el) => registerTargetRef(el, index)}
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        data-hoverable
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.4rem 0",
          borderBottom: "1px solid var(--border)",
          fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
          fontWeight: 700,
          color: hovered ? "var(--muted)" : "var(--foreground)",
          paddingLeft: hovered ? "1rem" : "0px",
          transition: "color 0.4s cubic-bezier(0.22,1,0.36,1), padding-left 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span>{label}</span>
        <span
          style={{
            fontSize: "1.4rem",
            display: "inline-block",
            transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          ↗
        </span>
      </a>
    </div>
  )
}
