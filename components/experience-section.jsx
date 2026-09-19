"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: "Java Full Stack Developer Intern",
    company: "Zidio Development",
    period: "25 May 2026 – 25 July 2026",
    location: "Bengaluru, Karnataka — Remote",
    color: "#00c896",
    skills: ["Java", "Spring Boot", "REST APIs", "JavaScript", "JPA/Hibernate", "Relational Databases", "Git", "Agile"],
    details: [
      "Worked with Java, Spring Boot, REST APIs, JavaScript, JPA/Hibernate, relational databases.",
      "Engaged in full stack development, testing, debugging, Git collaboration, and Agile practices."
    ]
  },
  {
    role: "Web Developer Intern",
    company: "InAmigos Foundation",
    period: "July 2026 – Aug 2026",
    location: "Remote",
    color: "#4a6cf7",
    skills: ["HTML & CSS", "JavaScript", "Figma", "AI Data Analysis", "Web Development"],
    details: [
      "Responsive web pages using HTML & CSS.",
      "AI-Powered Data Analysis Report.",
      "Volunteer Opportunity Data Compilation.",
      "NGO website feature design/highlighting in Figma."
    ]
  },
  {
    role: "AI-ML Virtual Intern",
    company: "EduSkills",
    period: "October 2025 – December 2025",
    location: "Remote / Virtual",
    color: "#a259ff",
    skills: ["AI / ML", "Python", "Data Science", "AICTE–EduSkills"],
    details: [
      "10-week AI/ML virtual internship under AICTE–EduSkills.",
      "Practical exposure to AI/ML concepts and applications."
    ]
  }
]

export function ExperienceSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      const cards = listRef.current?.querySelectorAll(".exp-card")
      if (cards?.length) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)",
        borderTop: "1px solid var(--border)",
        background: "var(--background)",
      }}
    >
      <div ref={headerRef} style={{ marginBottom: "3.5rem" }}>
        <p style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "var(--muted)",
          textTransform: "uppercase",
          marginBottom: "0.5rem"
        }}>
          Career Path
        </p>
        <h2 style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1
        }}>
          work experience.
        </h2>
      </div>

      <div
        ref={listRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({ exp }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="exp-card"
      data-hoverable
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card-bg)",
        border: hovered ? `1px solid ${exp.color}70` : "1px solid var(--border)",
        borderRadius: 6,
        padding: "clamp(1.5rem, 3vw, 2.2rem)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.4s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 50px ${exp.color}15` : "none",
      }}
    >
      {/* Accent strip on left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 4,
          background: exp.color,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingLeft: "0.5rem" }}>
        {/* Role & Company Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.8rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
              <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--foreground)" }}>
                {exp.role}
              </h3>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: exp.color,
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}40`,
                padding: "0.15rem 0.6rem",
                borderRadius: 999,
              }}>
                — {exp.company}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap", fontSize: "0.82rem", color: "var(--muted)", fontWeight: 500 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <Calendar size={13} style={{ color: exp.color }} />
                {exp.period}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <MapPin size={13} style={{ color: exp.color }} />
                {exp.location}
              </span>
            </div>
          </div>
        </div>

        {/* Details List */}
        <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {exp.details.map((detail, idx) => (
            <li key={idx} style={{ fontSize: "0.9rem", lineHeight: 1.55, color: "var(--foreground)", opacity: 0.9, fontWeight: 500 }}>
              {detail}
            </li>
          ))}
        </ul>

        {/* Skills Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" }}>
          {exp.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                padding: "0.15rem 0.55rem",
                borderRadius: 4,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
