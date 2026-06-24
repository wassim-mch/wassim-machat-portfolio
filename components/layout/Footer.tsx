"use client";
import { ArrowUp, Github, Linkedin, Instagram, Music, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/data";

const iconMap: Record<string, React.ElementType> = {
  Github, Linkedin, Instagram, Music, MessageCircle,
};

export default function Footer() {
  const t = useTranslations("footer");
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative py-16 overflow-hidden"
      style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div
              className="text-4xl md:text-5xl font-black leading-none mb-2"
              style={{ letterSpacing: "-0.05em" }}
            >
              WASSIM<span style={{ color: "#60a5fa" }}>.</span>
            </div>
            <p className="text-sm" style={{ color: "#a1a1aa" }}>
              {t("role")}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-1 glass"
                  style={{ color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.06)" }}
                  title={link.label}
                >
                  {Icon && <Icon size={16} />}
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 hover:text-white"
            style={{ color: "#a1a1aa" }}
          >
            {t("backToTop")}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center glass"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "#a1a1aa" }}
        >
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}