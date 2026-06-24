"use client";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: l === locale ? "rgba(96,165,250,0.12)" : "rgba(255,255,255,0.04)",
              border: l === locale ? "1px solid rgba(96,165,250,0.3)" : "1px solid rgba(255,255,255,0.06)",
              color: l === locale ? "#60a5fa" : "#a1a1aa",
            }}
          >
            <span>{localeFlags[l]}</span>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-white/5"
        style={{ color: "#a1a1aa" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{localeFlags[locale]}</span>
        <span className="hidden lg:inline">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 right-0 rounded-xl overflow-hidden glass z-50"
          style={{ border: "1px solid rgba(255,255,255,0.08)", minWidth: "160px" }}
          role="listbox"
        >
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              role="option"
              aria-selected={l === locale}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors duration-150 hover:bg-white/5"
              style={{ color: l === locale ? "#60a5fa" : "#fff" }}
            >
              <span className="text-base leading-none">{localeFlags[l]}</span>
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}