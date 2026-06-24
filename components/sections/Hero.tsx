"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ExternalLink, Mail, Download } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);   
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      gridRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5 }
    )
      .fromTo(
        headlineRef.current,
        { yPercent: 60, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power4.out" },
        "-=1"
      )
      .fromTo(
        subRef.current,
        { yPercent: 40, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        descRef.current,
        { yPercent: 30, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { yPercent: 20, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        scrollRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        "-=0.2"
      );

    // Floating shapes
    gsap.to(shape1Ref.current, {
      y: -30,
      rotation: 15,
      duration: 6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(shape2Ref.current, {
      y: 25,
      rotation: -10,
      duration: 8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1,
    });

    // Scroll indicator bounce
    gsap.to(scrollRef.current, {
      y: 8,
      duration: 1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-bg pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(96,165,250,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floating shapes */}
      <div
        ref={shape1Ref}
        className="absolute right-[12%] top-[22%] w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          border: "1px solid rgba(96,165,250,0.1)",
        }}
      />
      <div
        ref={shape2Ref}
        className="absolute left-[8%] bottom-[28%] w-48 h-48 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)",
          border: "1px solid rgba(129,140,248,0.08)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 glass"
          style={{ color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#60a5fa" }}
          />
          {t("badge")}
        </div>

        {/* Headline */}
        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h1
            className="font-black leading-none mb-4"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              letterSpacing: "-0.05em",
              lineHeight: "0.95",
            }}
          >
            <span className="block text-white">WASSIM</span>
            <span
              className="block"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              }}
            >
              MACHAT
            </span>
          </h1>
        </div>

        {/* Role */}
        <div ref={subRef} style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 my-6">
            <div
              className="h-px flex-1 max-w-16"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
            <p
              className="text-sm md:text-base font-bold tracking-[0.25em] uppercase"
              style={{ color: "#a1a1aa" }}
            >
              {t("role")}
            </p>
            <div
              className="h-px flex-1 max-w-16"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
          </div>

          <p
            className="text-xl md:text-2xl font-light mb-6"
            style={{ color: "#ffffff" }}
          >
            {t("taglinePrefix")}{" "}
            <span style={{ color: "#60a5fa" }}>{t("taglineHighlight1")}</span>{" "}
            {t("taglineConnector")}{" "}
            <span style={{ color: "#60a5fa" }}>{t("taglineHighlight2")}</span>
          </p>
        </div>

        {/* Description */}
        <div ref={descRef} style={{ opacity: 0 }}>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "#a1a1aa" }}
          >
            {t("description")}
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: "#60a5fa", color: "#050505" }}
          >
            <ExternalLink size={16} />
            {t("viewProjects")}
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 glass"
            style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Mail size={16} />
            {t("contactMe")}
          </a>

          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 hover:opacity-70"
            style={{ color: "#a1a1aa" }}
          >
            <Download size={16} />
            {t("downloadCv")}
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-12 mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "2+", key: "experience" },
            { value: "10+", key: "projects" },
            { value: "100%", key: "satisfaction" },
          ].map((stat) => (
            <div key={stat.key} className="text-center">
              <div
                className="text-2xl md:text-3xl font-black"
                style={{ color: "#60a5fa" }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#a1a1aa" }}>
                {t(`stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#a1a1aa" }}
        >
          {t("scroll")}
        </span>
        <ArrowDown size={14} style={{ color: "#60a5fa" }} />
      </div>
    </section>
  );
}