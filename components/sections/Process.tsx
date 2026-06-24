"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { PROCESS_STEPS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

// Icône associée à chaque étape de PROCESS_STEPS, par clé stable (indépendante de la langue).
const ICON_BY_KEY: Record<string, LucideIcon> = {
  discovery: Search,
  planning: ClipboardList,
  design: PenTool,
  development: Code2,
  testing: TestTube2,
  launch: Rocket,
};

// Repli si une clé ne matche pas (sécurité, ne devrait pas arriver).
const FALLBACK_ICONS: LucideIcon[] = [Search, ClipboardList, PenTool, Code2, TestTube2, Rocket];

export default function Process() {
  const t = useTranslations("process");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".process-step",
        { yPercent: 30, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: { amount: 0.8 },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".process-connector",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          transformOrigin: "left",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-32"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
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
            {t("headingPrefix")} <span className="text-gradient">{t("headingHighlight")}</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: "#a1a1aa" }}>
            {t("subtitle")}
          </p>
        </div>

        <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICON_BY_KEY[step.key] ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];
            return (
              <div key={step.step} className="process-step relative" style={{ opacity: 0 }}>
                {/* Connector (only meaningful in a horizontal flow) */}
                {i < PROCESS_STEPS.length - 1 && (i + 1) % 3 !== 0 && (
                  <div
                    className="process-connector absolute top-10 left-[calc(100%-8px)] right-0 h-px z-10 hidden lg:block"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(96,165,250,0.4), rgba(96,165,250,0.1))",
                    }}
                  />
                )}
                <div
                  className="relative rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 group cursor-default h-full"
                  style={{
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Step number badge */}
                  <div
                    className="absolute top-5 right-5 text-[11px] font-black"
                    style={{ color: "rgba(96,165,250,0.5)", letterSpacing: "0.05em" }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all group-hover:scale-110"
                    style={{
                      background: "rgba(96,165,250,0.08)",
                      border: "1px solid rgba(96,165,250,0.2)",
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "#60a5fa" }} strokeWidth={1.75} />
                  </div>

                  <h3 className="text-base font-bold mb-3" style={{ color: "#fff" }}>
                    {t(`${step.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
                    {t(`${step.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}