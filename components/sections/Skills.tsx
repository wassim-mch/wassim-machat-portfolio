"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { SKILLS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const t = useTranslations("skills");
  const containerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".skill-card",
      { yPercent: 50, autoAlpha: 0, scale: 0.9 },
      {
        yPercent: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        stagger: { amount: 0.8, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-32 overflow-x-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(96,165,250,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: "#60a5fa" }}
          >
            {t("label")}
          </span>
          <h2
            className="font-black mt-3 leading-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {t("headingPrefix")}{" "}
            <span className="text-gradient">{t("headingHighlight")}</span>
          </h2>
        </div>

        {/* Marquee strip */}
        <div
          className="marquee-wrap mb-16 py-4 w-full overflow-hidden"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="marquee-track gap-12">
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span
                key={`m-${i}`}
                className="inline-flex items-center gap-2 text-sm font-bold whitespace-nowrap"
                style={{ color: i % 3 === 0 ? "#60a5fa" : "#a1a1aa", letterSpacing: "0.1em" }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-5 h-5 object-contain shrink-0"
                  loading="lazy"
                />
                {skill.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group relative rounded-2xl p-5 cursor-pointer transition-all duration-300"
              style={{
                background: hovered === skill.name ? "rgba(96,165,250,0.08)" : "#0f0f0f",
                border: `1px solid ${hovered === skill.name ? "rgba(96,165,250,0.3)" : "rgba(255,255,255,0.06)"}`,
                transform: hovered === skill.name ? "translateY(-4px) scale(1.02)" : "",
                opacity: 0,
              }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-9 h-9 object-contain shrink-0"
                  loading="lazy"
                />
                <span className="text-sm font-bold" style={{ color: "#fff" }}>
                  {skill.name}
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="relative h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                  style={{
                    width: hovered === skill.name ? `${skill.level}%` : "0%",
                    background: "linear-gradient(90deg, #60a5fa, #818cf8)",
                  }}
                />
              </div>

              <div
                className="mt-2 text-xs text-right font-mono"
                style={{ color: "#a1a1aa" }}
              >
                {hovered === skill.name ? skill.level + "%" : ""}
              </div>

              {/* Glow on hover */}
              {hovered === skill.name && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: "0 0 30px rgba(96,165,250,0.1)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}