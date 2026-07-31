"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BioSection() {
  const sectionRef = useRef(null)

  // Left paragraph stable triggers + animated inner targets
  const leftPara1TriggerRef = useRef(null)
  const leftPara1InnerRef = useRef(null)
  const leftPara2TriggerRef = useRef(null)
  const leftPara2InnerRef = useRef(null)

  // Philosophy card stable triggers + animated inner targets
  const philosophyTriggerRef = useRef(null)
  const philosophyInnerRef = useRef(null)

  // Right social links stable triggers + animated inner targets
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
      // 3D perspective scroll entrance for elements using stable triggers
      const leftElements = [
        { trigger: leftPara1TriggerRef.current, target: leftPara1InnerRef.current },
        { trigger: philosophyTriggerRef.current, target: philosophyInnerRef.current },
        { trigger: leftPara2TriggerRef.current, target: leftPara2InnerRef.current }
      ]

      leftElements.forEach((item, i) => {
        if (!item.trigger || !item.target) return
        
        // Initial 3D collapsed state
        gsap.set(item.target, {
          rotateX: -100,
          y: 60,
          z: -30,
          opacity: 0,
          transformStyle: "preserve-3d",
        })
        
        // Animate child element while using the static, non-collapsed wrapper as the trigger
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

      // 3D perspective scroll entrance for Right side social links using stable triggers
      linkTriggerRefs.current.forEach((triggerEl, i) => {
        const targetEl = linkTargetRefs.current[i]
        if (!triggerEl || !targetEl) return

        // Initial 3D collapsed state
        gsap.set(targetEl, {
          rotateX: -100,
          y: 40,
          z: -20,
          opacity: 0,
          transformStyle: "preserve-3d",
        })

        // Animate link child while using static wrapper as the trigger
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
    { label: "Email", href: "mailto:gandharvkuamr107@gmail.com" },
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
      {/* Top Banner - Full-Width Centered Headline */}
      <div ref={leftPara1TriggerRef} style={{ ...perspectiveWrap, display: "flex", justifyContent: "center", width: "100%" }}>
        <p ref={leftPara1InnerRef} style={{
          fontSize: "clamp(1.2rem, 2.3vw, 1.7rem)",
          fontWeight: 600,
          lineHeight: 1.45,
          color: "var(--foreground)",
          margin: "0 auto",
          letterSpacing: "-0.02em",
          maxWidth: "1150px",
          textAlign: "center",
        }}>
          Frontend Developer &amp; UI Specialist. Focused on creating smooth, high-fidelity user experiences, with a commitment to continuous growth and learning from every project.
        </p>
      </div>

      {/* Bottom Display - 2 Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
        gap: "4rem",
        alignItems: "start",
      }}>
        {/* Left Column - Manifesto & Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>
          {/* Philosophy Manifesto Card */}
          <div ref={philosophyTriggerRef} style={perspectiveWrap}>
            <div ref={philosophyInnerRef} style={{
              border: "1px solid var(--border)",
              background: "var(--card-bg)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              position: "relative",
            }}>
              {/* Minimal Header */}
              <div style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
              }}>
                [ MANIFESTO ]
              </div>

              {/* Title / Slogan */}
              <div style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "var(--foreground)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}>
                Utility &gt; Perfection
              </div>

              {/* Philosophy quote */}
              <blockquote style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "var(--foreground)",
                margin: 0,
                fontWeight: 500,
                fontStyle: "italic",
                borderLeft: "2px solid var(--accent)",
                paddingLeft: "1rem",
              }}>
                "When you build for yourself, 'Done' is better than 'Perfect.' If the code is messy but it saves you 10 minutes a day, it’s good code. I optimize for utility, not for a code review."
              </blockquote>
            </div>
          </div>

          {/* Stats Grid Wrapper */}
          <div ref={leftPara2TriggerRef} style={perspectiveWrap}>
            <div ref={leftPara2InnerRef}>
              {/* Stats Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: "1rem",
              }}>
                <StatCard label="LeetCode Rating" value="1850+" badge="Knight" />
                <StatCard label="Problems Solved" value="1000+" badge="DSA" />
                <StatCard label="Club Members Led" value="100+" badge="Galgotias" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Social Links Only */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
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
