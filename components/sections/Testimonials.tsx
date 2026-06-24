"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { TESTIMONIALS } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const tData = useTranslations("testimonialsData");
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { autoAlpha: 0, yPercent: 20 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const goTo = (dir: number) => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      xPercent: dir * -10,
      autoAlpha: 0,
      duration: 0.25,
      onComplete() {
        setCurrent((c) => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
        gsap.fromTo(
          cardRef.current,
          { xPercent: dir * 10, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" }
        );
      },
    });
  };

  const current_t = TESTIMONIALS[current];

  return (
    <section id="testimonials" ref={containerRef} className="relative py-32" style={{ opacity: 0 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(96,165,250,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <span
          className="text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: "#60a5fa" }}
        >
          {t("label")}
        </span>
        <h2
          className="font-black mt-3 mb-16 leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
        >
          {t("headingPrefix")}{" "}
          <span className="text-gradient">{t("headingHighlight")}</span>
        </h2>

        <div
          ref={cardRef}
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Quote
            size={40}
            className="mx-auto mb-6"
            style={{ color: "rgba(96,165,250,0.3)" }}
          />

          <p
            className="text-lg md:text-xl leading-relaxed mb-8 font-light"
            style={{ color: "#fff" }}
          >
            &ldquo;{tData(`${current_t.key}.text`)}&rdquo;
          </p>

          <div className="flex items-center justify-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black"
              style={{ background: "linear-gradient(135deg, #60a5fa, #818cf8)", color: "#050505" }}
            >
              {current_t.avatar}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold" style={{ color: "#fff" }}>
                {current_t.author}
              </div>
              <div className="text-xs" style={{ color: "#a1a1aa" }}>
                {tData(`${current_t.key}.role`)}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => goTo(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 glass"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (i !== current) goTo(i > current ? 1 : -1); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? "#60a5fa" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 glass"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}