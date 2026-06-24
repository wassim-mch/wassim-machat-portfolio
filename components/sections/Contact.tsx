"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Instagram, Music, MessageCircle, Send, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/data";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Github, Linkedin, Instagram, Music, MessageCircle,
};

export default function Contact() {
  const t = useTranslations("contact");
  const containerRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useGSAP(() => {
    gsap.fromTo(
      ".contact-col",
      { yPercent: 30, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setStatus("sending");

  try {
    await emailjs.send(
      "service_vl39ctz",
      "template_e6t3k5d",
      {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        time: new Date().toLocaleString(),
      },
      "0L-ovM3wnGPoaT4nO"
    );

    setStatus("sent");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.error(error);
    setStatus("idle");
    alert("Erreur lors de l'envoi du message.");
  }
};

  return (
    <section id="contact" ref={containerRef} className="relative py-32" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(96,165,250,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#60a5fa" }}>
            {t("label")}
          </span>
          <h2
            className="font-black mt-3 leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            {t("headingPrefix")}{" "}
            <span className="text-gradient">{t("headingHighlight")}</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: "#a1a1aa" }}>
            {t("subtitle")}
          </p>
        </div>

        <div className="contact-grid grid lg:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div className="contact-col" style={{ opacity: 0 }}>
            <div className="space-y-6 mb-10">
              <a
                href="mailto:wassimmachat.dev@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ background: "rgba(96,165,250,0.1)" }}
                >
                  <Mail size={18} style={{ color: "#60a5fa" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#a1a1aa" }}>{t("emailLabel")}</div>
                  <div
                    className="text-sm font-medium transition-colors group-hover:text-white"
                    style={{ color: "#fff" }}
                  >
                    wassimmachat.dev@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(96,165,250,0.1)" }}
                >
                  <MapPin size={18} style={{ color: "#60a5fa" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#a1a1aa" }}>{t("locationLabel")}</div>
                  <div className="text-sm font-medium" style={{ color: "#fff" }}>
                    {t("location")}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="pb-6 mb-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#a1a1aa" }}>
                {t("findMeOn")}
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 hover:border-accent glass"
                      style={{
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {Icon && <Icon size={14} />}
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34d399" }} />
                <span className="text-sm font-bold" style={{ color: "#34d399" }}>
                  {t("available")}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#a1a1aa" }}>
                {t("responseTime")}
              </p>
            </div>
          </div>

          {/* Right form */}
          <div className="contact-col" style={{ opacity: 0 }}>
            <div
              className="rounded-3xl p-8"
              style={{ background: "#0f0f0f", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(52,211,153,0.1)" }}
                  >
                    <Send size={24} style={{ color: "#34d399" }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#fff" }}>{t("messageSent")}</h3>
                  <p className="text-sm" style={{ color: "#a1a1aa" }}>
                    {t("thankYou")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: "name", label: t("form.name"), type: "text", placeholder: t("form.namePlaceholder") },
                    { id: "email", label: t("form.email"), type: "email", placeholder: t("form.emailPlaceholder") },
                    { id: "subject", label: t("form.subject"), type: "text", placeholder: t("form.subjectPlaceholder") },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        className="block text-xs font-semibold mb-2"
                        style={{ color: "#a1a1aa" }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(96,165,250,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "#a1a1aa" }}>
                      {t("form.message")}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t("form.messagePlaceholder")}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#fff",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(96,165,250,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
                    style={{ background: "#60a5fa", color: "#050505" }}
                  >
                    {status === "sending" ? (
                      <>
                        <div
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        />
                        {t("form.sending")}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {t("form.send")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}