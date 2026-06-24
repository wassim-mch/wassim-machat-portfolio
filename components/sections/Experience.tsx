"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const t = useTranslations("experience");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".timeline-item",
      { xPercent: -20, autoAlpha: 0 },
      {
        xPercent: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power3.out",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="relative py-32">
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
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            {t("headingPrefix")}{" "}
            <span className="text-gradient">{t("headingHighlight")}</span>
          </h2>
        </div>

        <div className="timeline-container grid md:grid-cols-2 gap-8">
          {/* Experience */}
          <div>
            <div
              className="flex items-center gap-3 mb-8 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(96,165,250,0.1)" }}
              >
                <Briefcase size={18} style={{ color: "#60a5fa" }} />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: "#fff" }}>
                {t("workExperience")}
              </span>
            </div>

            <div className="relative">
              <div
                className="timeline-line absolute left-4 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(180deg, #60a5fa, transparent)" }}
              />

              <div className="timeline-item pl-12 relative" style={{ opacity: 0 }}>
                <div
                  className="absolute left-3 top-1.5 w-2 h-2 rounded-full"
                  style={{ background: "#60a5fa", boxShadow: "0 0 12px rgba(96,165,250,0.6)" }}
                />

                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-base" style={{ color: "#fff" }}>
                        {t("job.title")}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: "#60a5fa" }}>
                        {t("job.company")}
                      </p>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-lg whitespace-nowrap"
                      style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa" }}
                    >
                      {t("job.period")}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
                    {t("job.desc")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.raw("job.tags").map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)", color: "#a1a1aa" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div
              className="flex items-center gap-3 mb-8 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(52,211,153,0.1)" }}
              >
                <GraduationCap size={18} style={{ color: "#34d399" }} />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: "#fff" }}>
                {t("education")}
              </span>
            </div>

            <div className="relative">
              <div
                className="timeline-line absolute left-4 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(180deg, #34d399, transparent)" }}
              />

              <div className="timeline-item pl-12 relative" style={{ opacity: 0 }}>
                <div
                  className="absolute left-3 top-1.5 w-2 h-2 rounded-full"
                  style={{ background: "#34d399", boxShadow: "0 0 12px rgba(52,211,153,0.6)" }}
                />

                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-base leading-snug" style={{ color: "#fff" }}>
                        {t("degree.title")}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: "#34d399" }}>
                        {t("degree.location")}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
                    {t("degree.desc")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.raw("degree.tags").map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)", color: "#a1a1aa" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}