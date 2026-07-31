"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Smart Resume Analyzer",
    desc: "AI-powered resume analyzer that calculates ATS score, identifies missing skills, compares resumes with job descriptions, and provides personalized improvement suggestions.",
    tag: "Full Stack AI Project",
    link: "https://smartresumee.vercel.app/",
    color: "#00c896",
  },
  {
    title: "Blood Donation System",
    desc: "Full-stack blood donation platform where users can register as donors, search donors by blood group and city, and manage blood requests efficiently.",
    tag: "Full Stack Web App",
    link: "https://blooddonation-gandharv.vercel.app/",
    color: "#ff4d6d",
  },
  {
    title: "AI Code Reviewer",
    desc: "AI-powered code review platform that analyzes code quality, detects issues, and helps developers improve performance with smart suggestions.",
    tag: "Full Stack AI Project",
    link: "https://guru-aii.vercel.app/",
    color: "#4a6cf7",
  },
  {
    title: "Face Attendance",
    desc: "Face recognition based attendance management system using computer vision for secure and automated attendance tracking.",
    tag: "AI & Computer Vision",
    link: "https://github.com/gurugandharv11/Face-recognition-Attendance-System-Project",
    color: "#58a6ff",
  },
  {
    title: "Auto Reply System",
    desc: "Smart automated messaging system that replies to messages instantly using predefined logic and automation workflows.",
    tag: "Automation Project",
    link: "https://github.com/gurugandharv11/auto-reply",
    color: "#a259ff",
  },
];

export function WorkSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      const cards = gridRef.current?.querySelectorAll(".project-card")
      if (cards?.length) {
        gsap.from(cards, {
          y: 80, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)", borderTop: "1px solid var(--border)" }}
    >
      <div ref={headerRef} style={{ marginBottom: "3.5rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          My favourite projects
        </p>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1 }}>
          so far.
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: "1.2rem",
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      data-hoverable
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: 6,
        overflow: "hidden",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${project.color}15` : "none",
      }}
    >
      {/* Preview area */}
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg, #000 0%, ${project.color}18 100%)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.color}20, transparent)`,
          filter: "blur(40px)",
          transition: "opacity 0.5s",
          opacity: hovered ? 1 : 0.3,
        }} />
        <span style={{
          fontSize: "3rem",
          fontWeight: 800,
          color: project.color,
          letterSpacing: "-0.04em",
          opacity: hovered ? 0.35 : 0.12,
          transition: "opacity 0.4s",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
        }}>
          {project.title.split(" ")[0]}
        </span>
        {/* Bottom accent line */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: project.color,
          opacity: hovered ? 0.8 : 0.15,
          transition: "opacity 0.4s",
        }} />
      </div>

      {/* Text area */}
      <div style={{ padding: "1.3rem 1.5rem 1.6rem" }}>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          {project.tag}
        </p>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--foreground)", marginBottom: "0.5rem" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--muted)", lineHeight: 1.6 }}>
          {project.desc}
        </p>
      </div>
    </a>
  )
}
