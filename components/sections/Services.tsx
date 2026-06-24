"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cloud, Users, BarChart3, Globe, Code2, ShoppingBag, Briefcase, Zap, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { SERVICES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Cloud, Users, BarChart3, Globe, Code2, ShoppingBag, Briefcase, Zap, Smartphone,
};

export default function Services() {
  const t = useTranslations("services");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".service-card",
      { yPercent: 40, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: { amount: 0.8 },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="relative py-32 overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(96,165,250,0.04) 0%, transparent 70%)",
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
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            {t("headingPrefix")}{" "}
            <span className="text-gradient">{t("headingHighlight")}</span>
          </h2>
        </div>

        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.key}
                className="service-card group relative rounded-2xl p-6 overflow-hidden transition-all duration-400 hover:-translate-y-2 cursor-pointer"
                style={{
                  background: "#0f0f0f",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: 0,
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${service.accent}08 0%, transparent 70%)`,
                  }}
                />

                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${service.accent}15` }}
                >
                  {Icon && <Icon size={22} style={{ color: service.accent }} />}
                </div>

                <h3
                  className="relative text-sm font-bold mb-3 transition-colors group-hover:text-white"
                  style={{ color: "#fff" }}
                >
                  {t(`${service.key}.title`)}
                </h3>
                <p
                  className="relative text-xs leading-relaxed"
                  style={{ color: "#a1a1aa" }}
                >
                  {t(`${service.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}