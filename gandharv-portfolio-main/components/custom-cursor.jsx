"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const bigCircleRef = useRef(null)
  const smallCircleRef = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    const bigCircle = bigCircleRef.current
    const smallCircle = smallCircleRef.current
    const arrow = arrowRef.current
    if (!bigCircle || !smallCircle || !arrow) return

    let mouseX = 0
    let mouseY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Small circle follows immediately
      gsap.set(smallCircle, {
        x: mouseX,
        y: mouseY,
      })

      // Big circle follows with smooth lag
      gsap.to(bigCircle, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: "power3.out",
      })

      // Arrow follows mouse immediately (same as small circle)
      gsap.set(arrow, {
        x: mouseX,
        y: mouseY,
      })
    }

    const onEnterHoverable = () => {
      // Hide inner dot
      gsap.to(smallCircle, {
        opacity: 0,
        scale: 0.3,
        duration: 0.25,
        ease: "power2.out",
      })
      // Show arrow in place of inner dot
      gsap.to(arrow, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      })
    }

    const onLeaveHoverable = () => {
      // Restore inner dot
      gsap.to(smallCircle, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      })
      // Hide arrow
      gsap.to(arrow, {
        opacity: 0,
        scale: 0.5,
        duration: 0.25,
        ease: "power2.out",
      })
    }

    document.addEventListener("mousemove", onMove)

    // Observe for interactive elements
    const observe = () => {
      document.querySelectorAll("a, button, [data-hoverable]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable)
        el.removeEventListener("mouseleave", onLeaveHoverable)
        el.addEventListener("mouseenter", onEnterHoverable)
        el.addEventListener("mouseleave", onLeaveHoverable)
      })
    }

    observe()
    const observer = new MutationObserver(observe)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Outer big circle — ring with smooth lag, inverts on background */}
      <div
        ref={bigCircleRef}
        className="cursor-big-circle"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: "2px solid #ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0.5,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "transform, width, height",
        }}
      />

      {/* Inner small circle — solid dot, immediate follow, inverts on background */}
      <div
        ref={smallCircleRef}
        className="cursor-small-circle"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          background: "#ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Arrow indicator — appears on link/button hover, inverts on background */}
      <div
        ref={arrowRef}
        className="cursor-arrow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.5)",
          mixBlendMode: "difference",
          willChange: "transform, opacity",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </>
  )
}
