"use client"

const words = ["WAKE UP.", "DEVELOP.", "REPEAT.", "WORK.", "DESIGN.", "SHIP."]

export function MarqueeSection() {
  const all = [...words, ...words]

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        padding: "2rem 0",
        userSelect: "none",
      }}
    >
      <div className="marquee-track">
        {all.map((w, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              paddingRight: "2.5rem",
              color: i % 2 === 0 ? "var(--foreground)" : "var(--muted)",
              whiteSpace: "nowrap",
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}
