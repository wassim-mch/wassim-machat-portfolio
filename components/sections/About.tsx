"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Rocket, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current,
      { xPercent: -30, autoAlpha: 0 },
      {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      imageRef.current,
      { xPercent: 30, autoAlpha: 0 },
      {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".about-card",
      { yPercent: 40, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  const values = [
    { icon: Code2, key: "cleanCode" },
    { icon: Rocket, key: "scalableSystems" },
    { icon: Heart, key: "userCentric" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="mb-16">
          <span
            className="text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: "#60a5fa" }}
          >
            {t("label")}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <h2
              className="font-black leading-tight mb-8"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              {t("headingPrefix")}{" "}
              <span className="text-gradient">{t("headingHighlight")}</span>
            </h2>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#a1a1aa" }}
            >
              {t("paragraph1")}
            </p>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#a1a1aa" }}
            >
              {t("paragraph2")}
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                { key: "french", flag: "🇫🇷" },
                { key: "arabic", flag: "🇩🇿" },
                { key: "english", flag: "🇬🇧" },
              ].map((lang) => (
                <span
                  key={lang.key}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium glass"
                  style={{ color: "#fff" }}
                >
                  {lang.flag} {t(`languages.${lang.key}`)}
                </span>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div ref={imageRef} className="relative" style={{ opacity: 0 }}>
            <div
              className="relative rounded-3xl p-1 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(96,165,250,0.15), transparent, rgba(96,165,250,0.05))",
              }}
            >
              <div
                className="rounded-3xl p-8 grid-bg"
                style={{ background: "#0f0f0f", minHeight: 360 }}
              >
                {/* Code display */}
                <div
                  className="rounded-2xl p-6 font-mono text-sm leading-relaxed"
                  style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex gap-2 mb-4">
                    {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <pre style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>
                    <span style={{ color: "#60a5fa" }}>const</span>{" "}
                    <span style={{ color: "#fff" }}>developer</span>{" "}
                    <span style={{ color: "#60a5fa" }}>=</span>{" "}
                    {"{"}
                    {"\n"}
                    {"  "}<span style={{ color: "#34d399" }}>name</span>:{" "}
                    <span style={{ color: "#fbbf24" }}>&apos;{t("codeSnippet.name")}&apos;</span>,{"\n"}
                    {"  "}<span style={{ color: "#34d399" }}>role</span>:{" "}
                    <span style={{ color: "#fbbf24" }}>&apos;{t("codeSnippet.role")}&apos;</span>,{"\n"}
                    {"  "}<span style={{ color: "#34d399" }}>location</span>:{" "}
                    <span style={{ color: "#fbbf24" }}>&apos;{t("codeSnippet.location")}&apos;</span>,{"\n"}
                    {"  "}<span style={{ color: "#34d399" }}>focus</span>:{" "}
                    <span style={{ color: "#fbbf24" }}>&apos;{t("codeSnippet.focus")}&apos;</span>,{"\n"}
                    {"  "}<span style={{ color: "#34d399" }}>available</span>:{" "}
                    <span style={{ color: "#60a5fa" }}>true</span>,{"\n"}
                    {"}"};
                  </pre>
                </div>

                <div
                  className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.15)" }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "#34d399" }}
                  />
                  <span className="text-sm" style={{ color: "#a1a1aa" }}>
                    {t("openToProjects")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {values.map((v) => (
            <div
              key={v.key}
              className="about-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "#0f0f0f",
                border: "1px solid rgba(255,255,255,0.06)",
                opacity: 0,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: "rgba(96,165,250,0.1)" }}
              >
                <v.icon size={22} style={{ color: "#60a5fa" }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "#fff" }}>
                {t(`values.${v.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
                {t(`values.${v.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}