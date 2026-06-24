"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/data";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const navRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileRef.current,
        { yPercent: -100, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileRef.current, { yPercent: -100, autoAlpha: 0, duration: 0.3 });
    }
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 rounded-2xl px-6 py-3 ${
          scrolled ? "glass shadow-2xl" : "bg-transparent"
        }`}
        style={{ minWidth: "min(720px, 95vw)" }}
      >
        <div className="flex items-center justify-between gap-8">
          <button
            onClick={() => handleNav("#home")}
            className="text-lg font-black tracking-tighter"
            style={{ color: "#fff", letterSpacing: "-0.04em" }}
          >
            W<span style={{ color: "#60a5fa" }}>.</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium transition-colors duration-200 relative"
                style={{ color: active === link.href ? "#fff" : "#a1a1aa" }}
              >
                {t(link.key)}
                {active === link.href && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: "#60a5fa" }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher variant="desktop" />
            <a
              href="mailto:wassimmachat.dev@gmail.com"
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:opacity-90"
              style={{ background: "#60a5fa", color: "#050505" }}
            >
              {t("hireMe")}
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ color: "#fff" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={mobileRef}
        className="fixed inset-x-4 top-20 z-[999] rounded-2xl glass p-6 md:hidden"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left text-lg font-semibold transition-colors"
              style={{ color: active === link.href ? "#60a5fa" : "#fff" }}
            >
              {t(link.key)}
            </button>
          ))}
          <div className="flex justify-center pt-2">
            <LanguageSwitcher variant="mobile" />
          </div>
          <a
            href="mailto:wassimmachat.dev@gmail.com"
            className="mt-2 text-center text-sm font-bold py-3 rounded-xl"
            style={{ background: "#60a5fa", color: "#050505" }}
          >
            {t("hireMe")}
          </a>
        </div>
      </div>
    </>
  );
}