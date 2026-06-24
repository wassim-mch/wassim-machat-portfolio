"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const t = useTranslations("preloader");
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("loading");

    const tl = gsap.timeline();
    const obj = { val: 0 };

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate() {
        setCount(Math.round(obj.val));
      },
    })
      .fromTo(
        nameRef.current,
        { yPercent: 100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left" },
        "-=0.4"
      )
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
        onComplete() {
          document.body.classList.remove("loading");
          onComplete();
        },
      });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "#050505" }}
    >
      <div className="overflow-hidden mb-4">
        <div ref={nameRef} style={{ opacity: 0 }}>
          <span
            className="text-4xl md:text-6xl font-black tracking-tighter"
            style={{ color: "#fff", letterSpacing: "-0.04em" }}
          >
            WASSIM<span style={{ color: "#60a5fa" }}>.</span>
          </span>
        </div>
      </div>

      <div
        ref={lineRef}
        className="w-48 md:w-64 h-px mb-6"
        style={{ background: "linear-gradient(90deg, #60a5fa, transparent)", transformOrigin: "left" }}
      />

      <div
        ref={percentRef}
        className="text-7xl md:text-9xl font-black tabular-nums"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(96,165,250,0.3)",
          letterSpacing: "-0.05em",
        }}
      >
        {count}
      </div>

      <div className="mt-2 text-xs tracking-[0.3em] uppercase" style={{ color: "#a1a1aa" }}>
        {t("loading")}
      </div>
    </div>
  );
}