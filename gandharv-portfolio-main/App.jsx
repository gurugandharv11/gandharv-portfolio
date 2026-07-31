import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { BioSection } from "@/components/bio-section"
import { WorkSection } from "@/components/work-section"
import { MarqueeSection } from "@/components/marquee-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <BioSection />
      <WorkSection />
      <MarqueeSection />
      <SkillsSection />
      <ContactSection />
    </SmoothScroll>
  )
}
